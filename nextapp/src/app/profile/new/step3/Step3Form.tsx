'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileStep3 } from '@/types/user';
import { WORLDS } from '@/constants';
import ProgressBar from '@/components/ProgressBar';
import { createProfile, findMatchFor, createMatch } from '@/lib/storage';

export default function Step3Form() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileStep3>({
    world: '' as ProfileStep3['world'],
    want: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    const step1 = JSON.parse(localStorage.getItem('profile_step1') || '{}');
    const step2 = JSON.parse(localStorage.getItem('profile_step2') || '{}');

    const profile = createProfile({
      name: step1.name || '',
      bio: step1.bio || '',
      location: step1.location || '',
      offerWorld: step2.world || '',
      offer: step2.offer || '',
      wantWorld: formData.world,
      want: formData.want,
    });

    localStorage.removeItem('profile_step1');
    localStorage.removeItem('profile_step2');

    // Try to find a match
    const match = findMatchFor(profile);
    if (match) {
      createMatch(profile.id, match.id);
      setMatchFound(true);
      return;
    }

    router.push('/profile/waiting');
  };

  const goToProfile = () => {
    router.push('/profile/me');
  };

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <ProgressBar currentStep={3} />
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up">
        <button
          onClick={() => router.push('/profile/new/step2')}
          className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
        >
          ← Back
        </button>
        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-6 text-[var(--cream)]">
          What I <em className="italic text-[var(--sun)]">Want</em>
        </h1>
        <p className="text-[var(--sand)] mb-8 leading-relaxed">
          Choose your World and describe what you're looking for.
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
              Describe What You Want
            </label>
            <textarea
              value={formData.want}
              onChange={(e) => setFormData({ ...formData, want: e.target.value })}
              placeholder="e.g., Someone to fix my roof, Cooking lessons, Web design help..."
              rows={4}
              className="w-full p-3 bg-[var(--bark)] border border-[var(--warm)] rounded-lg text-[var(--cream)] placeholder:text-[var(--sand)] focus:border-[var(--ember)] focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!formData.world || !formData.want}
            className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit & Find Match →
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-[var(--soil)] z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-[var(--ember)] flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[Fraunces] font-[200] text-4xl mb-6 text-[var(--cream)]">
              Profile <em className="italic text-[var(--sun)]">Complete</em>
            </h2>
            <p className="text-[var(--sand)] leading-relaxed mb-10">
              {matchFound
                ? 'Match found! You can now coordinate your exchange.'
                : 'Your profile has been created. We are looking for a match in your World.'}
            </p>
            <button
              onClick={matchFound ? goToProfile : confirmSubmit}
              className="w-full max-w-xs p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
            >
              {matchFound ? 'Go to Profile →' : 'Continue to Profile →'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
