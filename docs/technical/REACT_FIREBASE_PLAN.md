# enerG·X·change — React + Firebase Architecture

## Updated Stack (2026-05-02)

| Layer | Old Choice | **New Choice** | Why |
|---|---|---|---|
| Frontend | Rails views + ERB | **Next.js 15 + React 19** | Lighter, component-based, better UX |
| Styling | maquina_components (ERB) | **Tailwind CSS 4** | Same design system, React components |
| Backend | Rails API (planned) | **Firebase** | Free tier, realtime DB, auth, hosting |
| Database | PostgreSQL | **Firestore** | NoSQL, realtime, free tier |
| Auth | Rails 8 built-in | **Firebase Auth** | Free, social logins, JWT tokens |
| Hosting | Render (planned) | **GitHub Pages** (static export) | Free, single hosting for all |
| Visualiation | None planned | **Looker Studio** | Free, connects to Firestore |
| Data Source | PostgreSQL | **Google Sheets** | Easy data entry, syncs to Firestore |

---

## Free-Tier Architecture (USD 0/month)

| Need | Provider | Free Limit |
|---|---|---|
| **Hosting (Landing)** | GitHub Pages | Free, static HTML |
| **Hosting (App)** | Vercel | Free tier (hobby)|
| **Database** | Firestore (Firebase) | 1GB storage, 50K reads/day |
| **Auth** | Firebase Auth | Free, unlimited users |
| **File Storage** | Firebase Storage | 5GB free |
| **Visualiation** | Looker Studio | Free, unlimited reports |
| **Data Entry** | Google Sheets | Free, 15GB |
| **Realtime** | Firestore listeners | Real-time sync built-in |

*Skipped: Render ($0), Supabase ($0), Sidekiq (Redis$$), PostgreSQL hosting costs*

---

## User Journey: Profile Creation

### Step 1: Landing Page (GitHub Pages)
- URL: `yourapp.github.io/enerGXchange/`
- Static HTML (already built in `index.html`)
- CTA: "Start Your Exchange" → Links to Next.js app

### Step 2: Profile Creation (Next.js App)
```
User visits app → Firebase Auth (email/password or Google)
         ↓
    Profile Setup Form (3 steps):
    1. "Who I Am" — Name, bio, location
    2. "What I Offer" — Skill/service with World selection
    3. "What I Want" — Desired skill with World selection
         ↓
    State: declared (saved to Firestore)
```

### Step 3: Matching Engine (Rule-Based)
```
Firestore listener on 'users' collection:
  ON CREATE or UPDATE:
    1. Query users where state = 'declared'
    2. Filter by: same World + complementary offer/want
    3. Score by: location proximity + availability
    4. Create Match document:
       - user_1_id, user_2_id
       - world (wellness/entrepreneurship/etc.)
       - state: 'pending'
       - expires_at: now + 7 days
         ↓
    Update both users → state: 'waiting_for_match'
    Send notification (Firebase Cloud Messaging)
```

### Step 4: Exchange & Confirmation
```
Both users receive notification → Open app
         ↓
    View matched person's profile
    Exchange happens in real-life (barter)
         ↓
    Both confirm: "Exchange Happened" (binary)
         ↓
    Update state: 'community_member'
    Unlock: Constellation view + Profile browsing
    Generate: Membership Card (PDF) with QR code
```

---

## Firestore Schema (NoSQL)

### Collections:

**users**
```javascript
{
  id: "auto-generated",
  uid: "firebase-auth-uid",        // Firebase Auth UID
  state: "declared",                 // declared|waiting_for_match|matched|community_member|suspended
  founding_node: false,
  // Profile
  name: "Jane Doe",
  bio: "Wellness coach...",
  location: "Austin, TX",
  // Exchange Preferences
  world: "wellness",                // Fixed: wellness|entrepreneurship|conscious_living|creative_life
  offer: "Yoga session",
  want: "Web design help",
  // Metadata
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**matches**
```javascript
{
  id: "auto-generated",
  user_1_id: "user_ref",
  user_2_id: "user_ref",
  world: "wellness",
  state: "pending",                  // pending|confirmed|expired|cancelled
  expires_at: Timestamp,              // +7 days
  confirmed_by: ["user_1_id"],       // Array, both must confirm
  created_at: Timestamp
}
```

**exchanges** (sealed after confirmation)
```javascript
{
  id: "auto-generated",
  match_id: "match_ref",
  giver_id: "user_1_id",
  receiver_id: "user_2_id",
  confirmed_at: Timestamp,
  // No ratings, no money (hard rule)
}
```

**membership_cards**
```javascript
{
  id: "auto-generated",
  user_id: "user_ref",
  card_token: "uuid-v4",            // Public URL: /verify/:card_token
  pdf_url: "firebase-storage-url",
  generated_at: Timestamp
}
```

**admin_audits** (for manual overrides)
```javascript
{
  id: "auto-generated",
  admin_uid: "firebase-auth-uid",
  action: "create_match|reassign|release",
  target_user_id: "user_ref",
  reason: "text explanation",
  timestamp: Timestamp
}
```

---

## Profile Creation Form (Next.js + Tailwind)

### Component Structure:
```
pages/
  ├── index.tsx              / (landing redirect)
  ├── profile/
  │   ├── new.tsx          Profile creation wizard
  │   ├── [id].tsx        View profile
  │   └── edit.tsx        Edit profile
  ├── match/
  │   ├── found.tsx        View current match
  │   └── confirm.tsx     Confirm exchange
  ├── community/
  │   └── constellation.tsx  (visible only to community_members)
  └── verify/
      └── [token].tsx      QR code verification

