'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileStep2 } from '@/types/user';
import { WORLDS } from '@/constants';
import ProgressBar from '@/components/ProgressBar';

export default function Step2Form() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileStep2>({
    world: '' as ProfileStep2['world'],
    offer: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profile_step2', JSON.stringify(formData));
    router.push('/profile/new/step3');
  };

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <ProgressBar currentStep={2} />
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up">
        <button
          onClick={() => router.push('/profile/new')}
          className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
        >
          ← Back
        </button>
        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-6 text-[var(--cream)]">
          What I <em className="italic text-[var(--sun)]">Offer</em>
        </h1>
        <p className="text-[var(--sand)] mb-8 leading-relaxed">
          Choose your World and describe what you can give to the community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-3">
              Choose Your World
            </label>
            <div className="grid grid-cols-2 gap-4">
              {WORLDS.map((world) => {
                const isSelected = formData.world === world.id;
                return (
                  <button
                    key={world.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, world: world.id })}
                    className={`relative p-6 border-2 rounded-lg transition-all duration-300 group ${
                      isSelected
                        ? 'bg-[var(--bark)] scale-[1.02]'
                        : 'bg-[var(--bark)] hover:bg-[var(--warm)]'
                    }`}
                    style={{
                      borderColor: isSelected ? world.color : 'var(--warm)',
                      background: isSelected ? `${world.color}11` : undefined,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                        style={{ background: world.color }}
                      />
                    )}
                    <div className="text-center">
                      <span className="font-[Fraunces] font-[300] text-xl text-[var(--cream)] group-hover:text-[var(--sun)] transition-colors">
                        {world.label}
                      </span>
                      {isSelected && (
                        <div className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em]" style={{ color: world.color }}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Selected
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.1em] text-[var(--sand)] mb-2">
              Describe What You Offer
            </label>
            <textarea
              value={formData.offer}
              onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
              placeholder="e.g., Yoga session, Web development, Home cooking..."
              rows={4}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!formData.world || !formData.offer}
            className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </form>
      </div>
    </main>
  );
}
