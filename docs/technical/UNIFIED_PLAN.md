# enerG·X·change — Unified Build Plan

**Last Updated:** 2026-05-02  
**Stack:** React/Next.js + Firebase + Tailwind CSS  
**Architecture:** Free-tier (USD 0/month)

---

## What We're Building

A barter/energy-exchange platform where members earn community access by completing one real exchange.

### Core Rules (Hard Constraints)
1. **No money/payments** (except Gelato for physical cards)
2. **No ratings/reviews**
3. **No browsing profiles** before first exchange
4. **Card token = UUID** (for QR verification)
5. **Exchange must be real** (in-person or virtual)

### User Journey
```
Landing Page (index.html)
    ↓
Profile Creation (3 steps: Who I Am → What I Offer → What I Want)
    ↓
State: "declared" → Firestore query for match
    ↓
Rule-Based Matching (same World + complementary skills)
    ↓
State: "waiting_for_match" → Notification sent
    ↓
Real-life Exchange Happens
    ↓
Both Confirm: "Exchange Happened" (binary)
    ↓
State: "community_member" → Unlock Constellation + Browsing
    ↓
Generate Membership Card (PDF + QR code)
```

---

## Tools We Set Up & How We're Using Them

### 1. VS Code Extensions (Installed)
| Extension | Purpose | How We Use It |
|---|---|---|
| **ES7 React Snippets** | React code snippets | Quick component scaffolding (`rfce`, `rfc`, etc.) |
| **ESLint** | Code linting | Enforce React/Next.js best practices |
| **Prettier** | Code formatting | Auto-format on save for consistent style |
| **Tailwind CSS IntelliSense** | CSS autocomplete | Autocomplete Tailwind classes in JSX |
| **Tailwind Docs** | Quick docs access | Cmd+Shift+P → "Tailwind: Search Docs" |
| ~~Shopify Ruby LSP~~ | *Not used* | We switched from Rails to React |
| ~~Rails Snippets~~ | *Not used* | We switched from Rails to React |

### 2. Claude Code Plugins (Installed)
| Plugin | Purpose | How We Use It |
|---|---|---|
| **codewarden** (React) | Code quality checks | Run via Claude: "Check my React code with codewarden" |
| **vibe-coding-plugin** (React) | React workflow | Run via Claude: "Use vibe plugin to scaffold component" |
| ~~rails-simplifier~~ | *Not used* | Switched from Rails |
| ~~maquina-ui-standards~~ | *Not used* | Switched from Rails |

### 3. Boilerplates Created
Located at `~/.claude/boilerplates/`:

#### React Boilerplate (`~/.claude/boilerplates/react/`)
- **CLAUDE.md** → Copy to project root for React/Next.js AI instructions
- **workflows.md** → 8 React workflows (component, page, hook, context, etc.)
- **product-definition.md** → Product management template
- **setup.sh** → Auto-setup script (copies all files to project)

**Usage:**
```bash
cd /Users/tichlabs/Documents/enerGXchange/nextapp
~/.claude/boilerplates/setup.sh react .
```

---

## Tech Stack & Free-Tier Services

| Layer | Technology | Free Tier Limit | Purpose |
|---|---|---|---|
| **Frontend** | Next.js 15 + React 19 | GitHub Pages (static) | Profile creation, matching UI |
| **Styling** | Tailwind CSS 4 | Free | Same design system as landing page |
| **Database** | Firestore (Firebase) | 1GB, 50K reads/day | User profiles, matches, exchanges |
| **Auth** | Firebase Auth | Free, unlimited users | Email/password + Google login |
| **Hosting (All)** | GitHub Pages | Free, static files | Landing + Next.js static export |
| **File Storage** | Firebase Storage | 5GB free | Membership card PDFs |
| **Visualization** | Looker Studio | Free, unlimited | User growth, match success charts |
| **Data Entry** | Google Sheets | Free, 15GB | Admin bulk user import |
| **Realtime** | Firestore listeners | Built-in | Match notifications |

**No Vercel needed** — Entire app runs as static files on GitHub Pages.

---

## Build Phases (Step-by-Step)

### Phase 1: Project Setup (Today)
**Goal:** Scaffold Next.js app with Firebase + Tailwind

```bash
# 1. Create Next.js app (App Router + TypeScript + Tailwind)
cd /Users/tichlabs/Documents/enerGXchange
npx create-next-app@latest nextapp --typescript --tailwind --app --src-dir --import-alias "@/*"

# 2. Install dependencies
cd nextapp
npm install firebase react-hook-form jspdf qrcode.react

# 3. Copy boilerplate configs
~/.claude/boilerplates/setup.sh react .

# 4. Setup Firebase project
# Go to https://console.firebase.google.com
# Create project: "enerGXchange"
# Enable: Authentication (Email/Password + Google), Firestore, Storage
# Copy config to lib/firebase.ts
```