components/
  ├── ProfileWizard/
  │   ├── Step1_WhoIAm.tsx
  │   ├── Step2_WhatIOffer.tsx
  │   └── Step3_WhatIWant.tsx
  ├── WorldSelector.tsx        (4 Worlds with colors)
  ├── MembershipCard.tsx       (PDF view with QR)
  └── Constellation.tsx       (community visualization)
```

### Step 1: "Who I Am" (Tailwind + React Hook Form)
```tsx
// components/ProfileWizard/Step1_WhoIAm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function Step1_WhoIAm({ onNext }) {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: data.name,
      bio: data.bio,
      location: data.location,
      state: 'declared',
      created_at: serverTimestamp(),
    });
    onNext({ name: data.name, ... });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      <h2 className="font-fraunces font-weight-200 text-3xl mb-6">
        Who I <em className="text-sand">Am</em>
      </h2>

      <div className="mb-4">
        <label className="block text-sm uppercase tracking-wide text-whisper mb-2">
          Your Name
        </label>
        <input {...register('name', { required: true })}
          className="w-full p-3 bg-bark border border-dirt-warm rounded-lg text-cream focus:border-ember" />
      </div>

      <div className="mb-4">
        <label className="block text-sm uppercase tracking-wide text-whisper mb-2">
          Bio
        </label>
        <textarea {...register('bio')}
          className="w-full p-3 bg-bark border border-dirt-warm rounded-lg text-cream h-32" />
      </div>

      <div className="mb-6">
        <label className="block text-sm uppercase tracking-wide text-whisper mb-2">
          Location
        </label>
        <input {...register('location')}
          className="w-full p-3 bg-bark border border-dirt-warm rounded-lg text-cream" />
      </div>

      <button type="submit"
        className="w-full p-4 bg-ember border border-ember text-cream rounded-lg hover:translate-y-[-2px] transition-all">
        Continue →
      </button>
    </form>
  );
}
```

### Step 2: "What I Offer" (World Selection with Colors)
```tsx
// components/ProfileWizard/Step2_WhatIOffer.tsx
const WORLDS = [
  { id: 'wellness', color: '#5a8a5a', label: 'Wellness' },
  { id: 'entrepreneurship', color: '#e8c97a', label: 'Entrepreneurship' },
  { id: 'conscious_living', color: '#4a8a80', label: 'Conscious Living' },
  { id: 'creative_life', color: '#c46a6a', label: 'Creative Life' },
];

