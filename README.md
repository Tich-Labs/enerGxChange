# enerG·X·change

A barter/energy-exchange platform where members earn community access by completing one real exchange.

**Live:** [https://tichlabs.github.io/enerGXchange/](https://tichlabs.github.io/enerGXchange/) | **Stack:** Next.js 15 (Static) + Firebase + Tailwind CSS

Note: the app-level README (`nextapp/README.md`) and app CLAUDE (`nextapp/CLAUDE.md`) were merged into this canonical repository README/CLAUDE and the duplicates have been removed.

---

## Quick Links

| Section | Description |
|---|---|
| [Business Plan](docs/business/MVP_BUSINESS_PLAN.md) | MVP business strategy, revenue model, target audience |
| [Research Report](docs/business/RESEARCH_REPORT.md) | Market research and competitive analysis |
| [Unified Build Plan](docs/technical/UNIFIED_PLAN.md) | **Start here** — Complete build roadmap |
| [React + Firebase Plan](docs/technical/REACT_FIREBASE_PLAN.md) | Technical architecture (free-tier) |
| [Build Log](docs/technical/BUILD_LOG.md) | Original Rails plan + build phases |
| [Build Gaps Analysis](docs/analysis/BUILD_GAPS.md) | Gap analysis + implementation plan |

---

## Project Structure

```
enerGXchange/
├── README.md                    This file (project overview)
├── CLAUDE.md                    AI assistant instructions (hard rules)
├── index.html                   Landing page (GitHub Pages)
├── nextapp/                     Next.js app (static export → GitHub Pages)
│   ├── src/                     React components, pages, libs
│   ├── out/                      Static build output (auto-generated)
│   └── .github/workflows/       Auto-deploy to GitHub Pages
└── docs/                        All documentation
    ├── business/                Business strategy + research
    ├── technical/               Build plans + technical docs
    └── analysis/                Gap analysis + research
```

---

## Core Rules (Hard Constraints)

1. **No money/payments** (except Gelato for physical cards)
2. **No ratings/reviews**
3. **No browsing profiles** before first exchange
4. **Card token = UUID** (for QR verification)
5. **Exchange must be real** (in-person or virtual)

---

## User Journey

```
Landing Page (index.html) → Click "Start Your Exchange"
    ↓
Next.js App (Profile Creation - 3 steps) → Declared State
    ↓
Rule-Based Matching (same World + complementary skills)
    ↓
Waiting for Match → Notification Sent
    ↓
Real-life Exchange Happens
    ↓
Both Confirm → Community Member (unlock features)
    ↓
Membership Card Generated (PDF + QR code)
```

---

## Tech Stack (Free-Tier, USD 0/month)

| Layer | Technology | Provider | Notes |
|---|---|---|---|
| **Frontend** | Next.js 15 + React 19 | GitHub Pages | Static export (`output: 'export'`) |
| **Styling** | Tailwind CSS 4 | — | Utility-first, responsive |
| **Database** | Firestore | Firebase | 1GB free, 50K reads/day |
| **Auth** | Firebase Auth | Firebase | Email/Password + Google |
| **Hosting** | GitHub Pages | GitHub | Free, static HTML/JS/CSS |
| **Visualization** | Looker Studio | Google | Connects to Firestore via Sheets |
| **Data Entry** | Google Sheets | Google | Sync to Firestore via Apps Script |

**No Vercel needed** — Entire app runs as static files on GitHub Pages.

---

## 4 Worlds

| World | Color | Description |
|---|---|---|
| **Wellness** | `#5a8a5a` (green) | Health, fitness, mental well-being |
| **Entrepreneurship** | `#e8c97a` (gold) | Business, startups, growth |
| **Conscious Living** | `#4a8a80` (teal) | Sustainability, mindfulness |
| **Creative Life** | `#c46a6a` (red) | Arts, design, expression |

---

## Getting Started

### Prerequisites
- Node.js 18+ (for local development)
- Firebase account (free)
- GitHub account (for hosting)

### Local Development (Two Options)

**Option A: Simple HTTP Server (Serves Landing + Next.js Static)**
```bash
# 1. Clone the repo
git clone https://github.com/tichlabs/enerGXchange.git
cd enerGXchange

# 2. Setup Firebase
# Go to console.firebase.google.com → Create project "enerGXchange"
# Enable: Auth (Email/Password + Google), Firestore, Storage
# Copy config to nextapp/.env.local (use .env.local.example as template)

# 3. Install dependencies
cd nextapp
npm install

# 4. Build static export
npm run build
# Output: nextapp/out/ folder

# 5. Start simple HTTP server (serves both landing + app)
cd ..
node serve.js
# Opens: http://localhost:8080/ (landing page)
# Next.js app: http://localhost:8080/enerGXchange/
```

**Option B: Next.js Dev Server (Hot Reload, No Landing Page)**
```bash
cd nextapp
npm run dev
# Opens: http://localhost:3000/ (Next.js app only)
# Note: Landing page NOT served (use Option A for full flow)
```

### Firebase Setup
```bash
# Create .env.local from template
cd nextapp
cp .env.local.example .env.local
# Edit .env.local and add your Firebase config:
# NEXT_PUBLIC_FIREBASE_API_KEY=your_key
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.local.example for all vars)
```

### Firebase Setup
```bash
# Create .env.local from template
cp .env.local.example .env.local
# Edit .env.local and add your Firebase config:
# NEXT_PUBLIC_FIREBASE_API_KEY=your_key
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.local.example for all vars)
```

---

## Development Workflow

### Local Development Server
```bash
cd nextapp
npm run dev
# App runs at: http://localhost:3000/enerGXchange/
```
**Note:** Because of `basePath: '/enerGXchange'` in `next.config.ts`, all routes are prefixed.

### Build & Test Static Export
```bash
cd nextapp
npm run build
# Check output in nextapp/out/ folder
# Open nextapp/out/index.html in browser to test static version
```

### Using Claude Code Plugins
```bash
# Scaffold components with vibe-coding-plugin
"Use vibe plugin to create WorldSelector component"

# Check code quality with codewarden
"Run codewarden on the matching.ts file"

# Follow workflows from boilerplate
"Follow the create-component workflow from workflows.md"
```

### VS Code Extensions
- ES7 React Snippets (rfce, rfc shortcuts)
- Tailwind CSS IntelliSense (autocomplete)
- ESLint + Prettier (code quality)

---

## Documentation Guide

### For Developers
1. Start with [Unified Build Plan](docs/technical/UNIFIED_PLAN.md)
2. Review [React + Firebase Plan](docs/technical/REACT_FIREBASE_PLAN.md)
3. Check [CLAUDE.md](CLAUDE.md) for AI assistant rules

### For Product/Business
1. Read [MVP Business Plan](docs/business/MVP_BUSINESS_PLAN.md)
2. Review [Research Report](docs/business/RESEARCH_REPORT.md)
3. Check [Build Gaps](docs/analysis/BUILD_GAPS.md) for status

---

## Build Phases

| Phase | Status | Description |
|---|---|---|
| **Phase 1** | ✅ Done | Project setup (Next.js + Firebase + Tailwind + Static Export) |
| **Phase 2** | 🔄 In Progress | Profile creation (3-step wizard) |
| **Phase 3** | ⏳ Todo | Rule-based matching engine |
| **Phase 4** | ⏳ Todo | Exchange confirmation + community unlock |
| **Phase 5** | ⏳ Todo | Membership cards (PDF + QR) + Constellation view |

### Phase 2 Progress:
- ✅ Step1: Who I Am (name, bio, location) — `src/app/profile/new/page.tsx`
- ✅ Step2: What I Offer (world selector + description) — `src/app/profile/new/step2.tsx`
- ✅ Step3: What I Want (world selector + description) — `src/app/profile/new/step3.tsx`
- ⏳ TODO: Connect to Firebase (save profile data)
- ⏳ TODO: Add progress bar (Step 1 → 2 → 3)
- ⏳ TODO: Form validation with react-hook-form

---

## Deployment (GitHub Pages Only)

### Auto-Deploy via GitHub Actions
Push to `main` branch → GitHub Actions builds Next.js → Deploys static files to GitHub Pages.

**URLs:**
- Landing page: `https://tichlabs.github.io/enerGXchange/index.html`
- Next.js app: `https://tichlabs.github.io/enerGXchange/`

### Manual Deploy (if needed)
```bash
cd nextapp
npm run build           # Generates out/ folder
# Copy out/ contents to root or configure GitHub Pages to serve from nextapp/out/
```

---

## Contributing

This project uses:
- **Claude Code** for AI-assisted development
- **Tailwind CSS** for all styling
- **Firebase** for backend (free-tier)
- **GitHub Pages** for hosting (static export)

See [CLAUDE.md](CLAUDE.md) for coding standards and hard rules.

---

## License

MIT

---

*Last updated: 2026-05-02 — Updated for GitHub Pages only (no Vercel)*
