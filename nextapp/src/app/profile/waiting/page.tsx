'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import { getCurrentProfile, getMatchForUser, getExchangeForMatch, confirmExchange, type Match, type Exchange } from '@/lib/storage';

export default function WaitingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(getCurrentProfile());
  const [match, setMatch] = useState<Match | null>(null);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    if (!profile) {
      router.push('/profile/new');
      return;
    }

    // Check for match every 3 seconds (simulating polling)
    const interval = setInterval(() => {
      const m = getMatchForUser(profile.id);
      if (m) {
        setMatch(m);
        clearInterval(interval);

        // Check for exchange
        const ex = getExchangeForMatch(m.id);
        if (ex) {
          setExchange(ex);
        } else if (m.status === 'confirmed') {
          // Both confirmed — exchange should exist
          const exx = getExchangeForMatch(m.id);
          if (exx) setExchange(exx);
        }
      }
      setCheckCount((c) => c + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [profile]);

  if (!profile) return null;

  const isMatched = match && exchange && exchange.status === 'completed';

  if (isMatched) {
    router.push('/profile/me');
    return null;
  }

  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <ProgressBar currentStep={3} />
      <div className="px-6 max-w-2xl mx-auto pb-20 animate-up text-center">
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-[var(--warm)] flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-[var(--sun)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="font-[Fraunces] font-[200] text-3xl mb-4 text-[var(--cream)]">
            Looking for a <em className="italic text-[var(--sun)]">Match</em>
          </h1>
          <p className="text-[var(--sand)] leading-relaxed mb-8">
            We're searching for someone in the same World who wants what you offer.
          </p>
        </div>

        {match && (
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-8 mb-8">
            <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
              Match Found!
            </h2>
            <p className="text-[var(--sand)] mb-6">
              You've been matched. Coordinate your exchange and confirm when done.
            </p>
            <button
              onClick={() => {
                const ex = exchange || (match ? createExchangeForMatch(match.id, profile.id) : null);
                if (ex) {
                  setExchange(ex);
                  router.push(`/exchange/${ex.id}`);
                }
              }}
              className="w-full p-4 bg-[var(--ember)] border border-[var(--ember)] text-[var(--cream)] rounded-lg hover:-translate-y-[2px] transition-all duration-200"
            >
              Start Exchange →
            </button>
          </div>
        )}

        {!match && (
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--sand)]">
            <div className="w-2 h-2 rounded-full bg-[var(--sun)] animate-pulse" />
            <span>Searching... (check #{checkCount})</span>
          </div>
        )}
      </div>
    </main>
  );
}

function createExchangeForMatch(matchId: string, userId: string) {
  // This is a simplified version — in real app, use the storage function
  const match = getMatchForUser(userId);
  if (!match) return null;

  const exchange = {
    id: crypto.randomUUID(),
    matchId,
    userA: match.userA,
    userB: match.userB,
    confirmedBy: [],
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  };

  const exchanges = JSON.parse(localStorage.getItem('energ_exchange_exchanges') || '[]');
  exchanges.push(exchange);
  localStorage.setItem('energ_exchange_exchanges', JSON.stringify(exchanges));
  return exchange;
}
