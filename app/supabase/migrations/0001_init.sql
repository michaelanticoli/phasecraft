-- School of Phasecraft — initial schema
-- Apply with: supabase db push (see ../../SETUP.md)

-- ---------------------------------------------------------------------------
-- profiles: one row per user, extends auth.users with app-facing fields
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  timezone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- enrollments: one row per user tracking payment status. Only Edge Functions
-- (using the service role key, which bypasses RLS) write to this table —
-- clients can only read their own row, so enrollment can't be self-granted.
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'canceled')),
  plan text check (plan in ('once', 'installments')),
  stripe_customer_id text,
  stripe_checkout_session_id text,
  enrolled_at timestamptz
);

alter table public.enrollments enable row level security;

create policy "enrollments: select own" on public.enrollments
  for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- lesson_progress: completed lessons, keyed by the curriculum's lesson number
-- (e.g. "2.3"), matching src/data/curriculum.ts.
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_key text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

alter table public.lesson_progress enable row level security;

create policy "lesson_progress: select own" on public.lesson_progress
  for select using (auth.uid() = user_id);

create policy "lesson_progress: insert own" on public.lesson_progress
  for insert with check (auth.uid() = user_id);

create policy "lesson_progress: delete own" on public.lesson_progress
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- workbook_responses: journaling answers, keyed by exercise number (e.g. "2.5")
-- ---------------------------------------------------------------------------
create table if not exists public.workbook_responses (
  user_id uuid not null references public.profiles (id) on delete cascade,
  exercise_key text not null,
  responses jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise_key)
);

alter table public.workbook_responses enable row level security;

create policy "workbook_responses: select own" on public.workbook_responses
  for select using (auth.uid() = user_id);

create policy "workbook_responses: insert own" on public.workbook_responses
  for insert with check (auth.uid() = user_id);

create policy "workbook_responses: update own" on public.workbook_responses
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- community_posts / community_resonances
-- ---------------------------------------------------------------------------
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  category text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

create policy "community_posts: select all (authenticated)" on public.community_posts
  for select using (auth.role() = 'authenticated');

create policy "community_posts: insert own" on public.community_posts
  for insert with check (auth.uid() = user_id);

create table if not exists public.community_resonances (
  post_id uuid not null references public.community_posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.community_resonances enable row level security;

create policy "community_resonances: select all (authenticated)" on public.community_resonances
  for select using (auth.role() = 'authenticated');

create policy "community_resonances: insert own" on public.community_resonances
  for insert with check (auth.uid() = user_id);

create policy "community_resonances: delete own" on public.community_resonances
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- notification_preferences
-- ---------------------------------------------------------------------------
create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  daily_directive boolean not null default true,
  phase_transition boolean not null default true,
  voc_reminders boolean not null default false,
  community_digest boolean not null default true
);

alter table public.notification_preferences enable row level security;

create policy "notification_preferences: select own" on public.notification_preferences
  for select using (auth.uid() = user_id);

create policy "notification_preferences: update own" on public.notification_preferences
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Auto-provision profile / enrollment / preferences rows when a user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
    values (new.id, split_part(new.email, '@', 1));
  insert into public.enrollments (user_id)
    values (new.id);
  insert into public.notification_preferences (user_id)
    values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
