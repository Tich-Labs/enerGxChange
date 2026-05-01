# enerG·X·change — Claude Instructions

## What this project is

A Rails 8 barter/energy-exchange community platform. Members earn entry by completing one real exchange with a matched person. No money ever moves.

Full MVP documentation: [docs/MVP_BUSINESS_PLAN.md](docs/MVP_BUSINESS_PLAN.md)
Market research: [docs/RESEARCH_REPORT.md](docs/RESEARCH_REPORT.md)

---

## Hard rules — flag immediately if any of these are violated

**No money inside.** Never add Stripe, payment gems, credits, or any currency system to the platform itself. Gelato (print-on-demand) is the only external payment flow, and it is for physical card ordering only — not community access.

**No ratings.** No stars, numeric scores, thumbs up/down, or ranked feedback anywhere in the UI. Exchange confirmation is binary: it happened, or it didn't.

**No browsing before first exchange.** The constellation and member profiles are invisible until a user's state is `community_member`. Do not add any route that exposes member data to `declared` or `waiting_for_match` users.

**Card token is always UUID.** The QR code on membership cards links to `/verify/:card_token`. Never expose the user's `id` or `email` in a public URL.

**Sigil is deterministic.** `SigilGenerator.generate(user.id)` must always return the same SVG for the same input. Do not add randomness that isn't seeded by the member ID.

**Admin overrides are logged.** Every manual match intervention (create, reassign, release) must write an audit record. Never silently mutate a match without a log entry.

---

## The 4 Worlds — fixed categories, do not add or rename without a product decision

| World | Colour | Hex |
|---|---|---|
| `wellness` | Green | `#5a8a5a` |
| `entrepreneurship` | Gold | `#e8c97a` |
| `conscious_living` | Teal | `#4a8a80` |
| `creative_life` | Rose | `#c46a6a` |

---

## User state machine

```
declared → waiting_for_match → matched → community_member
                              ↑         ↓
                              └── (match expiry, returns here)
any state → suspended (admin only)
```

---

## Design system

**Fonts:** Fraunces (headings, italic for emphasis) + DM Sans (body, labels)
**Background:** `#1a1410` (--soil) · Cards: `#2a2018` (--bark) · Hover: `#3a2e20` (--warm)
**Text:** `#f5ede0` (--cream) · Accent: `#c4a882` (--sand) · Gold: `#e8c97a` (--sun) · CTA: `#d4622a` (--ember)

No drop shadows — use border + background gradient instead.
No custom cursor in the app — landing page only.
Confirmation moments (arrival, card reveal) use full-screen overlays with a slow fade.

---

## Key gems

- Auth: Rails 8 built-in (`rails generate authentication`)
- State machine: `aasm`
- Background jobs: `sidekiq` + `sidekiq-cron`
- QR codes: `rqrcode`
- PDF: `prawn` + `prawn-svg`
- PNG export: `grover` (headless Chrome)
- Admin: `administrate`
- Notifications: `noticed`
- Gelato API: `httparty`
- Pagination: `pagy`

---

## Founding nodes

Two special users with `founding_node: true` and `admin` role:
- **The Voice** — origin community node (pinned first in constellation)
- **The Builder** — built the app; received community access in exchange

Their exchange is the first sealed record in the system and is displayed as a pinned card in the constellation.
