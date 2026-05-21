'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Profile, saveProfile, getCurrentProfile } from '@/lib/storage';
import { DOMAINS, getFocusAreas } from '@/constants';
import type { DomainId } from '@/types/user';

export default function ProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [offerDomain, setOfferDomain] = useState<DomainId>('skills_knowledge');
  const [offerFocus, setOfferFocus] = useState('');
  const [offerDesc, setOfferDesc] = useState('');
  const [wantDomain, setWantDomain] = useState<DomainId>('skills_knowledge');
  const [wantFocus, setWantFocus] = useState('');
  const [wantDesc, setWantDesc] = useState('');
  const [profileId, setProfileId] = useState('');
  const [createdAt, setCreatedAt] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentProfile();
    if (current) {
      setProfileId(current.id);
      setCreatedAt(current.createdAt);
      setName(current.context.name || '');
      setBio(current.context.bio || '');
      setLocation(current.context.location || '');
      setOfferDomain(current.offer.domain);
      setOfferFocus(current.offer.focusArea || '');
      setOfferDesc(current.offer.description);
      setWantDomain(current.want.domain);
      setWantFocus(current.want.focusArea || '');
      setWantDesc(current.want.description);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId) return;
    saveProfile({
      id: profileId,
      tenantId: '',
      context: { name: name || undefined, location: location || undefined, bio },
      offer: { domain: offerDomain, focusArea: offerFocus, description: offerDesc },
      want: { domain: wantDomain, focusArea: wantFocus, description: wantDesc },
      status: 'active',
      createdAt,
    });
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
      <div className="px-6 max-w-lg mx-auto pb-20 animate-up">
        <button onClick={() => router.push('/profile/me')} className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm">
          &larr; Back to Profile
        </button>
        <h1 className="font-[Fraunces] font-[200] text-[2.25rem] mb-6 text-[var(--cream)]">
          Edit <em className="italic text-[var(--sun)]">Profile</em>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="edit-name" className="label-sm text-[var(--sand)] mb-2 block">Name</label>
            <input id="edit-name" name="edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field rounded-lg" />
          </div>
          <div>
            <label htmlFor="edit-bio" className="label-sm text-[var(--sand)] mb-2 block">Bio</label>
            <textarea id="edit-bio" name="edit-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="input-field textarea rounded-lg" />
          </div>
          <div>
            <label htmlFor="edit-location" className="label-sm text-[var(--sand)] mb-2 block">Location</label>
            <input id="edit-location" name="edit-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field rounded-lg" />
          </div>

          <div>
            <span className="label-sm text-[var(--sand)] mb-3 block">I Offer</span>
            <div className="grid grid-cols-1 gap-2 mb-3">
              {DOMAINS.map((d) => (
                <button key={d.id} type="button" onClick={() => setOfferDomain(d.id)}
                  className={`p-2.5 border-2 rounded-lg text-left flex items-center gap-2.5 transition-all ${offerDomain === d.id ? 'scale-[1.01]' : 'hover:bg-[var(--warm)]/30'}`}
                  style={{ borderColor: offerDomain === d.id ? d.color : 'var(--warm)', backgroundColor: offerDomain === d.id ? `${d.color}10` : 'var(--bark)' }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-medium" style={{ color: offerDomain === d.id ? d.color : 'var(--sand)' }}>{d.label}</span>
                </button>
              ))}
            </div>
            <textarea id="offer-desc" name="offer-desc" value={offerDesc} onChange={(e) => setOfferDesc(e.target.value)} rows={2} placeholder="What you offer..." className="input-field textarea rounded-lg" />
          </div>

          <div>
            <span className="label-sm text-[var(--sand)] mb-3 block">I Want</span>
            <div className="grid grid-cols-1 gap-2 mb-3">
              {DOMAINS.map((d) => (
                <button key={d.id} type="button" onClick={() => setWantDomain(d.id)}
                  className={`p-2.5 border-2 rounded-lg text-left flex items-center gap-2.5 transition-all ${wantDomain === d.id ? 'scale-[1.01]' : 'hover:bg-[var(--warm)]/30'}`}
                  style={{ borderColor: wantDomain === d.id ? d.color : 'var(--warm)', backgroundColor: wantDomain === d.id ? `${d.color}10` : 'var(--bark)' }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-medium" style={{ color: wantDomain === d.id ? d.color : 'var(--sand)' }}>{d.label}</span>
                </button>
              ))}
            </div>
            <textarea id="want-desc" name="want-desc" value={wantDesc} onChange={(e) => setWantDesc(e.target.value)} rows={2} placeholder="What you want..." className="input-field textarea rounded-lg" />
          </div>

          <button type="submit" className="btn btn-primary w-full text-[15px]">Save Changes</button>
        </form>
      </div>
    </main>
  );
}
