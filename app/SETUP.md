# Backend Setup

Everything the backend needs is already written — schema, Edge Functions, auth pages, all
wired into the app. This is the checklist of things only *you* can do (they need your
Supabase/Stripe accounts), in order.

## 1. Supabase project

1. In the [Supabase dashboard](https://supabase.com/dashboard), open (or create) your project.
2. **Project Settings → API** — copy the **Project URL** and **anon public** key.
3. Copy `app/.env.example` to `app/.env.local` and paste those two values in as
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Apply the schema:
   ```bash
   cd app
   npx supabase login          # opens a browser to authenticate the CLI
   npx supabase link --project-ref <your-project-ref>   # ref is in your project URL
   npx supabase db push        # applies supabase/migrations/0001_init.sql
   ```
   This creates `profiles`, `enrollments`, `lesson_progress`, `workbook_responses`,
   `community_posts`, `community_resonances`, `notification_preferences` — all with Row
   Level Security so users can only read/write their own data — plus a trigger that
   auto-provisions a profile/enrollment/preferences row whenever someone signs up.
5. **Auth → Providers → Email** — decide whether to require email confirmation. Off is
   faster to test with; on is what you'd want for a real launch (the app already handles
   both — see `src/pages/SignUp.tsx`).

## 2. Stripe

1. In the [Stripe dashboard](https://dashboard.stripe.com) (test mode is fine to start),
   create one product: **Lunar Phasecraft Mastery**, with two prices:
   - a **one-time** price for $197
   - a **recurring monthly** price for $75 (the app cancels this automatically after 3
     charges — see `subscription_data.cancel_at` in
     `supabase/functions/create-checkout-session/index.ts` — so don't set a fixed billing
     cycle count on the price itself, just monthly recurring)
2. Copy both **Price IDs** (`price_...`).
3. **Developers → API keys** — copy the **Secret key** (`sk_...`).
4. Set these as Edge Function secrets (server-side only — never in `.env.local`):
   ```bash
   npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...
   npx supabase secrets set STRIPE_PRICE_ONCE=price_...
   npx supabase secrets set STRIPE_PRICE_INSTALLMENTS=price_...
   npx supabase secrets set SITE_URL=http://localhost:5173   # or your production URL
   ```
5. Deploy the two Edge Functions:
   ```bash
   npx supabase functions deploy create-checkout-session
   npx supabase functions deploy stripe-webhook --no-verify-jwt
   ```
6. **Developers → Webhooks → Add endpoint** in the Stripe dashboard:
   - URL: `https://<your-project-ref>.supabase.co/functions/v1/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy the **Signing secret** (`whsec_...`) it gives you and set it:
     ```bash
     npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
     ```

## 3. Run it

```bash
cd app
npm install
npm run dev
```

Sign up → you'll land on `/checkout` (unenrolled users are redirected there) → pick a plan
→ pay on Stripe's hosted page → the webhook marks you enrolled → you land on `/dashboard`.

## What's real vs. what's still simplified

**Real:** auth (Supabase), payment (Stripe Checkout, PCI compliance is entirely Stripe's),
enrollment gating (you can't reach the app without paying), lesson/exercise completion
tracking, workbook responses, community posts + "resonances", profile + notification
preference storage — all persisted per-user with Row Level Security.

**Still simplified, worth knowing about:**
- **Lesson content**: only Lesson 2.3 has a fully written reading view (video, article,
  frequencies). The other 32 lessons across the curriculum can be marked complete (from
  the Modules page) but don't have their own content page yet — that's a content-authoring
  task, separate from this backend pass.
- **Workbook**: same story — only Exercise 2.5 has the full multi-prompt form; Module 2's
  other 7 exercises are simplified to a checklist. Modules 1 and 3–6 have no workbook
  exercises modeled at all yet.
- **Community replies/comments**: posts, resonances ("likes"), and category filters are
  real; threaded replies are not built — the reply counts from the original design mockup
  were removed rather than left fake.
- **Moon Circle RSVP**: still decorative, as it was in the original design mockup.
- **"3 Payments" plan**: implemented as a Stripe subscription that auto-cancels after 3
  months (`cancel_at`), rather than a true fixed-count installment plan — Stripe doesn't
  have a native "bill exactly 3 times then stop" primitive, so this was the closest honest
  equivalent. Access is granted on the first successful payment either way.
