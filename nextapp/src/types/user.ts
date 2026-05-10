export type WorldId = 'wellness' | 'entrepreneurship' | 'conscious_living' | 'creative_life';

export type ProfileState = 'declared' | 'waiting_for_match' | 'matched' | 'community_member';

export interface World {
  id: WorldId;
  color: string;
  label: string;
}

export interface ProfileStep1 {
  name: string;
  bio: string;
  location: string;
}

export interface ProfileStep2 {
  world: WorldId;
  offer: string;
}

export interface ProfileStep3 {
  world: WorldId;
  want: string;
}

export interface UserProfile {
  state: ProfileState;
  name: string;
  bio: string;
  location: string;
  offerWorld: WorldId;
  offer: string;
  wantWorld: WorldId;
  want: string;
  createdAt?: string;
}
