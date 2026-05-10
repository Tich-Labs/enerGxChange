'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StoredProfile, saveProfile, getCurrentProfile, getProfileById } from '@/lib/storage';
import { WORLDS } from '@/constants';

export default function ProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Partial<StoredProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentProfile();
    if (current) {
      setProfile(current);
    }
    setLoading(false);
  }, []);

  const update = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.id) return;

    const updated: StoredProfile = {
      id: profile.id,
      state: profile.state || 'declared',
      name: profile.name || '',
      bio: profile.bio || '',
      location: profile.location || '',
      offerWorld: (profile.offerWorld || 'wellness') as StoredProfile['offerWorld'],
      offer: profile.offer || '',
      wantWorld: (profile.wantWorld || 'wellness') as StoredProfile['wantWorld'],
      want: profile.want || '',
      createdAt: profile.createdAt || new Date().toISOString(),
    };
    saveProfile(updated);
    router.push('/profile/me');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex items-center justify-center">
        <p className="text-[var(--sand)]">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up">
        <button
          onClick={() => router.push('/profile/me')}
          className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
        >
          ← Back to Profile
        </button>

        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-6 text-[var(--cream)]">
          Edit <em className="italic text-[var(--sun)]">Profile</em>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">Name</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => update('name', e.target.value)}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] focus:border-[var(--ember)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">Bio</label>
            <textarea
              value={profile.bio || ''}
              onChange={(e) => update('bio', e.target.value)}
              rows={3}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] focus:border-[var(--ember)] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => update('location', e.target.value)}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] focus:border-[var(--ember)] focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-3">I Offer (World)</span>
            <div className="grid grid-cols-2 gap-4 mb-3">
              {WORLDS.map((world) => {
                const isSelected = profile.offerWorld === world.id;
                return (
                  <button
                    key={world.id}
                    type="button"
                    onClick={() => update('offerWorld', world.id)}
                    className={`relative p-4 border-2 rounded-lg transition-all duration-300 ${
                      isSelected ? 'bg-[var(--bark)] scale-[1.02]' : 'bg-[var(--bark)] hover:bg-[var(--warm)]'
                    }`}
                    style={{
                      borderColor: isSelected ? world.color : 'var(--warm)',
                      background: isSelected ? `${world.color}11` : undefined,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg" style={{ background: world.color }} />
                    )}
                    <span className="font-[Fraunces] font-[300] text-lg text-[var(--cream)]">
                      {world.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <textarea
              value={profile.offer || ''}
              onChange={(e) => update('offer', e.target.value)}
              rows={3}
              placeholder="What you offer..."
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none resize-none"
            />
          </div>

          <div>
            <span className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-3">I Want (World)</span>
            <div className="grid grid-cols-2 gap-4 mb-3">
              {WORLDS.map((world) => {
                const isSelected = profile.wantWorld === world.id;
                return (
                  <button
                    key={world.id}
                    type="button"
                    onClick={() => update('wantWorld', world.id)}
                    className={`relative p-4 border-2 rounded-lg transition-all duration-300 ${
                      isSelected ? 'bg-[var(--bark)] scale-[1.02]' : 'bg-[var(--bark)] hover:bg-[var(--warm)]'
                    }`}
                    style={{
                      borderColor: isSelected ? world.color : 'var(--warm)',
                      background: isSelected ? `${world.color}11` : undefined,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg" style={{ background: world.color }} />
                    )}
                    <span className="font-[Fraunces] font-[300] text-lg text-[var(--cream)]">
                      {world.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <textarea
              value={profile.want || ''}
              onChange={(e) => update('want', e.target.value)}
              rows={3}
              placeholder="What you want..."
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
