# enerG·X·change — Build Log

> **Tagline:** Give something real. Receive something real. Then you're in.
> **Stack:** Rails 8 · Ruby · PostgreSQL · Solid Queue · No money ever moves.

---

## Project Overview

A barter/energy-exchange community platform where members earn entry by completing one real exchange with a matched person. No money ever moves.

**Core rule:** No browsing before first exchange. The constellation and member profiles are invisible until `community_member` state.

---

## Tech Stack (Free-Tier Optimized)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Rails 8 | Built-in auth, Solid Queue |
| Language | Ruby 3.x | |
| Database | PostgreSQL | Render free (100MB) or Supabase free |
| Background Jobs | Solid Queue | Rails 8 native — no Redis needed |
| Auth | Rails 8 built-in | `rails generate authentication` |
| State Machine | `aasm` | User state transitions |
| QR Codes | `rqrcode` | Membership card verification |
| PDF Export | `prawn` + `prawn-svg` | Membership cards |
| PNG Export | `grover` | Headless Chrome |
| Admin | `administrate` | Self-hosted, free |
| Notifications | `noticed` | In-app + email |
| Gelato API | `httparty` | Physical card ordering (only external payment) |
| Pagination | `pagy` | Lightweight |

---

## Free-Tier Architecture

| Need | Provider | Limit |
|---|---|---|
| Rails Hosting | **Render** (free tier) | Sleeps after 15 min idle |
| Database | Render PostgreSQL | 100MB free |
| Email | **Resend** | 3,000/mo free |
| File Storage | **Cloudflare R2** | 10GB free, S3-compatible |
| Background Jobs | Solid Queue (DB-based) | No Redis cost |

*Skipped Sidekiq + Redis to avoid cost — Solid Queue is native in Rails 8.*

---

## User State Machine

```
declared → waiting_for_match → matched → community_member
                              ↑         ↓
                              └── (match expiry, returns here)
any state → suspended (admin only)
```

### States Defined
- **declared** — User signed up, declared what they offer/want
- **waiting_for_match** — In the queue, awaiting algorithmic match
- **matched** — Paired with someone, 7-day exchange window
- **community_member** — Completed first exchange, full access unlocked
- **suspended** — Admin-only, locked out

---

## The 4 Worlds (Fixed)

| World | Colour | Hex |
|---|---|---|
| `wellness` | Green | `#5a8a5a` |
| `entrepreneurship` | Gold | `#e8c97a` |
| `conscious_living` | Teal | `#4a8a80` |
| `creative_life` | Rose | `#c46a6a` |

---

## MVP Scope (Phase 1 — Ship Lean)

### ✅ Included in MVP
- [ ] Rails 8 app scaffold + DB schema
- [ ] Authentication (Rails 8 built-in)
- [ ] User declaration (offer/want/world selection)
- [ ] User state machine (AASM)
- [ ] Matching engine (algorithmic pairing)
- [ ] Exchange confirmation (binary: happened or didn't)
- [ ] Community constellation unlock (post first exchange)
- [ ] Membership card (PDF with QR code)
- [ ] Card verification route (`/verify/:card_token`)
- [ ] Gelato API integration (physical card ordering)
- [ ] Admin panel (Administrate)
- [ ] Notifications (Noticed gem)

### ❌ Skipped for MVP (Post-Launch)
- Forum / message boards
- Sigil generator (complexity)
- Advanced admin analytics
- Mobile app
- Ratings or reviews (permanent product decision: **no ratings ever**)

---

## Build Phases

### Phase 1: Foundation (Week 1)
- [ ] `rails new enerGXchange --database=postgresql --skip-redis`
- [ ] Configure Gemfile (add aasm, rqrcode, prawn, noticed, administrate, httparty, pagy)
- [ ] Set up PostgreSQL locally
- [ ] Run `rails generate authentication`
- [ ] Define core models: `User`, `Match`, `Exchange`, `World`
- [ ] Set up AASM states on User model
- [ ] Run `rails db:create db:migrate`

### Phase 2: Core Flow (Week 2)
- [ ] Declaration form (offer/want/world)
- [ ] World selection UI (4 Worlds)
- [ ] User state transitions (declared → waiting_for_match)
- [ ] Matching algorithm (pair users by world + offer/want compatibility)
- [ ] Match notification (email + in-app)

### Phase 3: Exchange & Confirmation (Week 3)
- [ ] Matched user dashboard (show match details)
- [ ] Exchange confirmation flow (both parties must confirm)
- [ ] State transition: matched → community_member
- [ ] Match expiry logic (7-day window, return to waiting_for_match)
- [ ] Admin override + audit logging

### Phase 4: Community Unlock (Week 4)
- [ ] Constellation view (visible only to community_members)
- [ ] Member profile view (restricted access)
- [ ] Membership card generation (PDF with Prawn)
- [ ] QR code generation (rqrcode → /verify/:card_token)
- [ ] Card verify route

### Phase 5: Polish & Deploy (Week 5-6)
- [ ] Gelato API integration (physical card ordering)
- [ ] Admin panel setup (Administrate)
- [ ] Notifications system (Noticed)
- [ ] Deploy to Render (free tier)
- [ ] Configure Solid Queue for background jobs
- [ ] Set up Cloudflare R2 for file storage
- [ ] Configure Resend for transactional email

---

## Hard Rules (Never Violate)

1. **No money inside.** No Stripe, payment gems, credits, or currency. Gelato is only for physical card ordering.
2. **No ratings.** No stars, scores, thumbs up/down. Exchange confirmation is binary.
3. **No browsing before first exchange.** Constellation + profiles hidden until `community_member`.
4. **Card token is UUID.** Public URLs use `/verify/:card_token`, never user ID or email.
5. **Sigil is deterministic.** Same input = same SVG output (seeded by member ID).
6. **Admin overrides are logged.** Every manual match mutation writes an audit record.

---

## Founding Nodes (Seed Data)

Two special users seeded on first deploy:
- **The Voice** — `founding_node: true`, `admin: true` (origin community node, pinned first)
- **The Builder** — `founding_node: true`, `admin: true` (built the app, exchange recipient)

Their exchange is the first sealed record, displayed as a pinned card in the constellation.

---

## Progress Log

### [2026-05-01] Project Start
- ✅ Landing page (`index.html`) complete with design system
- ✅ Product specs (`MVP_BUSINESS_PLAN.md`, `RESEARCH_REPORT.md`)
- ✅ CLAUDE.md instructions file created
- ✅ Build plan documented (`BUILD_LOG.md`)
- 🔄 Next: Scaffold Rails 8 app

---

## Deployment Checklist (Render Free Tier)

- [ ] Rails 8 app pushed to GitHub
- [ ] Render.com account connected to repo
- [ ] Environment variables set (SECRET_KEY_BASE, etc.)
- [ ] PostgreSQL add-on provisioned
- [ ] Solid Queue configured (no Redis needed)
- [ ] Cloudflare R2 bucket created + credentials set
- [ ] Resend API key configured
- [ ] Gelato API credentials set
- [ ] `bin/render_build.sh` script created
- [ ] Test full flow end-to-end on live URL

---

*Last updated: 2026-05-01*
