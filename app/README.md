# School of Phasecraft

Michael Moontuner's "School of Phasecraft" educational platform, implemented from the
[Claude Design](https://claude.ai/design) handoff at `../project/School of Phasecraft v2.dc.html`
(design intent captured in `../chats/chat1.md`).

React + Vite + React Router, TypeScript. Static/mock data — no backend yet (see below).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## What's here

- **8 real routes**, matching the 8 screens from the design: `/` (landing), `/checkout`,
  `/dashboard`, `/modules`, `/lesson`, `/workbook`, `/community`, `/settings`.
- **`src/components/ds/`** — the Moontuner design system components (`Button`, `Input`,
  `Badge`, `LivePill`, `MoonPhaseGlyph`, `PhaseStrip`), ported 1:1 from
  `../project/_ds/.../_ds_bundle.js` into standalone TSX.
- **`src/styles/tokens/`** — the design system's color/typography/spacing tokens, copied
  verbatim from `../project/_ds/.../tokens/`. Fonts (Inter, Playfair Display, Instrument
  Serif, DM Sans, Work Sans, IBM Plex Mono) are self-hosted via `@fontsource` rather than
  loaded from the Google Fonts CDN, so the app doesn't depend on an external font host.
- **`src/data/curriculum.ts`** — the mock module/lesson/community data, ported from the
  inline `<script type="text/x-dc">` block in the original prototype.
- **`src/pages/`** — one component per screen, styled to match the source design pixel-for-pixel.

## What's functional vs. mocked

This pass focused on getting the design implemented with static data (per the build
decision made when this was scoped). A few controls that were purely decorative in the
prototype were wired up for real since they're clearly meant to be interactive:

- Checkout's one-time/3-payment toggle switches the order total.
- Settings' notification toggles hold real on/off state.
- Community's category chips filter the post list.
- "Complete Enrollment" is a real HTML form with `required` fields.

**Not real yet:** authentication, payments (Stripe), a database for progress/workbook
answers/community posts, and email. All content is hardcoded mock data. Wiring up a real
backend was intentionally deferred to a follow-up pass — see the parent repo's handoff
`README.md` and `chats/chat1.md` for the original design conversation.
