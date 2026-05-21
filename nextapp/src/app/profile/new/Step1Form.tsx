'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProfileStep1 } from '@/types/user';

const STEP = 1;
const TOTAL = 3;

export default function Step1Form() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileStep1>({ name: '', bio: '', location: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profile_step1', JSON.stringify(formData));
    router.push('/profile/new/step2');
  };

  const canContinue = formData.bio.trim().length >= 10;

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-16">
      {/* System promise banner */}
      <div className="bg-[var(--bark)] border-b border-[var(--sun)]/10 px-6 py-3 text-center">
        <p className="text-[var(--sun)] text-[13px] font-medium">
          AI will match you with <span className="font-[Fraunces]">one</span> person for a real exchange. Not a feed. Not a marketplace.
        </p>
      </div>

      <div className="px-6 max-w-lg mx-auto pt-6 mb-8">
        <div className="flex items-center gap-4">
          <span className="label-sm text-[var(--sun)]">Step {STEP} of {TOTAL}</span>
          <div className="flex-1 h-1 rounded-full bg-[var(--warm)] overflow-hidden">
            <div className="h-full bg-[var(--ember)] rounded-full transition-all duration-600" style={{ width: `${(STEP / TOTAL) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="px-6 max-w-lg mx-auto pb-24 animate-up">
        <h1 className="font-[Fraunces] font-[200] text-[2.25rem] mb-2 text-[var(--cream)] tracking-[-0.01em]">
          Your <em className="italic text-[var(--sun)]">Context</em>
        </h1>
        <p className="text-[var(--text-secondary)] text-[15px] mb-10 leading-relaxed">
          This helps Gemini understand your exchange context. Keep it real.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="profile-name" className="label-sm text-[var(--sand)] mb-2 block">
              Name <span className="text-[var(--text-tertiary)] font-normal tracking-normal lowercase">optional</span>
            </label>
            <input id="profile-name" name="profile-name" type="text" placeholder="How should people address you?" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field rounded-lg" />
          </div>

          <div>
            <label htmlFor="profile-location" className="label-sm text-[var(--sand)] mb-2 block">
              Location <span className="text-[var(--text-tertiary)] font-normal tracking-normal lowercase">optional</span>
            </label>
            <input id="profile-location" name="profile-location" type="text" placeholder="City or region" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-field rounded-lg" />
          </div>

          <div>
            <label htmlFor="profile-bio" className="label-sm text-[var(--sand)] mb-2 block">
              Short Bio <span className="text-[var(--ember)] ml-0.5">*</span>
            </label>
            <textarea id="profile-bio" name="profile-bio" placeholder="In 1-2 lines: who you are and what you're about..." rows={3} maxLength={120} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="input-field textarea rounded-lg" />
            <p className="text-[var(--text-tertiary)] text-xs mt-1.5">{formData.bio.length}/120</p>
          </div>

          <button type="submit" disabled={!canContinue} className="btn btn-primary w-full text-[15px]">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