### Phase 2: Profile Creation (This Week)
**Goal:** 3-step wizard: Who I Am → What I Offer → What I Want

**Files to Create:**
```
nextapp/src/
├── app/
│   ├── layout.tsx              Root layout (Tailwind + fonts)
│   ├── page.tsx                 Redirect to /profile/new
│   └── profile/
│       └── new/
│           ├── page.tsx         Wizard container
│           ├── Step1_WhoIAm.tsx
│           ├── Step2_WhatIOffer.tsx
│           └── Step3_WhatIWant.tsx
├── components/
│   ├── WorldSelector.tsx        (4 Worlds with colors)
│   └── ProgressBar.tsx         (wizard progress)
└── lib/
    └── firebase.ts              Firebase initialization
```

**Claude Workflow:**
```
"Use vibe-coding-plugin to scaffold the profile creation wizard with 3 steps"
"Create Step1_WhoIAm component with react-hook-form and Tailwind"
"Create WorldSelector component with 4 Worlds (wellness, entrepreneurship, conscious_living, creative_life)"
```

### Phase 3: Matching Engine (Next Week)
**Goal:** Rule-based matching using Firestore queries

**Algorithm:**
1. Query users where `state = 'declared'` AND `world = currentUser.world`
2. Filter by complementary offer/want (keyword match)
3. Score by location proximity
4. Create match document in Firestore
5. Update both users to `state = 'waiting_for_match'`

**Files to Create:**
```
nextapp/src/
├── lib/
│   └── matching.ts             Matching algorithm
└── app/
    └── match/
        ├── page.tsx            Show current match
        └── confirm.tsx         Confirm exchange happened
```

**Claude Workflow:**
```
"Create matching.ts function that queries Firestore for compatible users"
"Implement rule-based matching: same World + complementary skills"
```

### Phase 4: Exchange & Community (Following Week)
**Goal:** Confirm exchanges, unlock community features

**Features:**
- Binary confirmation: "Exchange Happened" (no ratings)
- State transition: `waiting_for_match` → `community_member`
- Generate membership card (jsPDF + QR code)
- Constellation view (community visualization)

**Files to Create:**
```
nextapp/src/
├── app/
│   ├── community/
│   │   └── page.tsx            Constellation view (gated)
│   └── verify/
│       └── [token]/
│           └── page.tsx        QR verification page
├── components/
│   ├── MembershipCard.tsx      PDF generation + QR
│   └── Constellation.tsx       Community visualization
└── lib/
    └── pdfGenerator.ts         jsPDF logic
```

---

## How We Use Claude Code Plugins (Examples)

### Example 1: Scaffold Profile Wizard
```
User: "Use vibe-coding-plugin to create the profile creation wizard with 3 steps: Who I Am, What I Offer, What I Want"

Claude will:
1. Read ~/.claude/boilerplates/react/workflows.md
2. Follow "Create Component" workflow
3. Generate Step1_WhoIAm.tsx, Step2_WhatIOffer.tsx, Step3_WhatIWant.tsx
4. Use Tailwind CSS + react-hook-form
```

### Example 2: Check Code Quality
```
User: "Run codewarden on the matching.ts file"

Claude will:
1. Run codewarden checks
2. Report issues (ESLint errors, TypeScript issues, etc.)
3. Auto-fix if possible
```

### Example 3: Generate Component
```
User: "Use vibe plugin to create WorldSelector component with 4 Worlds"

Claude will:
1. Follow component workflow from workflows.md
2. Create interactive card selection with Tailwind
3. Use Fraunces font + brand colors
```

---

## File Structure (Final)

```
enerGXchange/
├── index.html                  Landing page (GitHub Pages)
├── nextapp/                    Next.js app (static export → GitHub Pages)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── new/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── Step1_WhoIAm.tsx
│   │   │   │       ├── Step2_WhatIOffer.tsx
│   │   │   │       └── Step3_WhatIWant.tsx
│   │   │   ├── match/
│   │   │   │   ├── page.tsx
│   │   │   │   └── confirm.tsx
│   │   │   ├── community/
│   │   │   │   └── page.tsx
│   │   │   └── verify/
│   │   │       └── [token]/
│   │   │           └── page.tsx
│   │   ├── components/
│   │   │   ├── WorldSelector.tsx
│   │   │   ├── MembershipCard.tsx
│   │   │   └── Constellation.tsx
│   │   ├── lib/
│   │   │   ├── firebase.ts
│   │   │   ├── matching.ts
│   │   │   └── pdfGenerator.ts
│   │   └── context/
│   │       └── AuthContext.tsx
│   ├── out/                   ← Static build output (auto-generated)
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy.yml    ← Auto-deploys to GitHub Pages
│   ├── tailwind.config.ts
│   ├── package.json
│   └── CLAUDE.md              (copied from boilerplate)
│
├── docs/                       Documentation
├── CLAUDE.md                   Project AI instructions
├── BUILD_LOG.md               Build phases (original Rails plan)
├── BUILD_GAPS.md              Gap analysis
├── REACT_FIREBASE_PLAN.md      React architecture
└── UNIFIED_PLAN.md             This file
```