export default function Step2_WhatIOffer({ onNext }) {
  const { register, handleSubmit, watch } = useForm();
  const selectedWorld = watch('world');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6">
      <h2 className="font-fraunces font-weight-200 text-3xl mb-6">
        What I <em className="text-sand">Offer</em>
      </h2>

      {/* World Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {WORLDS.map((world) => (
          <button
            key={world.id}
            type="button"
            onClick={() => setValue('world', world.id)}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedWorld === world.id
                ? 'border-ember bg-warm'
                : 'border-dirt-warm bg-bark hover:bg-warm'
            }`}
            style={{ borderTop: selectedWorld === world.id ? `4px solid ${world.color}` : undefined }}
          >
            <span className="font-fraunces font-weight-300 text-lg">{world.label}</span>
          </button>
        ))}
        <input type="hidden" {...register('world', { required: true })} />
      </div>

      {/* Offer Description */}
      <div className="mb-6">
        <label className="block text-sm uppercase tracking-wide text-whisper mb-2">
          Describe What You Offer
        </label>
        <textarea {...register('offer', { required: true })}
          placeholder="e.g., Yoga session, Web development, Home cooking..."
          className="w-full p-3 bg-bark border border-dirt-warm rounded-lg text-cream h-32" />
      </div>

      <button type="submit" className="w-full p-4 bg-ember border border-ember text-cream rounded-lg">
        Continue →
      </button>
    </form>
  );
}
```

---

## Matching Engine (Cloud Function or Client-Side)

### Rule-Based Matching (Firestore Query)
```javascript
// lib/matching.ts
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function findMatch(currentUser) {
  // 1. Query declared users in same World
  const q = query(
    collection(db, 'users'),
    where('state', '==', 'declared'),
    where('world', '==', currentUser.world),
    where('uid', '!=', currentUser.uid)  // Exclude self
  );

  const snapshot = await getDocs(q);
  const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // 2. Filter by complementary offer/want
  const compatible = candidates.filter(candidate => 
    candidate.offer.includes(currentUser.want.split(' ')[0]) ||  // Simple keyword match
    candidate.want.includes(currentUser.offer.split(' ')[0])
  );

  // 3. Score by location proximity (simple)
  const scored = compatible.map(c => ({
    ...c,
    score: calculateProximity(currentUser.location, c.location)
  }));

  // 4. Return best match or null
  return scored.sort((a, b) => b.score - a.score)[0] || null;
}

function calculateProximity(loc1, loc2) {
  // Simple: same city = 10, same state = 5, different = 1
  if (loc1.split(',')[1] === loc2.split(',')[1]) return 10;  // Same city
  if (loc1.split(',')[2] === loc2.split(',')[2]) return 5;   // Same state
  return 1;
}
```

### Create Match (Firestore Transaction)
```javascript
import { runTransaction, doc, serverTimestamp } from 'firebase/firestore';

export async function createMatch(user1, user2) {
  await runTransaction(db, async (transaction) => {
    // Create match document
    const matchRef = doc(collection(db, 'matches'));
    transaction.set(matchRef, {
      user_1_id: user1.uid,
      user_2_id: user2.uid,
      world: user1.world,
      state: 'pending',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // +7 days
      confirmed_by: [],
      created_at: serverTimestamp()
    });

    // Update both users
    transaction.update(doc(db, 'users', user1.uid), { state: 'waiting_for_match' });
    transaction.update(doc(db, 'users', user2.uid), { state: 'waiting_for_match' });
  });
}
```

---

## Google Sheets → Firestore Sync

### Setup:
1. Create Google Sheet: "enerGXchange_Profiles"
2. Columns: Name, Bio, Location, World, Offer, Want, State
3. Use **Google Apps Script** to sync to Firestore:

```javascript
// Google Apps Script (attached to Sheet)
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const row = e.range.getRow();
  const data = sheet.getRange(row, 1, 1, 6).getValues()[0];

  // Sync to Firestore via Firebase REST API
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users`;

  const payload = {
    fields: {
      name: { stringValue: data[0] },
      bio: { stringValue: data[1] },
      location: { stringValue: data[2] },
      world: { stringValue: data[3] },
      offer: { stringValue: data[4] },
      want: { stringValue: data[5] },
      state: { stringValue: 'declared' },
    }
  };

  UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    payload: JSON.stringify(payload)
  });
}
```

---

## Looker Studio Dashboard

