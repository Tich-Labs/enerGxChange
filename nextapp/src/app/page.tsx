'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const profile = localStorage.getItem('profile');
    if (profile) {
      router.push('/profile/me');
    } else {
      router.push('/profile/new');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--soil)]">
      <p className="text-[var(--cream)]">Loading...</p>
    </div>
  );
}
