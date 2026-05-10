# enerG·X·change — Build Analysis & Gaps

## Current State (What Exists)

### ✅ Already Done
1. **Landing Page** (`index.html`) — Complete with:
   - Design system (Fraunces + DM Sans, 4 Worlds color scheme)
   - Hero, How it Works, Exchange Examples, Match Moment, Forum, Community Constellation
   - Membership Card, Comparison Table, CTA section
   - Mobile responsive, theme toggle (dark/light)

2. **Product Docs** (`docs/`)
   - `MVP_BUSINESS_PLAN.md` — Business plan, 4 Worlds, user journeys
   - `RESEARCH_REPORT.md` — Market research

3. **CLAUDE.md** — AI instructions with:
   - Hard rules (no money, no ratings, no browsing before first exchange)
   - User state machine (declared → waiting_for_match → matched → community_member)
   - Design system specs
   - Key gems listed (aasm, rqrcode, prawn, sidekiq, etc.)

4. **BUILD_LOG.md** — Build phases documented:
   - Phase 1-5 outlined (Foundation → Core Flow → Exchange → Community → Polish)
   - Free-tier architecture (Render, Supabase/PostgreSQL, Cloudflare R2)

---

## Gaps Analysis (What's Missing vs. dev-setup.html + CLAUDE.md)

### 🔴 Critical Gaps (Must Fix Before Deploy)

| Gap | Status | Why |
|---|---|---|
| **Rails App Not Scaffolded** | ❌ Missing | Only HTML landing exists, no `rails new` yet |
| **Maquina Generators Not Used** | ❌ Missing | dev-setup.html specifies `rails g maquina:app --auth registration` |
| **Tailwind CSS Not Configured** | ❌ Missing | Landing uses custom CSS, not Tailwind utilities |
| **Sidekiq vs Solid Queue** | ⚠️ Conflict | BUILD_LOG says Solid Queue (free), CLAUDE.md says sidekiq |
| **Administrate vs Simple Admin** | ⚠️ Conflict | BUILD_LOG says Administrate, no admin gem in CLAUDE.md |
| **No Database Schema** | ❌ Missing | No migrations, no `db/schema.rb` |
| **No Models Defined** | ❌ Missing | User, Match, Exchange, World models don't exist |
| **No Controllers/Routes** | ❌ Missing | Only static HTML exists |

### 🟡 Medium Gaps (Should Fix)

| Gap | Status | Why |
|---|---|---|
| **maquina_components Not Installed** | ❌ Missing | dev-setup.html uses maquina-components for UI |
| **Stimulus Controllers** | ❌ Missing | CLAUDE.md references better-stimulus plugin |
| **QR Code Generation** | ❌ Missing | rqrcode gem listed but not implemented |
| **PDF Export (Prawn)** | ❌ Missing | Membership card PDF not built |
| **Admin Panel** | ❌ Missing | administrate gem referenced but not installed |
| **Gelato API Integration** | ❌ Missing | Physical card ordering not implemented |
| **Noticed Notifications** | ❌ Missing | Gem in CLAUDE.md but no implementation |
| **AASM State Machine** | ❌ Missing | User state machine defined but not coded |

### 🟢 Minor Gaps (Nice to Have)

| Gap | Status | Why |
|---|---|---|
| **Claude Code Plugins Not Installed** | ❌ Missing | dev-setup.html specifies rails-simplifier, etc. |
| **MVPs Not Generated** | ❌ Missing | mvp-creator plugin ready but not run |
| **GitHub Pages** | ⚠️ Partial | index.html exists but not deployed |
| **Tests** | ❌ Missing | No test suite, no `bin/rspec` |
| **CI/CD** | ❌ Missing | No GitHub Actions, no `bin/ci` script |

---

## Recommended Build Order (Using OpenCode + Claude)

### Step 1: Scaffold Rails App (Use Boilerplate)
```bash
# Navigate to project
cd /Users/tichlabs/Documents/enerGXchange

# Backup current landing page
mkdir -p landing_backup
cp index.html landing_backup/

# Run Maquina boilerplate (from dev-setup.html)
~/.claude/boilerplates/setup.sh rails .
```

This will copy:
- `CLAUDE.md` (overwrite with our custom one)
- `.claude/settings.json` (plugins pre-configured)
- `workflows.md`
- `product-definition.md`

### Step 2: Fix Conflicts BEFORE Coding

**Conflict 1: Sidekiq vs Solid Queue**
```bash
# Option A: Follow BUILD_LOG (Free-tier, use Solid Queue)
# Remove sidekiq from CLAUDE.md, use Rails 8 Solid Queue

# Option B: Follow CLAUDE.md (use Sidekiq)
# Keep sidekiq, remove Solid Queue mention from BUILD_LOG
```
**Decision: Use Solid Queue (free-tier, Rails 8 native)**

**Conflict 2: Administrate vs Simple Admin**
```bash
# Decision: Use Administrate (as per BUILD_LOG)
# Add to Gemfile: gem 'administrate'
```

### Step 3: Run Maquina App Generator

