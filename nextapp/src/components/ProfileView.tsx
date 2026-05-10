'use client';

import { UserProfile } from '@/types/user';
import { WORLD_COLORS, getWorldById } from '@/constants';
import { useRouter } from 'next/navigation';

interface ProfileViewProps {
  profile: UserProfile;
  isOwner?: boolean;
  onEdit?: () => void;
}

export default function ProfileView({ profile, isOwner = false, onEdit }: ProfileViewProps) {
  const router = useRouter();
  const offerWorld = getWorldById(profile.offerWorld);
  const wantWorld = getWorldById(profile.wantWorld);

  return (
    <div className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up">
        {profile.state === 'community_member' && (
          <button
            onClick={() => router.push('/constellation')}
            className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
          >
            ← Back to Constellation
          </button>
        )}

        <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--warm)] flex items-center justify-center text-3xl font-[Fraunces] font-[200] text-[var(--sun)]">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-[Fraunces] font-[200] text-3xl text-[var(--cream)]">
                {profile.name}
              </h1>
              <p className="text-[var(--sand)] text-sm mt-1">{profile.location}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--whisper)] text-[var(--sand)]">
                {profile.state.replace('_', ' ')}
              </span>
            </div>
          </div>

          {profile.bio && (
            <div className="mb-8">
              <p className="text-[var(--sand)] leading-relaxed italic">"{profile.bio}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">I Offer</span>
              <div
                className="mt-3 p-5 bg-[var(--soil)] border-l-4 rounded-r-lg"
                style={{ borderColor: offerWorld?.color || WORLD_COLORS[profile.offerWorld] }}
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                  style={{ backgroundColor: `${offerWorld?.color || WORLD_COLORS[profile.offerWorld]}22`, color: offerWorld?.color || WORLD_COLORS[profile.offerWorld] }}
                >
                  {offerWorld?.label || profile.offerWorld}
                </span>
                <p className="text-[var(--cream)] leading-relaxed">{profile.offer}</p>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">I Want</span>
              <div
                className="mt-3 p-5 bg-[var(--soil)] border-l-4 rounded-r-lg"
                style={{ borderColor: wantWorld?.color || WORLD_COLORS[profile.wantWorld] }}
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                  style={{ backgroundColor: `${wantWorld?.color || WORLD_COLORS[profile.wantWorld]}22`, color: wantWorld?.color || WORLD_COLORS[profile.wantWorld] }}
                >
                  {wantWorld?.label || profile.wantWorld}
                </span>
                <p className="text-[var(--cream)] leading-relaxed">{profile.want}</p>
              </div>
            </div>
          </div>

        {isOwner && (
          <div className="mt-8 pt-6 border-t border-[var(--warm)] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Member Since</span>
                <p className="text-[var(--cream)] mt-1">
                  {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}
                </p>
              </div>
              <button
                onClick={onEdit}
                className="px-6 py-3 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>

            {profile.state === 'community_member' && (
              <button
                onClick={() => router.push('/card')}
                className="w-full p-3 border border-[var(--sun)] text-[var(--sun)] rounded-lg hover:bg-[var(--sun)] hover:text-[var(--soil)] transition-all duration-200 text-sm uppercase tracking-[0.15em]"
              >
                View Membership Card
              </button>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}