---

## Google Sheets → Looker Studio Pipeline

### Data Flow:
```
Google Sheets (Data Entry)
    ↓ (Apps Script sync)
Firestore (Users, Matches, Exchanges)
    ↓ (BigQuery connector)
Looker Studio (Dashboards)
```

### Looker Studio Reports:
1. **User Growth** (line chart: signups over time)
2. **World Distribution** (pie chart: % per World)
3. **Match Success Rate** (bar chart: confirmed vs expired)
4. **Location Heatmap** (geo chart: users by city)

---

## Commands to Run (Copy-Paste)

### Setup Firebase Project:
```bash
# 1. Go to https://console.firebase.google.com
# 2. Create project: "enerGXchange"
# 3. Enable Authentication → Sign-in methods → Email/Password + Google
# 4. Create Firestore database → Test mode
# 5. Get config from Project Settings → General → Your apps → Web app
```

### Scaffold Next.js App:
```bash
cd /Users/tichlabs/Documents/enerGXchange
npx create-next-app@latest nextapp --typescript --tailwind --app --src-dir --import-alias "@/*"
cd nextapp
npm install firebase react-hook-form jspdf qrcode.react
```

### Copy Boilerplate Configs:
```bash
cd /Users/tichlabs/Documents/enerGXchange/nextapp
~/.claude/boilerplates/setup.sh react .
```

---

## Build Phases

| Phase | Status | Description |
|---|---|---|
| **Phase 1** | ✅ Done | Project setup (Next.js + Firebase + Tailwind + Static Export) |
| **Phase 2** | ⏳ Todo | Profile creation (3-step wizard) |
| **Phase 3** | ⏳ Todo | Rule-based matching engine |
| **Phase 4** | ⏳ Todo | Exchange confirmation + community unlock |
| **Phase 5** | ⏳ Todo | Membership cards (PDF + QR) + Constellation view |

### Phase 1 Completed:
- ✅ Next.js 15 app scaffolded (`nextapp/`)
- ✅ Firebase config (`src/lib/firebase.ts`)
- ✅ Static export configured (`next.config.ts` with `output: 'export'`)
- ✅ GitHub Pages deployment (`.github/workflows/deploy.yml`)
- ✅ CTA link added to `index.html` → `/enerGXchange/`
- ✅ Dependencies installed (firebase, react-hook-form, jspdf, qrcode.react)
- ✅ React boilerplate copied (workflows.md, product-definition.md)

---

## Local Development (Two Options)

### Option A: Simple HTTP Server (Full Flow: Landing + App)
```bash
# 1. Build Next.js static export
cd nextapp
npm run build
# Output: nextapp/out/ folder

# 2. Start simple HTTP server (serves landing + app)
cd ..
node serve.js
# Opens: http://localhost:8080/ (landing page)
# Next.js app: http://localhost:8080/enerGXchange/
```

### Option B: Next.js Dev Server (Hot Reload, No Landing)
```bash
cd nextapp
npm run dev
# Opens: http://localhost:3000/ (Next.js app only)
# Note: Landing page (index.html) NOT served
```

### Landing Page as Design Guide
- `index.html` is the static landing page (already built)
- Use it as **UI/UX reference** for Next.js components
- **Design system** (colors, fonts, spacing) defined in `index.html`
- **Fonts:** Fraunces (headings) + DM Sans (body)
- **Colors:** `--soil`, `--bark`, `--sand`, `--sun`, `--ember` (defined in CSS vars)
- Next.js app should match this design (Tailwind config updated in Phase 2)

---

## Summary

| Question | Answer |
|---|---|
| **What are we building?** | Barter platform with profile → match → exchange → community flow |
| **What stack?** | Next.js 15 (Static) + Firebase + Tailwind (free-tier, GitHub Pages only) |
| **How do we use the tools?** | VS Code extensions for dev, Claude plugins for scaffolding/quality |
| **What's the first step?** | Build profile creation wizard (Phase 2) |
| **Where's the plan?** | This file (UNIFIED_PLAN.md) + REACT_FIREBASE_PLAN.md |

---

*Created: 2026-05-02 — Single source of truth for enerGXchange build*