### Connect Firestore to Looker Studio:
1. Go to [Looker Studio](https://lookerstudio.google.com)
2. **Add Data Source** → **Firestore** (via BigQuery connector or Sheets connector)
3. Create Reports:
   - **User Growth** (line chart: users created over time)
   - **World Distribution** (pie chart: % per World)
   - **Match Success Rate** (bar chart: matches confirmed vs. expired)
   - **Location Heatmap** (geo chart: users by location)

### Example Chart: World Distribution
```
Data Source: Firestore → BigQuery → Looker
Dimension: world
Metric: COUNT(user_id)
Filter: state = "community_member"
```

---

## GitHub Pages Deployment (Landing Page)

### Setup:
```bash
# 1. Create gh-pages branch
cd /Users/tichlabs/Documents/enerGXchange
git checkout -b gh-pages

# 2. Move landing page to root
mv index.html index.html  # Already at root

# 3. Push to gh-pages
git add index.html
git commit -m "Landing page for GitHub Pages"
git push origin gh-pages

# 4. Enable in repo settings:
# Settings → Pages → Source: gh-pages branch → /root → Save
# URL will be: https://tichlabs.github.io/enerGXchange/
```

---

## Next.js App Deployment (Vercel)

### Setup:
```bash
# 1. Create Next.js app (if not done)
cd /Users/tichlabs/Documents/enerGXchange
npx create-next-app@latest app --typescript --tailwind --app --src-dir

# 2. Push to GitHub
git add app/
git commit -m "Next.js app scaffold"
git push origin main

# 3. Connect to Vercel:
# 1. Go to vercel.com → New Project → Import GitHub repo
# 2. Set environment variables:
#    NEXT_PUBLIC_FIREBASE_API_KEY=...
#    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# 3. Deploy → URL: yourapp.vercel.app
```

---

## Gaps vs. Original Rails Plan

| Feature | Rails Plan | **React + Firebase** |
|---|---|---|
| **User Model** | Rails + PostgreSQL + AASM | Firestore doc + Firebase Auth |
| **State Machine** | AASM gem | Client-side state + Firestore field |
| **Matching** | Rails algorithm (server-side) | **Rule-based** (client-side Firestore query) |
| **Exchange** | Rails models + controllers | Firestore documents + Cloud Functions |
| **Membership Card** | Prawn PDF + rqrcode gem | **jsPDF** (browser-side) + QR code lib |
| **QR Verification** | `/verify/:card_token` (Rails) | `/verify/:card_token` (Next.js API route) |
| **Admin Panel** | Administrate gem | **Firebase Console** + custom React admin |
| **Notifications** | Noticed gem | **Firebase Cloud Messaging** |
| **Background Jobs** | Solid Queue (Rails 8) | **Cloud Functions** (Firebase) |
| **Forum/Community** | Rails controllers + views | **Next.js pages + Firestore** |

---

## What to Build First (Next.js + Firebase)

### Phase 1: Project Setup (Today)
```bash
cd /Users/tichlabs/Documents/enerGXchange

# 1. Create Next.js app
npx create-next-app@latest app --typescript --tailwind --app --src-dir --import-alias "@/*"

# 2. Install Firebase
cd app
npm install firebase firebase-tools
npm install react-hook-form  # Form handling
npm install jspdf jspdf-autotable  # PDF generation
npm install qrcode.react  # QR codes

# 3. Setup Firebase project (free)
# Go to console.firebase.google.com → Create Project "enerGXchange"
```

### Phase 2: Profile Creation (This Week)
- [ ] Step 1: Who I Am (name, bio, location)
- [ ] Step 2: What I Offer (world selector + description)
- [ ] Step 3: What I Want (world selector + description)
- [ ] Save to Firestore
- [ ] State transition: declared → waiting_for_match

### Phase 3: Matching (Next Week)
- [ ] Query Firestore for compatible users
- [ ] Rule-based matching algorithm
- [ ] Create match document
- [ ] Send Firebase notification

### Phase 4: Exchange & Community (Following Week)
- [ ] Match confirmation (binary: happened/didn't)
- [ ] State: community_member unlock
- [ ] Constellation view (Firestore query)
- [ ] Membership card (jsPDF + QR)

---

## Files to Add to enerGXchange Folder

```
enerGXchange/
├── index.html              (existing landing page)
├── app/                     (new Next.js app)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          Next.js root layout
│   │   │   ├── page.tsx            Redirect to /profile/new
│   │   │   ├── profile/
│   │   │   │   ├── new/              Profile creation wizard
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── Step1.tsx
│   │   │   │   │   ├── Step2.tsx
│   │   │   │   │   └── Step3.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   View profile
│   │   │   ├── match/
│   │   │   │   └── page.tsx       Current match view
│   │   │   ├── community/
│   │   │   │   └── page.tsx       Constellation (gated)
│   │   │   └── verify/
│   │   │       └── [token]/
│   │   │           └── page.tsx  QR verification
│   │   ├── components/
│   │   │   ├── ProfileWizard/
│   │   │   ├── WorldSelector.tsx
│   │   │   ├── MembershipCard.tsx
│   │   │   └── Constellation.tsx
│   │   ├── lib/
│   │   │   ├── firebase.ts       Firebase init
│   │   │   ├── matching.ts      Matching algorithm
│   │   │   └── pdfGenerator.ts  jsPDF logic
│   │   └── context/
│   │       └── AuthContext.tsx
│   ├── tailwind.config.ts
│   └── package.json
├── docs/                    (existing MVP docs)
├── CLaude.md               (existing AI instructions)
├── BUILD_LOG.md            (existing build log)
├── BUILD_GAPS.md           (existing gaps analysis)
└── REACT_FIREBASE_PLAN.md  (this file)
```

---

*Updated: 2026-05-02 — Switching to React + Firebase free-tier architecture*
