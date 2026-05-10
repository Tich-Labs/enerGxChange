'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProfileStep1 } from '@/types/user';
import ProgressBar from '@/components/ProgressBar';

export default function Step1Form() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileStep1>({
    name: '',
    bio: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profile_step1', JSON.stringify(formData));
    router.push('/profile/new/step2');
  };

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <ProgressBar currentStep={1} />
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up">
        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-6 text-[var(--cream)]">
          Who I <em className="italic text-[var(--sun)]">Am</em>
        </h1>
        <p className="text-[var(--sand)] mb-8 leading-relaxed">
          Tell us about yourself. This information will be visible to your match.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">
              Bio
            </label>
            <textarea
              placeholder="Wellness coach, traveler, mother of two..."
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Austin, TX"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
          >
            Continue →
          </button>
        </form>
      </div>
    </main>
  );
}
