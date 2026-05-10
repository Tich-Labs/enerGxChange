# MVP Business Plan — enerG·X·change
**Version:** 1.0
**Date:** April 24, 2026
**Status:** MVP Definition

---

## The Problem

Every exchange platform ever built has the same flaw: you can join without giving anything.

You create a profile. You browse. You message. You ghost. You're rated. You feel watched. The community is visible before you've earned the right to be in it. So it becomes a marketplace. A directory. A dead social feed.

What's missing isn't a better algorithm. What's missing is initiation.

Real communities — the ones people are loyal to for decades — require something of you before they let you in. Proof that you're real. Proof that you'll show up. Proof that you give as much as you take.

enerG·X·change is built on that premise: **you earn the community by completing one genuine exchange with another human being, first.**

---

## The Solution

A platform where:

- **Entry is earned.** You see nothing until you've completed your first real-world exchange, confirmed by both parties.
- **Matching is one at a time.** The system gives you one person. You have 72 hours to connect. No lists. No browsing. No rejection theatre.
- **No money moves.** Ever. Only energy — skills, time, shelter, food, labour, care.
- **No ratings.** Just confirmation. It happened. Or it didn't.
- **Your place in the community grows** as you exchange more. First exchange: you arrive. Tenth exchange: you're a node in the constellation.
- **Every member has a card.** A physical/virtual artifact that proves belonging. Shareable. Verifiable. Beautiful.

---

## Vision Statement

A world where human gifts flow freely — not because the economy forces it, but because a community holds it.

---

## Mission Statement

To build the infrastructure for earned belonging: a global network of people who have proven they show up, give genuinely, and receive gracefully.

---

## Open Questions — Assumptions Made for MVP

The following decisions were required to scope the MVP. Each includes a recommendation and rationale.

### 1. Matching: Manual or Algorithmic?
**Recommendation: Algorithmic for MVP, with admin override capability.**

Rationale: Manual curation doesn't scale past 100 members and creates an admin bottleneck during the critical growth phase. A lightweight algorithm — matching on World overlap, complementary offer/need pairs, and location preference — is achievable in Rails without ML. Admin override allows The Voice and The Builder to curate founding-cohort matches manually during launch, then hand off to the algorithm.

The matching algorithm at MVP is: same World > complementary offer/need > geographic proximity (optional filter) > FIFO queue position. No recommendations engine. No ML. Pure Ruby.

### 2. Physical Card: PDF Only or Print-on-Demand?
**Decision: Both — PDF download AND print-on-demand (Gelato integration).**

Rationale: PDF download is the fast path — ships in days, zero fulfilment dependency. Gelato integration is added in parallel: international coverage, no inventory, strong API. Both are MVP. Gelato is preferred over Printful for this product due to better international (African + European) fulfilment network, which matches the community's geographic spread.

### 3. Are the 4 Worlds Fixed Categories for MVP?
**Recommendation: Yes — the 4 Worlds are fixed for MVP.**

The four Worlds — Wellness, Entrepreneurship, Conscious Living, Creative Life — are fixed categories for MVP. Members choose a primary World and optionally a secondary World. Sub-categories within each World (e.g., "Movement" within Wellness) are surface-level tags at MVP and can evolve into a richer taxonomy in V2. Fixed categories reduce matching complexity and create a comprehensible identity system.

### 4. Admin / Moderation Layer for MVP?
**Recommendation: Yes — lightweight admin layer is required for MVP.**

A platform built on trust must have humans behind it at launch. MVP includes:
- Admin dashboard (Rails admin via Administrate or custom) to view members, exchanges, matches
- Ability to manually trigger or reassign a match
- Ability to flag and suspend a member
- Ability to confirm/reverse a disputed exchange
- The two founding nodes (The Voice, The Builder) have admin access from day one

No community moderation by members at MVP. No reporting flows. Admin is the sole moderation layer.

### 5. Card Sigil: Pre-generated or Algorithmic?
**Recommendation: Algorithmically generated SVG per member, seeded by member ID.**

Rationale: A pre-generated set of, say, 100 sigils would be reused across members, destroying the sense of uniqueness. The sigil must feel personal. A deterministic algorithm seeded by the member's UUID generates a constellation pattern — a fixed set of points and connecting lines derived from the numeric hash of the ID. This is pure SVG math, no external service required. The same seed always produces the same sigil, making regeneration reliable. The algorithm lives in a Ruby concern.

