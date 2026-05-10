'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getExchangeForMatch, confirmExchange, getExchangeById, type Exchange } from '@/lib/storage';

export default function ExchangePage() {
  const router = useRouter();
  const params = useParams();
  const exchangeId = params.id as string;

  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [profile, setProfile] = useState(getCurrentProfile());
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!profile) {
      router.push('/profile/new');
      return;
    }

    const ex = getExchangeForMatch(exchangeId);
    if (!ex) {
      router.push('/profile/me');
      return;
    }

    setExchange(ex);
    const otherId = ex.userA === profile.id ? ex.userB : ex.userA;
    setOtherUser(otherId);

    if (ex.confirmedBy.includes(profile.id)) {
      setConfirmed(true);
    }
  }, [exchangeId, profile]);

  if (!exchange || !profile || !otherUser) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex items-center justify-center">
        <p className="text-[var(--sand)]">Loading...</p>
      </main>
    );
  }

    const otherProfile = getOtherProfile(otherUser);
  const isComplete = exchange.status === 'completed';

  const handleConfirm = () => {
    const updated = confirmExchange(exchange.id, profile.id);
    if (updated) {
      setExchange(updated);
      setConfirmed(true);

      if (updated.status === 'completed') {
        setTimeout(() => router.push('/profile/me'), 2000);
      }
    }
  };

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
          Confirm <em className="italic text-[var(--sun)]">Exchange</em>
        </h1>

        {otherProfile && (
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-8 mb-8">
            <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
              Your Exchange Partner
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--warm)] flex items-center justify-center text-2xl font-[Fraunces] font-[200] text-[var(--sun)]">
                {otherProfile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-[Fraunces] font-[300] text-lg text-[var(--cream)]">
                  {otherProfile.name}
                </p>
                <p className="text-sm text-[var(--sand)]">{otherProfile.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">They Offer</span>
                <p className="mt-2 text-[var(--cream)]">{otherProfile.offer}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">They Want</span>
                <p className="mt-2 text-[var(--cream)]">{otherProfile.want}</p>
              </div>
            </div>
          </div>
        )}

        {isComplete ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[var(--ember)] flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[Fraunces] font-[200] text-3xl mb-4 text-[var(--cream)]">
              Exchange <em className="italic text-[var(--sun)]">Confirmed!</em>
            </h2>
            <p className="text-[var(--sand)] mb-8">
              Welcome to the community! Your membership card is being generated.
            </p>
            <button
              onClick={() => router.push('/profile/me')}
              className="px-8 py-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
            >
              View My Profile →
            </button>
          </div>
        ) : (
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-8">
            <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
              Confirm Exchange Completion
            </h2>
            <p className="text-[var(--sand)] mb-6 leading-relaxed">
              Once you and your partner have completed the exchange in real life, confirm below.
              Both users must confirm for the exchange to be marked complete.
            </p>

            {confirmed ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[var(--green)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[var(--cream)]">You've confirmed! Waiting for your partner...</p>
              </div>
            ) : (
              <button
                onClick={handleConfirm}
                className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
              >
                Confirm Exchange Completed
              </button>
            )}

            <div className="mt-6 pt-6 border-t border-[var(--warm)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--sand)]">
                  Confirmations: {exchange.confirmedBy.length}/2
                </span>
                <span className="text-[var(--sand)]">
                  Status: {exchange.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function getCurrentProfile() {
  if (typeof window === 'undefined') return null;
  const currentId = localStorage.getItem('energ_exchange_current_user_id');
  if (!currentId) return null;

  const profiles = JSON.parse(localStorage.getItem('energ_exchange_profiles') || '[]');
  return profiles.find((p: any) => p.id === currentId) || null;
}

function getOtherProfile(id: string) {
  const profiles = JSON.parse(localStorage.getItem('energ_exchange_profiles') || '[]');
  return profiles.find((p: any) => p.id === id) || null;
}
