'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCommunityMembers, getFoundingNodes, type StoredProfile } from '@/lib/storage';
import { WORLD_COLORS, getWorldById } from '@/constants';

export default function ConstellationPage() {
  const router = useRouter();
  const [members, setMembers] = useState<StoredProfile[]>([]);
  const [foundingNodes, setFoundingNodes] = useState<StoredProfile[]>([]);
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('energ_exchange_current_user_id');
      const profiles = JSON.parse(localStorage.getItem('energ_exchange_profiles') || '[]');
      return profiles.find((p: any) => p.id === id) || null;
    }
    return null;
  });

  useEffect(() => {
    if (!currentUser || currentUser.state !== 'community_member') {
      router.push('/profile/me');
      return;
    }

    setMembers(getCommunityMembers());
    setFoundingNodes(getFoundingNodes());
  }, [currentUser]);

  if (!currentUser || currentUser.state !== 'community_member') {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex items-center justify-center">
        <p className="text-[var(--sand)]">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <div className="px-6 max-w-4xl mx-auto pb-20 animate-up">
        <button
          onClick={() => router.push('/profile/me')}
          className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
        >
          ← Back to Profile
        </button>

        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-2 text-[var(--cream)]">
          The <em className="italic text-[var(--sun)]">Constellation</em>
        </h1>
        <p className="text-[var(--sand)] mb-10 leading-relaxed">
          Community members who have completed an exchange. Founding nodes pinned below.
        </p>

        {/* Founding Nodes */}
        {foundingNodes.length > 0 && (
          <div className="mb-12">
            <h2 className="font-[Fraunces] font-[300] text-xl mb-6 text-[var(--cream)]">
              Founding Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundingNodes.map((member) => (
                <MemberCard key={member.id} member={member} isFounding />
              ))}
            </div>
          </div>
        )}

        {/* Community Members */}
        <div>
          <h2 className="font-[Fraunces] font-[300] text-xl mb-6 text-[var(--cream)]">
            Community Members ({members.length})
          </h2>

          {members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--sand)]">No community members yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function MemberCard({ member, isFounding }: { member: StoredProfile; isFounding?: boolean }) {
  const offerWorld = getWorldById(member.offerWorld);
  const wantWorld = getWorldById(member.wantWorld);

  return (
    <div
      className={`bg-[var(--bark)] border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
        isFounding ? 'border-[var(--sun)]' : 'border-[var(--warm)]'
      }`}
      onClick={() => window.location.href = `/profile/${member.id}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-[Fraunces] font-[200]"
          style={{ background: `${offerWorld?.color || '#666'}22`, color: offerWorld?.color || '#666' }}
        >
          {member.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-[Fraunces] font-[300] text-lg text-[var(--cream)]">
            {member.name}
            {isFounding && (
              <span className="ml-2 text-xs uppercase tracking-[0.15em] text-[var(--sun)]">
                Founding
              </span>
            )}
          </p>
          <p className="text-sm text-[var(--sand)]">{member.location}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Offers</span>
          <div
            className="mt-1 px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: `${offerWorld?.color || '#666'}11`,
              borderLeft: `3px solid ${offerWorld?.color || '#666'}`,
            }}
          >
            <span className="text-[var(--cream)]">{member.offer}</span>
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Wants</span>
          <div
            className="mt-1 px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: `${wantWorld?.color || '#666'}11`,
              borderLeft: `3px solid ${wantWorld?.color || '#666'}`,
            }}
          >
            <span className="text-[var(--cream)]">{member.want}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