```bash
# Install Maquina gems
bundle add maquina_generators --group development
bundle add maquina_components

# Run the full app generator
rails g maquina:app --auth registration --prefix /admin --port 3000

# This generates:
# - Authentication (registration with Account + roles)
# - Multi-tenancy (Account scoping)
# - Rack Attack (request protection)
# - Solid Queue (background jobs)
# - Solid Errors (error tracking)
# - Mission Control (job dashboard)
# - maquina_components (UI components)
# - Action Text, Active Storage, Turbo
```

### Step 4: Define Core Models (Using Claude Code)

```bash
# Start Claude Code in project
cd /Users/tichlabs/Documents/enerGXchange
claude
```

**Prompt for Claude:**
```
> Based on CLAUDE.md and BUILD_LOG.md, create the core models:
> 1. User model with AASM state machine (declared → waiting_for_match → matched → community_member)
> 2. World model (4 fixed Worlds: wellness, entrepreneurship, conscious_living, creative_life)
> 3. Match model (user_1, user_2, state, expires_at)
> 4. Exchange model (match_id, giver_id, receiver_id, confirmed_at)
> 5. MembershipCard model (user_id, card_token UUID, pdf_url)
> Follow 37signals patterns, use Thin Controllers / Rich Models
```

### Step 5: Implement Core Flow

**Prompt for Claude:**
```
> Implement the matching algorithm:
> - Pair users by World compatibility + offer/want match
> - Set match expiry to 7 days
> - Send notifications via Noticed gem
> - Use Solid Queue for background processing
```

**Prompt for Claude:**
```
> Build the exchange confirmation flow:
> - Both users must confirm within 7-day window
> - Binary confirmation (happened or didn't)
> - On dual confirmation → transition both users to community_member
> - Generate membership card PDF (Prawn) with QR code (rqrcode)
> - Send physical card via Gelato API (httparty)
```

### Step 6: Build UI with Maquina Components

**Prompt for Claude:**
```
> Create views using maquina_components:
> - Declaration form (offer/want + World selection)
> - Constellation view (only visible to community_members)
> - Membership card display with QR verification
> - Admin panel (Administrate) for manual match overrides
> - Follow design system from CLAUDE.md (Fraunces, DM Sans, 4 Worlds colors)
```

### Step 7: Security & Audit

**Prompt for Claude:**
```
> Run rails-security-auditor
> Fix all critical and high severity issues
> Ensure no money/payments (Stripe, credits) are added
> Ensure no ratings/stars in UI
> Ensure card_token is UUID, not user ID/email in URLs
> Log all admin overrides to audit table
```

### Step 8: Deploy to Render (Free Tier)

```bash
# Push to GitHub
git add .
git commit -m "Initial Rails scaffold with Maquina"
git push origin main

# Connect Render.com to repo
# Set environment variables:
# - SECRET_KEY_BASE
# - DATABASE_URL (PostgreSQL)
# - CLOUDFLARE_R2 credentials
# - GELATO_API_KEY
# - RESEND_API_KEY
```

---

## Where to Start RIGHT NOW

```bash
cd /Users/tichlabs/Documents/enerGXchange

# 1. Backup landing page
cp index.html landing_backup/

# 2. Run boilerplate setup (installs plugins)
~/.claude/boilerplates/setup.sh rails .

# 3. Scaffold Rails app with Maquina
rails new . --css tailwind --database postgresql --force
# (Use --force to overwrite current directory)

# 4. Install Maquina
bundle add maquina_generators --group development
bundle add maquina_components
rails g maquina:app --auth registration

# 5. Open Claude Code
claude
```

**First prompt in Claude:**
```
> Read CLAUDE.md and BUILD_LOG.md
> Resolve the Sidekiq vs Solid Queue conflict (choose Solid Queue for free-tier)
> Update Gemfile to remove gem conflicts
> Create the core models (User with AASM, World, Match, Exchange)
> Follow 37signals patterns from rails-simplifier
```

---

## Files to Cross-Reference

| File | Purpose |
|---|---|
| `/Users/tichlabs/Documents/codebase/dev-setup.html` | Reference for all tools/plugins |
| `/Users/tichlabs/.claude/boilerplates/rails/CLAUDE.md` | Boilerplate config (will overwrite project's) |
| `/Users/tichlabs/Documents/enerGXchange/CLAUDE.md` | **Project's AI instructions** (KEEP THIS) |
| `/Users/tichlabs/Documents/enerGXchange/BUILD_LOG.md` | Build phases + free-tier architecture |
| `/Users/tichlabs/Documents/enerGXchange/docs/MVP_BUSINESS_PLAN.md` | Product specs + user journeys |

---

## Summary

**Current State:** Static HTML landing page only
**Target State:** Rails 8 app with Maquina, matching engine, exchange flow, community platform
**Biggest Gap:** No Rails app exists yet — must scaffold with `rails new` + Maquina
**Recommended Path:** Run boilerplate → Fix conflicts → Scaffold with Maquina → Build with Claude Code