---

## Target Users

### Primary: The Practitioner
**Who they are:** 28–45, globally mobile or urban, values-led. Coaches, therapists, designers, builders, farmers, teachers, bodyworkers, cooks, artists. People who have skills that the economy undervalues — and who are tired of either giving them away for free or charging for them in ways that feel hollow.

**Pain points:** Can't afford to outsource things they need. Don't want to charge friends. Frustrated by gig platforms that commoditise their gifts. Want community but not another group chat.

**Jobs to be done:** Exchange what I'm good at for something I need, with someone I can trust, in a way that feels meaningful rather than transactional.

### Secondary: The Seeker
**Who they are:** Someone in The Voice's existing audience. Conscious-living adjacent. May not have a clear "offer" yet — needs the declaration process to clarify their own gifts.

**Pain points:** Feels like a consumer of other people's expertise. Wants to contribute but doesn't know how. Existing platforms are either too transactional or too passive (consume content, don't exchange).

**Jobs to be done:** Discover what I have to offer. Find one person to exchange with. Arrive.

### Edge User: The Node
**Who they are:** Members with 10+ completed exchanges. They have become connectors — people others want to exchange with.

**Jobs to be done:** Expand my constellation. Find members in new Worlds. Build a reputation that lives in my exchange count, not a star rating.

---

## The 4 Worlds

Each World is both a category and an identity. Members belong to one world primarily and connect across worlds.

| World | What lives here |
|---|---|
| **Wellness** | Movement, bodywork, mental health, nutrition, healing modalities, breathwork, sleep |
| **Entrepreneurship** | Strategy, tech, design, marketing, finance, legal, operations, growth |
| **Conscious Living** | Permaculture, sustainability, food growing, natural building, intentional community, spirituality |
| **Creative Life** | Music, writing, visual art, performance, craft, film, photography, storytelling |

---

## User Flows

### Flow 1: First Exchange (Onboarding)

```
Landing Page
    ↓
"Declare Your Energy" — form: name/alias, offer (free text + World), need (free text + World), location (optional), bio
    ↓
Profile created → State: WAITING_FOR_MATCH
    ↓
System runs matching (daily batch at MVP — can move to real-time in V2)
    ↓
Match found → Email + in-app notification: "Someone is ready to exchange with you."
72-hour window begins
    ↓
Member A initiates contact (in-app message or preferred contact method shared)
    ↓
Exchange happens in the real world (or video call)
    ↓
Both members independently confirm: "This exchange happened." (binary)
    ↓
Both confirmed → Exchange record sealed → Both members' states: COMMUNITY_MEMBER
    ↓
"You've arrived." — Arrival screen → redirect to Constellation
```

### Flow 2: Community Browse (Post-first-exchange)

```
Constellation view — grid of member cards
    ↓
Filter by World / location
    ↓
Click member card → See: offer, World, exchange count, member since
    ↓
"Request exchange" → enters queue for next match cycle
    ↓
System assigns match when both parties are in queue and compatible
```

### Flow 3: Match Expiry

```
Match assigned → 72-hour window
    ↓
No action from either party by hour 72
    ↓
Match released → Both parties return to WAITING_FOR_MATCH
    ↓
Email notification: "Your match has released. You'll be matched again soon."
```

### Flow 4: Membership Card Access

```
First exchange confirmed
    ↓
Card generated automatically (sigil seeded by member ID, data populated)
    ↓
Card visible on profile page
    ↓
Member can: view card, share image (PNG download), download print-ready PDF
    ↓
QR code on card → public verification URL → /verify/:token
    ↓
Verification page shows: member status, World, exchange count, member since
```

---

## Feature List

### MVP Features (Ship This)

**Onboarding & Matching**
- Declaration form (offer, need, World, location, bio)
- Profile creation with pending state
- Daily matching batch (algorithm: World overlap, offer/need complement, location)
- Admin match override
- 72-hour match window with automated expiry
- In-app messaging between matched pair only (no open DMs)
- Exchange confirmation (binary, both parties required)
- Arrival screen with community unlock

**Community**
- Constellation view (grid of confirmed members)
- World filter + location filter
- Member profile page (public-facing after first exchange)
- Exchange count visible on profiles
- Post-arrival exchange requests (queue-based)

**Forum**

- 4 World boards (Wellness, Entrepreneurship, Conscious Living, Creative Life)
- Members-only access (state must be `community_member`)
- Plain-text posts, max 800 chars, no markdown
- Three energy reactions: 🌱 Resonates · 🔥 Sparks · 🤝 Offering (no public counts)
- Chronological feed per board, no ranking
- Member flagging with reason dropdown
- Auto-hide after 3+ flags from distinct members
- Admin moderation queue (review, remove, dismiss, suspend)
- Soft-delete on removal — record preserved for audit

**Membership Card**
- Auto-generated card on first confirmed exchange
- Sigil: deterministic SVG constellation per member
- QR code per member (rqrcode gem)
- Virtual card display on profile
- PNG download
- Print-ready PDF download (credit-card dimensions, 300dpi)
- Member-gated verification page (/verify/:token — login required to view)
- Print-on-demand physical card via Gelato API (order from profile)

**Admin**
- Member list with states
- Match dashboard (view current matches, override, reassign)
- Exchange log
- Member suspension / flag
- Founding nodes configuration

**Auth & Account**
- Rails 8 built-in authentication
- Email/password
- Email verification
- Password reset
- Account deletion (GDPR-compliant, anonymises exchange records)

### MVP+ Features (Next Phase)

- Real-time matching (replace daily batch with event-driven queue)
- Sub-category tags within each World
- Member-to-member community reporting
- Animated virtual card (Lottie / CSS shimmer)
- Public profile pages indexable by search engines
- Mobile apps (React Native or PWA)
- Multi-language support (Spanish first, given LATAM wellness community overlap)
- Constellation visualisation (D3.js node graph, not just grid)
- Exchange circles (3+ members, value flows in a loop)

### Intentionally Excluded (Never)
- Money, credits, or any currency
- Star ratings or reviews
- Browsing before first exchange
- Paid tiers or paywalls on community access
- Advertising

---

## Forum & Moderation

### Access Rule
The forum is **members-only** — visible and writable only after a user's state reaches `community_member` (first exchange confirmed by both parties). Users in `declared` or `waiting_for_match` state see a locked placeholder: *"The conversation opens when your first exchange does."*

### Structure — 4 World Boards
Each World has its own board. Members choose which board to post in. Posts are not cross-posted.

| Board | Colour accent |
|---|---|
| Wellness | `#5a8a5a` (green) |
| Entrepreneurship | `#e8c97a` (sun/gold) |
| Conscious Living | `#4a8a80` (teal) |
| Creative Life | `#c46a6a` (rose) |

### Post Model
```
posts
  id (uuid)
  user_id → users
  world          # enum: wellness, entrepreneurship, conscious_living, creative_life
  body           # plain text, max 800 chars — no markdown, no rich text at MVP
  flagged        # boolean, default false
  removed        # boolean, default false
  created_at / updated_at

reactions
  id (uuid)
  post_id → posts
  user_id → users
  kind           # enum: resonates (🌱), sparks (🔥), offering (🤝)
  created_at
  UNIQUE (post_id, user_id, kind)
```

### Energy Reactions
Three symbolic reactions — no counts displayed publicly. A member can see which posts they've reacted to (their own state), but no aggregate number is shown to anyone. This removes performance metrics entirely.

| Emoji | Key | Meaning |
|---|---|---|
| 🌱 | `resonates` | This landed with me |
| 🔥 | `sparks` | This sparked something |
| 🤝 | `offering` | I can help with this |

**No upvote ranking.** Posts display chronologically within each board. No hot/trending/top logic.

### Moderation Flow

**Member flagging:**
- Any member can flag a post with a reason (dropdown: harmful content / spam / off-world / misrepresents exchange)
- Flagged posts are immediately dimmed (opacity reduced) for the flagger only — not removed yet
- Flags are not visible to other members

**Admin review:**
- Admin dashboard shows a flagged-posts queue sorted by flag count
- Admin actions: Remove post / Dismiss flag / Suspend member
- All actions are logged with admin ID + timestamp

**Auto-hide threshold:**
- If a post receives 3+ flags from different members, it is auto-hidden (not removed) pending admin review
- Auto-hidden posts show a placeholder: *"This post is under review."*

**Removal:**
- Only admins can permanently remove a post
- Removed posts are soft-deleted (`removed: true`) — the record stays for admin audit
- Member receives an email: *"A post you made has been removed. If you believe this was in error, reply to this email."*

**Suspension:**
- Admin can suspend a member directly from the flagged-posts queue
- Suspended members cannot post, react, or view the forum
- Their existing posts are hidden but not deleted

### New DB Tables
```
posts          (see above)
reactions      (see above)

post_flags
  id (uuid)
  post_id → posts
  reporter_id → users
  reason         # enum: harmful / spam / off_world / misrepresents_exchange
  resolved_at
  created_at
```

### MVP+ Forum Features (Deferred)
- Nested replies / threading
- Member-to-member direct messages (forum-triggered)
- Weekly digest email (top posts per World, opt-in)
- Search within boards
- Pin posts (admin only)
- Forum moderation by trusted members (reputation-based)

---

## Founding Exchange

The founding exchange between The Voice and The Builder is displayed as a pinned record in the constellation — the first node. It demonstrates:

1. The platform works
2. The founding relationship is transparent
3. The exchange was real and confirmed by both

Display on: constellation (pinned first), about page, landing page.

---

## Success Metrics

### North Star Metric
**Confirmed exchange rate** — percentage of matched pairs who complete and confirm an exchange.
Target: 60%+ at steady state.

### Launch Metrics (First 90 Days)
| Metric | Target |
|---|---|
| Declarations submitted | 500 |
| Matches made | 200 |
| Confirmed exchanges | 120 |
| Community members (arrived) | 120 |
| Cards downloaded (PNG or PDF) | 80 |
| Card QR scans (verification page) | 200 |

### Health Metrics (Ongoing)
| Metric | Target |
|---|---|
| Match expiry rate (neither party acts) | < 30% |
| Time from declaration to first match | < 14 days |
| Repeat exchange rate (2+ confirmed) | > 40% at 6 months |
| Admin interventions per week | < 5% of active matches |

---

## Monetisation Notes

enerG·X·change has no revenue model inside the platform. That is intentional and non-negotiable.

**Sustainable paths that respect the philosophy:**

1. **Optional donation on arrival** — "If this exchange meant something to you, contribute to keeping this infrastructure alive." One-time, optional, no value attached to community access.

2. **Physical card revenue** — When print-on-demand is added (MVP+), card printing can be offered at cost plus a small margin. Members pay for the physical artefact, not access.

3. **Community events** — Live gatherings, workshops, retreats facilitated by The Voice and community nodes. Paid events separate from the platform. Revenue stays with event organisers.

4. **Founding supporter NFT / token** — Out of scope for MVP but worth noting: a founding cohort of patrons who fund infrastructure costs in exchange for a recognised founding status in the constellation. Not a product feature — a community fundraising mechanism.

5. **B2B / institutional** — Organisations (companies, schools, intentional communities) could eventually host private constellations on the platform. Enterprise tier. Not MVP.

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Insufficient density for matching | High at launch | High | Launch with The Voice's audience (pre-warmed) as founding cohort |
| Match expiry creates frustration | Medium | Medium | Clear communication at each stage; fast re-match on expiry |
| Bad actors (false confirmations) | Low-Medium | High | Admin can investigate and reverse; both parties must confirm independently |
| Members declare but never follow through | Medium | Medium | 72-hour window creates urgency; notification sequence |
| Platform feels too esoteric for mass adoption | Low | Low | Not targeting mass adoption at MVP; targeting The Voice's specific audience |
| Physical card demand exceeds PDF capacity | Low | Low | PDF is static file generation; scales trivially |

---

## Data Model

### Core Tables

```
users
  id (uuid)
  email
  password_digest
  alias                  # Display name (can differ from legal name)
  role                   # enum: member, admin
  state                  # enum: declared, waiting_for_match, matched, community_member, suspended
  world                  # enum: wellness, entrepreneurship, conscious_living, creative_life
  secondary_world        # optional
  offer_text             # Free text: what they give
  need_text              # Free text: what they seek
  location               # Free text (city, region, or "anywhere")
  bio                    # Short optional text
  exchange_count         # Denormalised counter
  card_token             # UUID for public QR verification URL
  card_generated_at
  member_since           # Set when state transitions to community_member
  founding_node          # boolean (The Voice, The Builder)
  created_at / updated_at

matches
  id (uuid)
  initiator_id → users
  receiver_id  → users
  state        # enum: pending, active, expired, confirmed, cancelled
  expires_at   # 72 hours from assignment
  initiated_at # When one party first messaged
  created_at / updated_at

exchanges
  id (uuid)
  match_id → matches
  initiator_confirmed_at
  receiver_confirmed_at
  initiator_reflection   # Optional free text: what happened
  receiver_reflection    # Optional free text: what happened
  sealed_at              # Set when both confirm
  created_at / updated_at

messages
  id (uuid)
  match_id → matches
  sender_id → users
  body
  read_at
  created_at

membership_cards
  id (uuid)
  user_id → users (unique)
  sigil_svg              # Stored generated SVG string
  qr_code_data           # Stored QR SVG or data URL
  created_at / updated_at

posts
  id (uuid)
  user_id → users
  world          # enum: wellness, entrepreneurship, conscious_living, creative_life
  body           # plain text, max 800 chars
  flagged        # boolean, default false
  removed        # boolean, default false
  created_at / updated_at

reactions
  id (uuid)
  post_id → posts
  user_id → users
  kind           # enum: resonates, sparks, offering
  created_at
  UNIQUE (post_id, user_id, kind)

post_flags
  id (uuid)
  post_id → posts
  reporter_id → users
  reason         # enum: harmful / spam / off_world / misrepresents_exchange
  resolved_at
  created_at
```

### State Machine (User)

```
declared → waiting_for_match  (on profile submission)
waiting_for_match → matched   (on match assignment by system/admin)
matched → waiting_for_match   (on match expiry — 72h)
matched → community_member    (on both parties confirming exchange)
community_member → matched    (on new match assignment)
any → suspended               (admin action)
```

---

## Rails Tech Stack

### Ruby / Rails Version
- **Ruby 3.3+**
- **Rails 8.0** — using built-in authentication (no Devise)

### Key Gems

```ruby
# Auth
# Rails 8 built-in auth (rails generate authentication)

# Background Jobs
gem "sidekiq"              # Match batch processing, expiry workers, email delivery
gem "sidekiq-cron"        # Daily match run cron job

# Email
gem "postmark-rails"      # Transactional email — warm, deliverable

# PDF Generation
gem "prawn"               # Low-level PDF — gives full control over card layout
gem "prawn-svg"           # Render the member's sigil SVG inside the PDF

# QR Code
gem "rqrcode"             # Generate QR codes as SVG or PNG

# Image Export (PNG card download)
gem "grover"              # Headless Chrome via Puppeteer — render card HTML to PNG
# OR
gem "vips"                # libvips — faster, lighter alternative for image compositing

# Admin
gem "administrate"        # Convention-first admin dashboard

# State Machine
gem "aasm"                # Member state transitions

# Testing
gem "rspec-rails"
gem "factory_bot_rails"
gem "capybara"

# Utilities
gem "pagy"                # Pagination (constellation grid)
gem "noticed"             # Notifications (in-app + email)
gem "image_processing"    # Active Storage variants
```

### Infrastructure
- **Database:** PostgreSQL (UUID primary keys, good for card tokens)
- **Storage:** Active Storage → S3 (for generated card PNG / PDF files)
- **Cache / Queues:** Redis (Sidekiq backend)
- **Email:** Postmark
- **Hosting:** Fly.io or Render (Rails 8 deploy configs supported out of the box)

---

## Membership Card — Technical Specification

### Card Dimensions
- Virtual: 600px × 370px (standard business card ratio 1.618:1)
- Print PDF: 3.5" × 2" at 300dpi (1050 × 600px) — bleed-safe with 0.125" margin

### Card Visual Layout

```
┌─────────────────────────────────────────────────────┐
│  ·  ·  ·  ·   [SIGIL — right side, 40% width]       │ ← Texture: warm grain
│                                                      │
│  enerG · X · change                                 │
│                                                      │
│  [ALIAS]                                             │
│  [Primary World]                                     │
│                                                      │
│  [OFFER — short line, italic]                        │
│                                                      │
│  ─────────────────                                   │
│  [n] exchanges  ·  member since [month year]         │
│                                                      │
│  [QR CODE — bottom right, 60px × 60px]               │
└─────────────────────────────────────────────────────┘
```

### Sigil Algorithm (Ruby)

The sigil is a deterministic constellation — a set of points connected by lines — seeded by the member's UUID.

```ruby
# app/concerns/sigil_generator.rb
module SigilGenerator
  VIEWBOX = 200
  NUM_STARS = 8
  NUM_LINES = 5

  def self.generate(user_id)
    seed = user_id.gsub("-", "").to_i(16) % (2**32)
    rng  = Random.new(seed)

    points = NUM_STARS.times.map do
      x = rng.rand(20..180).round(1)
      y = rng.rand(20..180).round(1)
      r = rng.rand(1.2..3.0).round(1)
      { x:, y:, r: }
    end

    # Deterministic line pairs (not random pairs — ensures reproducibility)
    pairs = NUM_LINES.times.map do |i|
      [i % NUM_STARS, (i + rng.rand(2..4)) % NUM_STARS]
    end

    build_svg(points, pairs)
  end

  def self.build_svg(points, pairs)
    lines = pairs.map do |a, b|
      pa, pb = points[a], points[b]
      %(<line x1="#{pa[:x]}" y1="#{pa[:y]}" x2="#{pb[:x]}" y2="#{pb[:y]}" stroke="rgba(196,168,130,0.35)" stroke-width="0.5"/>)
    end.join

    stars = points.map do |p|
      %(<circle cx="#{p[:x]}" cy="#{p[:y]}" r="#{p[:r]}" fill="rgba(196,168,130,0.7)"/>)
    end.join

    <<~SVG
      <svg viewBox="0 0 #{VIEWBOX} #{VIEWBOX}" xmlns="http://www.w3.org/2000/svg">
        #{lines}
        #{stars}
      </svg>
    SVG
  end
end
```

### QR Code Generation

```ruby
# In MembershipCard model after_create callback
def generate_qr
  qr = RQRCode::QRCode.new(
    Rails.application.routes.url_helpers.verify_url(user.card_token),
    level: :m
  )
  self.qr_code_data = qr.as_svg(
    color:          "c4a882",
    shape_rendering: "crispEdges",
    module_size:    3,
    standalone:     true,
    use_path:       true
  )
  save!
end
```

### Card Verification Page — Members Only

Route: `GET /verify/:token`  
Controller: `VerificationsController#show` — **authentication required**  
Access: any confirmed community member can view; non-members and logged-out users see a prompt to declare first

Response: HTML page matching the brand aesthetic

Displays (to verified members):
- ✓ Verified member status + their sigil
- World
- Exchange count
- Member since

Does not display: email, location, offer/need text

Rationale: keeping verification gated reinforces the community's exclusivity and prevents the member roster from being scraped. Scanning a card at an event becomes a moment of mutual recognition — both the scanner and the scannee are inside.

### Print-on-Demand — Gelato Integration

**Why Gelato over Printful:** Better fulfilment coverage across Africa (Kenya, Nigeria, South Africa) and Europe — matching where the founding community lives. No inventory. Cards printed locally to the member's location.

**Flow:**

```
Member clicks "Order my card" on /card
    ↓
CardOrdersController#create
    ↓
GelateOrderService.call(user, shipping_address)
    → POST https://order.gelatoapis.com/v4/orders
    → Payload: product_uid (business card SKU), recipient, files: [card_pdf_url]
    ↓
Gelato returns order_id → stored on card_order record
    ↓
Gelato webhook (POST /webhooks/gelato) → update order status
    ↓
Email to member on dispatch
```

**Product UID:** `business_cards_14pt_glossy_4x4_2sided` (or equivalent Gelato business card SKU — confirm in Gelato dashboard)

**Key Gelato API calls:**
```ruby
# app/services/gelato_order_service.rb
class GelatoOrderService
  API_URL = "https://order.gelatoapis.com/v4/orders"

  def self.call(user, address)
    payload = {
      orderType: "order",
      orderReferenceId: "card-#{user.id}",
      customerReferenceId: user.id,
      currency: "USD",
      items: [{
        itemReferenceId: "card-item-#{user.id}",
        productUid: ENV["GELATO_CARD_PRODUCT_UID"],
        files: [{ type: "default", url: card_pdf_url(user) }],
        quantity: 10  # min order — member gets 10 cards
      }],
      shipmentMethodUid: "gelato_standard",
      shippingAddress: {
        firstName:   address[:first_name],
        lastName:    address[:last_name],
        addressLine1: address[:line1],
        city:        address[:city],
        country:     address[:country_code],
        email:       user.email
      }
    }

    response = HTTParty.post(API_URL,
      headers: { "X-API-KEY" => ENV["GELATO_API_KEY"], "Content-Type" => "application/json" },
      body: payload.to_json
    )

    response.parsed_response
  end
end
```

**New table:**
```
card_orders
  id (uuid)
  user_id → users
  gelato_order_id
  status          # enum: pending, accepted, printing, shipped, cancelled
  shipping_address_json
  quantity        # default 10
  cost_cents      # what Gelato charges us
  created_at / updated_at
```

**New gem:**
```ruby
gem "httparty"   # for Gelato API calls (or use Faraday if already present)
```

### PDF Generation (Prawn)

```ruby
# app/services/card_pdf_service.rb
class CardPdfService
  CARD_W = 252  # 3.5" at 72dpi for Prawn points; Prawn scales to 300dpi on output
  CARD_H = 144  # 2.0" at 72dpi

  def initialize(user)
    @user = user
    @card = user.membership_card
  end

  def generate
    Prawn::Document.new(
      page_size:   [CARD_W, CARD_H],
      margin:      [9, 9, 9, 9],
      background:  "1a1410"
    ) do |pdf|
      render_background(pdf)
      render_wordmark(pdf)
      render_member_info(pdf)
      render_sigil(pdf)
      render_qr(pdf)
    end
  end

  private
  # ... render methods
end
```

---

## Key Screens

### 1. Declaration Form (`/declare`)
- Minimal single-page form
- Fields: alias, primary world (radio, 4 options with colour coding), offer (textarea), need (textarea), location (optional text), bio (optional)
- CTA: "Submit your declaration"
- State after submit: confirmation page — "You're in the queue. We'll find your match."

### 2. Match Notification Email + In-App
- Subject line: "Someone is ready to exchange with you."
- Body: their alias, world, offer excerpt
- 72-hour timer displayed
- CTA: "Begin the exchange"

### 3. Match Screen (`/match`)
- Shows matched member's card: alias, world, offer, what they need
- Timer countdown
- "Initiate exchange" button → opens in-app message thread
- "I'm not ready" → releases match (returns both to queue)

### 4. Exchange Confirmation (`/exchange/:id/confirm`)
- Simple screen: "Did this exchange happen?"
- Two buttons: "Yes, it happened" / "It didn't happen"
- Optional free-text reflection (not published — private record)
- If both confirm: redirect to Arrival screen

### 5. Arrival Screen
- Full-screen moment: "You've arrived."
- Shows their generated card for the first time
- Card download options (PNG, PDF)
- "Enter the constellation" CTA

### 6. Constellation (`/community`)
- Grid of member nodes (avatar/icon, alias, world, offer snippet)
- Filter bar: World / location
- Click node → member profile

### 7. Member Profile (`/members/:id`)
- Public-facing (to other community members only)
- Shows: alias, world, offer, exchange count, member since
- Their sigil (large)
- "Request exchange" button (if you're a member)

### 8. My Card (`/card`)
- Virtual card display (animated shimmer border on hover)
- Download PNG button
- Download print-ready PDF button
- "Share your card" — copies public verification URL

### 9. Admin Dashboard (`/admin`)
- Members table: state, world, declaration date
- Matches table: pair, state, expiry, actions (override, release)
- Exchange log: sealed exchanges, reflection snippets
- Suspension controls
- Flagged posts queue: sorted by flag count, with actions — Remove / Dismiss / Suspend member

---

## Brand & Design System

### Palette (from v3 landing page)
```css
--soil:    #1a1410;   /* Page background */
--bark:    #2a2018;   /* Card / panel backgrounds */
--warm:    #3a2e20;   /* Hover states */
--sand:    #c4a882;   /* Body text accent, borders */
--sun:     #e8c97a;   /* Primary accent, italic highlights */
--ember:   #d4622a;   /* CTA, status indicators */
--green:   #5a8a5a;   /* Wellness world */
--teal:    #4a8a80;   /* Conscious Living world */
--rose:    #c46a6a;   /* Creative Life world */
--cream:   #f5ede0;   /* Primary text */
```

### Typography
- **Headings:** Fraunces, weight 200–300, italic for emphasis
- **Body:** DM Sans, weight 300–400
- **Labels / eyebrows:** DM Sans, 0.55–0.65rem, letter-spacing 0.3–0.4em, uppercase
- Google Fonts: `Fraunces:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400` + `DM+Sans:wght@300;400;500`

### World Colour Mapping
| World | Colour | Hex |
|---|---|---|
| Wellness | Green | #5a8a5a |
| Entrepreneurship | Sun / Gold | #e8c97a |
| Conscious Living | Teal | #4a8a80 |
| Creative Life | Rose | #c46a6a |

### Interaction Principles
- No custom cursor in the app (keep cursor:default — the cosmic cursor is landing page only)
- Transitions: 0.3s ease for hover states, 0.8s ease for scroll reveals
- No drop shadows — use border and background gradient instead
- Confirmation moments (arrival, card reveal) use full-screen overlays with a slow fade

---

## Launch Plan

### Phase 0 — Closed Beta (Weeks 1–4)
- The Voice sends invitations to ~50 handpicked members from their community
- Builder is admin; matches are curated manually in this phase
- Goal: 20 confirmed exchanges, 20 community members, 20 cards generated
- Gather qualitative feedback on the declaration form, match quality, confirmation flow

### Phase 1 — Invite Wave (Weeks 5–10)
- Each member can invite 2 people (referral via unique link, not public)
- Algorithm matching goes live (replaces manual)
- Goal: 150 declarations, 80 confirmed exchanges
- Card downloads begin; QR verification page live

### Phase 2 — Open Declaration (Weeks 11–20)
- Public landing page goes live with "Begin your declaration" CTA
- No invite required to declare — but you still can't see the community until you exchange
- Goal: 500 declarations, 200+ community members
- Optional arrival donation prompt A/B tested

---

## Project File Structure (Rails)

```
app/
  controllers/
    declarations_controller.rb
    matches_controller.rb
    exchanges_controller.rb
    cards_controller.rb
    verifications_controller.rb   ← public, no auth
    community_controller.rb
    forum_controller.rb
    post_flags_controller.rb
    admin/
      base_controller.rb
      members_controller.rb
      matches_controller.rb
      exchanges_controller.rb
      posts_controller.rb            ← moderation queue
  models/
    user.rb
    match.rb
    exchange.rb
    message.rb
    membership_card.rb
    post.rb
    reaction.rb
    post_flag.rb
  concerns/
    sigil_generator.rb
  services/
    matching_service.rb           ← daily batch algorithm
    card_pdf_service.rb
    card_png_service.rb
  jobs/
    run_matching_job.rb           ← Sidekiq + sidekiq-cron (daily)
    expire_matches_job.rb         ← Sidekiq, run every hour
    generate_card_job.rb          ← after exchange sealed
  views/
    declarations/
    matches/
    exchanges/
    cards/
    verifications/
    community/
    forum/
    admin/
  mailers/
    match_mailer.rb
    exchange_mailer.rb
    arrival_mailer.rb
```

---

## CLAUDE.md Setup Note

When initialising this Rails project, add a `CLAUDE.md` in the project root with:
- The 4 Worlds as fixed constants (no adding new categories without product decision)
- The "No money inside" rule — flag any Stripe/payment gem additions immediately
- The "No ratings" rule — no stars, no numeric scores anywhere in the UI
- Card token must always be UUID — never expose user ID in QR URL
- Sigil algorithm is deterministic — the same member ID must always produce the same SVG
- Admin overrides are logged — every manual match intervention creates an audit record
