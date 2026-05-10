'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileView from '@/components/ProfileView';
import { UserProfile } from '@/types/user';

export default function ProfileMePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('profile');
    if (data) {
      setProfile(JSON.parse(data));
    }
    setLoading(false);
  }, []);

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
        <p className="text-[var(--sand)]">No profile found</p>
        <button
          onClick={() => router.push('/profile/new')}
          className="px-6 py-3 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
        >
          Create Profile
        </button>
      </main>
    );
  }

  return (
    <ProfileView
      profile={profile}
      isOwner
      onEdit={() => router.push('/profile/edit')}
    />
  );
}
