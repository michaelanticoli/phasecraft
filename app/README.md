# School of Phasecraft

Michael Moontuner's "School of Phasecraft" educational platform, implemented from the
[Claude Design](https://claude.ai/design) handoff at `../project/School of Phasecraft v2.dc.html`
(design intent captured in `../chats/chat1.md`).

React + Vite + React Router, TypeScript, with a real Supabase (auth + Postgres) and Stripe
(Checkout) backend.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project values — see SETUP.md
npm run dev                  # http://localhost:5173
npm run build                # production build to dist/
```

**First time here? Read [SETUP.md](./SETUP.md)** — it's the exact checklist for connecting
your own Supabase project and Stripe account (schema, secrets, Edge Function deploys,
webhook registration). Nothing in this app works until that's done once.

## What's here

- **8 screens** at real routes: `/` (landing), `/login`, `/signup`, `/checkout` (+
  `/checkout/success`), `/dashboard`, `/modules`, `/lesson`, `/workbook`, `/community`,
  `/settings`. `/dashboard` through `/settings` require both a logged-in user and an
  active (paid) enrollment — see `src/components/auth/RequireAuth.tsx` and
  `RequireEnrollment.tsx`.
- **`src/components/ds/`** — the Moontuner design system components (`Button`, `Input`,
  `Badge`, `LivePill`, `MoonPhaseGlyph`, `PhaseStrip`), ported 1:1 from
  `../project/_ds/.../_ds_bundle.js` into standalone TSX.
- **`src/styles/tokens/`** — the design system's color/typography/spacing tokens, copied
  verbatim from `../project/_ds/.../tokens/`. Fonts are self-hosted via `@fontsource`
  rather than loaded from the Google Fonts CDN.
- **`src/lib/`** — the Supabase client, `AuthProvider`/`useAuth`, and one hook per backend
  concern (`useEnrollment`, `useLessonProgress`, `useWorkbook`, `useProfile`).
- **`src/data/`** — curriculum and workbook exercise catalogs. Content stays static; the
  *progress against* that content is what's backed by the database.
- **`supabase/migrations/0001_init.sql`** — the full schema, with Row Level Security so
  every user only ever reads/writes their own rows.
- **`supabase/functions/`** — two Edge Functions: `create-checkout-session` (starts a
  Stripe Checkout Session) and `stripe-webhook` (marks an enrollment paid once Stripe
  confirms the charge — this, not the client, is the source of truth for access).

## What's real vs. still simplified

See the bottom of [SETUP.md](./SETUP.md) for the honest list — short version: auth,
payment, enrollment gating, and progress/response/post persistence are all real and
per-user; only Lesson 2.3 and Workbook Exercise 2.5 have fully authored content (the rest
of the 33-lesson curriculum can be marked complete but doesn't have its own reading view
yet), and community replies/threading aren't built.
