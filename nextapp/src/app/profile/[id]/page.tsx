'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileView from '@/components/ProfileView';
import { getProfileById, getCurrentProfile, type StoredProfile } from '@/lib/storage';

export default function ProfileIdPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [currentUser, setCurrentUser] = useState(getCurrentProfile());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const p = getProfileById(id);
    setProfile(p || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex items-center justify-center">
        <p className="text-[var(--sand)]">Loading...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex flex-col items-center justify-center gap-6">
        <p className="text-[var(--sand)]">Profile not found</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
        >
          Go Home
        </button>
      </main>
    );
  }

  // Check if viewer can see this profile (must be community_member or self)
  const canView = currentUser && (
    currentUser.state === 'community_member' ||
    currentUser.id === profile.id
  );

  if (!canView) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-[var(--sand)] text-center">
          Profiles are only visible to community members who have completed an exchange.
        </p>
        <button
          onClick={() => router.push('/profile/me')}
          className="px-6 py-3 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
        >
          Go to My Profile
        </button>
      </main>
    );
  }

  return <ProfileView profile={profile} isOwner={currentUser?.id === profile.id} onEdit={() => router.push('/profile/edit')} />;
}
