import { UserProfile, ProfileState, WorldId } from '@/types/user';

const KEYS = {
  PROFILES: 'energ_exchange_profiles',
  MATCHES: 'energ_exchange_matches',
  EXCHANGES: 'energ_exchange_exchanges',
  CURRENT_USER: 'energ_exchange_current_user_id',
};

export interface StoredProfile extends UserProfile {
  id: string;
  email?: string;
  isFoundingNode?: boolean;
  cardToken?: string;
}

export interface Match {
  id: string;
  userA: string;
  userB: string;
  status: 'pending' | 'confirmed' | 'expired';
  createdAt: string;
  confirmedBy?: string[];
}

export interface Exchange {
  id: string;
  matchId: string;
  userA: string;
  userB: string;
  confirmedBy: string[];
  status: 'pending' | 'completed';
  createdAt: string;
}

function generateId(): string {
  return crypto.randomUUID();
}

// ── Profiles ──────────────────────────────────────────────
export function getAllProfiles(): StoredProfile[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.PROFILES);
  return raw ? JSON.parse(raw) : [];
}

export function saveProfile(profile: StoredProfile): void {
  const profiles = getAllProfiles();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
}

export function getProfileById(id: string): StoredProfile | undefined {
  return getAllProfiles().find((p) => p.id === id);
}

export function getCurrentProfile(): StoredProfile | null {
  if (typeof window === 'undefined') return null;
  const currentId = localStorage.getItem(KEYS.CURRENT_USER);
  if (!currentId) return null;
  return getProfileById(currentId) || null;
}

export function setCurrentProfileId(id: string): void {
  localStorage.setItem(KEYS.CURRENT_USER, id);
}

export function createProfile(
  data: Omit<UserProfile, 'state'>,
  email?: string
): StoredProfile {
  const id = generateId();
  const profile: StoredProfile = {
    id,
    ...data,
    state: 'declared',
    createdAt: new Date().toISOString(),
    email,
  };
  saveProfile(profile);
  setCurrentProfileId(id);
  return profile;
}

export function updateProfileState(id: string, state: ProfileState): void {
  const profile = getProfileById(id);
  if (profile) {
    profile.state = state;
    saveProfile(profile);
  }
}

// ── Matching ──────────────────────────────────────────────
export function findMatchFor(profile: StoredProfile): StoredProfile | null {
  const all = getAllProfiles();
  return (
    all.find(
      (p) =>
        p.id !== profile.id &&
        p.state === 'declared' &&
        p.offerWorld === profile.wantWorld &&
        p.wantWorld === profile.offerWorld
    ) || null
  );
}

export function createMatch(userA: string, userB: string): Match {
  const matches = getMatches();
  const match: Match = {
    id: generateId(),
    userA,
    userB,
    status: 'pending',
    createdAt: new Date().toISOString(),
    confirmedBy: [],
  };
  matches.push(match);
  saveMatches(matches);
  updateProfileState(userA, 'waiting_for_match');
  updateProfileState(userB, 'waiting_for_match');
  return match;
}

function getMatches(): Match[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.MATCHES);
  return raw ? JSON.parse(raw) : [];
}

function saveMatches(matches: Match[]): void {
  localStorage.setItem(KEYS.MATCHES, JSON.stringify(matches));
}

export function getMatchForUser(userId: string): Match | null {
  return (
    getMatches().find(
      (m) => (m.userA === userId || m.userB === userId) && m.status === 'pending'
    ) || null
  );
}

// ── Exchanges ────────────────────────────────────────────
export function createExchange(matchId: string, userA: string, userB: string): Exchange {
  const exchanges = getExchanges();
  const exchange: Exchange = {
    id: generateId(),
    matchId,
    userA,
    userB,
    confirmedBy: [],
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  exchanges.push(exchange);
  saveExchanges(exchanges);
  return exchange;
}

function getExchanges(): Exchange[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.EXCHANGES);
  return raw ? JSON.parse(raw) : [];
}

function saveExchanges(exchanges: Exchange[]): void {
  localStorage.setItem(KEYS.EXCHANGES, JSON.stringify(exchanges));
}

export function getExchangeForMatch(matchId: string): Exchange | null {
  return getExchanges().find((e) => e.matchId === matchId) || null;
}

export function getExchangeById(id: string): Exchange | null {
  return getExchanges().find((e) => e.id === id) || null;
}

export function confirmExchange(exchangeId: string, userId: string): Exchange | null {
  const exchanges = getExchanges();
  const ex = exchanges.find((e) => e.id === exchangeId);
  if (!ex) return null;
  if (!ex.confirmedBy.includes(userId)) {
    ex.confirmedBy.push(userId);
  }
  if (ex.confirmedBy.length >= 2) {
    ex.status = 'completed';
    updateProfileState(ex.userA, 'community_member');
    updateProfileState(ex.userB, 'community_member');
  }
  saveExchanges(exchanges);
  return ex;
}

// ── Community ────────────────────────────────────────────
export function getCommunityMembers(): StoredProfile[] {
  return getAllProfiles().filter((p) => p.state === 'community_member');
}

export function getFoundingNodes(): StoredProfile[] {
  return getAllProfiles().filter(
    (p) => p.state === 'community_member' && p.isFoundingNode
  );
}
