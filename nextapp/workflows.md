# Next.js 15 + Firebase Development Workflows

## Workflow 1: New Component Development

```
1. /create-component Button --typescript --with-tests
2. /flow type-check
3. /flow test-gaps
4. /code-review
```

**Example: Create Profile Wizard Step**
```
> Use vibe-coding-plugin to create Step1_WhoIAm component
> Use react-hook-form for form handling
> Style with Tailwind CSS using Fraunces font
> Add TypeScript Props interface
```

---

## Workflow 2: Firebase Integration Setup

```
1. npm install firebase react-hook-form jspdf qrcode.react
2. Create src/lib/firebase.ts (singleton config)
3. Create src/context/AuthContext.tsx (Firebase Auth provider)
4. /security-audit --critical-only
5. > Verify .env.local is in .gitignore
```

**Steps:**
1. **Initialize Firebase**
   ```bash
   cd nextapp
   npm install firebase
   ```

2. **Create Firebase Config** (`src/lib/firebase.ts`)
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   
   const app = initializeApp({
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     // ... other config
   });
   
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

3. **Setup AuthContext** (`src/context/AuthContext.tsx`)
   ```typescript
   'use client';
   import { createContext, useContext, useEffect, useState } from 'react';
   import { onAuthStateChanged, User } from 'firebase/auth';
   import { auth } from '@/lib/firebase';
   
   const AuthContext = createContext<{ user: User | null }>({ user: null });
   
   export function AuthProvider({ children }) {
     const [user, setUser] = useState<User | null>(null);
     useEffect(() => onAuthStateChanged(auth, setUser), []);
     return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
   }
   
   export const useAuth = () => useContext(AuthContext);
   ```

4. **Environment Variables** (`.env.local`)
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   ```

---

## Workflow 3: Firestore Data Modeling

```
1. Define collections (users, matches, exchanges, membership_cards)
2. Create TypeScript interfaces for each collection
3. /flow type-check
4. > Verify Firestore security rules
5. /code-review
```

**Example: User Model**
```typescript
// src/types/user.ts
export interface User {
  uid: string;
  state: 'declared' | 'waiting_for_match' | 'matched' | 'community_member';
  name: string;
  bio: string;
  location: string;
  world: 'wellness' | 'entrepreneurship' | 'conscious_living' | 'creative_life';
  offer: string;
  want: string;
  created_at: Timestamp;
}

// Usage in component
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const saveUser = async (userData: Omit<User, 'uid' | 'created_at'>) => {
  await addDoc(collection(db, 'users'), {
    ...userData,
    created_at: serverTimestamp()
  });
};
```

---

## Workflow 4: Authentication Flow

```
1. Create login page (src/app/login/page.tsx)
2. Use Firebase Auth (signInWithEmailAndPassword, signInWithPopup for Google)
3. Protect routes with AuthContext
4. /security-audit
5. > Test: unauthenticated user redirected to /login
```

**Login Component Example:**
```tsx
'use client';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push('/profile/new');
  };
  
  return (
    <button onClick={handleGoogleLogin} className="bg-ember text-cream p-4 rounded-lg">
      Sign in with Google
    </button>
  );
}
```

---

## Workflow 5: Security Audit & Hardening

```
1. /security-audit
2. /security-audit --fix
3. /flow security-full
4. /harden
5. > Verify: no API keys in client-side code
6. > Verify: Firestore security rules are set
```

**Checklist:**
- [ ] Environment variables in `.env.local` (not committed)
- [ ] Firebase config uses `NEXT_PUBLIC_` prefix only for client-safe vars
- [ ] Firestore security rules deny unauthorized access
- [ ] No hardcoded secrets in code
- [ ] Admin routes protected (check `admin` claim in Firebase Auth custom claims)

---

## Workflow 6: Full Project Audit

```
1. /flow full-audit
   (Runs all 17 auditor agents)
2. Review findings
3. /flow refactor to fix architecture issues
4. /flow test-gaps && /flow deps-check
```

---

## Workflow 7: Pre-Commit Checklist

```
1. /flow test-gaps
2. /security-audit --critical-only
3. /flow type-check
4. /code-review
5. /flow deps-check
6. > Verify: `next build` succeeds locally
```

---

## Workflow 8: Production Deployment Prep

```
1. /harden
   (security → secrets → rate-limiting → a11y → performance → observability → error-handling → caching → testing)
2. /flow full-audit
3. /flow seo-auditor
4. > Verify all audit findings are resolved
5. > Verify: Firebase project set to production mode
6. > Verify: Firestore security rules deployed
```

---

## Firebase-Specific Workflows

### Firestore Query Pattern
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const findMatches = async (world: string) => {
  const q = query(
    collection(db, 'users'),
    where('state', '==', 'declared'),
    where('world', '==', world)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

### Real-time Listener Pattern
```typescript
import { onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, 'matches'), where('user_1_id', '==', user.uid)),
    (snapshot) => {
      const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatches(matches);
    }
  );
  return unsubscribe; // Cleanup on unmount
}, []);
```

### File Upload (Firebase Storage)
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `users/${userId}/avatar.jpg`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
```

---

## Tailwind CSS Workflows

### Setup Tailwind in Next.js

```bash
# Already configured if using create-next-app with --tailwind flag
# Otherwise:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Component Styling with Tailwind

```
1. > Create a responsive navbar with Tailwind CSS
2. > Style this component using Tailwind utility classes
3. > Make this layout responsive (mobile-first)
4. > Review: > Check Tailwind classes for consistency
```

### Common Tailwind Patterns

```
> Convert these CSS modules to Tailwind utilities
> Create a card component with Tailwind (hover, focus, dark mode)
> Build a responsive grid layout with Tailwind
> Add dark mode support using Tailwind class strategy
```

### enerG·X·change Brand Colors (Tailwind Config)
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        bark: '#2A2420',
        dirt: '#3D3630',
        'dirt-warm': '#4A4240',
        ember: '#D35F3A',
        sand: '#E8D5B5',
        whisper: '#A89B8C',
        warm: '#5C4F46',
        // Worlds
        wellness: '#5a8a5a',
        entrepreneurship: '#e8c97a',
        'conscious-living': '#4a8a80',
        'creative-life': '#c46a6a',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
      },
    },
  },
}
```

### Tailwind + Claude Code

```
> Refactor inline styles to Tailwind utilities
> Create a consistent spacing system using Tailwind theme
> Extract repeated Tailwind patterns into reusable components
> Review: > Check for Tailwind best practices (avoid @apply abuse)
```

---

## VS Code Tailwind Integration

With installed extensions:
- **Tailwind CSS IntelliSense** - Autocomplete, linting, hover previews
- **Tailwind Docs** - Quick access to official docs (Cmd+Shift+P → "Tailwind Docs: Search")

---

*Workflows version: 2026-05-02 — Next.js 15 + Firebase + Tailwind CSS*
