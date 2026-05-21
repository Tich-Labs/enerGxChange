'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentProfile, type Profile } from '@/lib/storage';

export default function CardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cardToken, setCardToken] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const p = getCurrentProfile();
    if (!p || p.isMember !== true) {
      router.push('/profile/me');
      return;
    }
    setProfile(p);

    // Generate or retrieve card token
    const token = p.cardToken || crypto.randomUUID();
    if (!p.cardToken) {
      p.cardToken = token;
      // Save updated profile with token
      const profiles = JSON.parse(localStorage.getItem('energ_exchange_profiles') || '[]');
      const idx = profiles.findIndex((pr: any) => pr.id === p.id);
      if (idx >= 0) {
        profiles[idx] = p;
        localStorage.setItem('energ_exchange_profiles', JSON.stringify(profiles));
      }
    }
    setCardToken(token);

    // Generate QR code
    if (canvasRef.current) {
      generateQR(canvasRef.current, `${window.location.origin}/verify/${token}`);
    }
  }, []);

  if (!profile || !cardToken) {
    return (
      <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] flex items-center justify-center">
        <p className="text-[var(--sand)]">Loading...</p>
      </main>
    );
  }

  const handleDownload = () => {
    const card = document.getElementById('membership-card');
    if (!card) return;

    // Simple download as HTML
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Membership Card - ${profile.context.name}</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; padding: 20px; background: #1a1410; }
          .card { width: 400px; background: #2a2018; border: 2px solid #e8c97a; border-radius: 16px; padding: 32px; color: #f5ede0; font-family: 'DM Sans', sans-serif; }
          .name { font-family: 'Fraunces', serif; font-size: 24px; margin-bottom: 8px; }
          .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #c4a882; margin-top: 16px; }
          .value { margin-top: 4px; }
          .qr { text-align: center; margin-top: 24px; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #c4a882; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="name">${profile.context.name}</div>
          <div style="color: #c4a882; font-size: 12px;">COMMUNITY MEMBER</div>

          <div class="label">Member Since</div>
          <div class="value">${profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</div>

          <div class="label">Offers in</div>
          <div class="value" style="color: #e8c97a;">${profile.offer.domain}</div>

          <div class="qr">
            <img src="${canvasRef.current?.toDataURL()}" width="128" height="128" alt="QR Code" />
            <div style="font-size: 10px; color: #c4a882; margin-top: 8px;">Scan to verify membership</div>
          </div>

          <div class="footer">
            enerG·X·change — No money. No ratings. Just real exchanges.
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `membership-card-${profile.context.name}.html`;
    a.click();
    URL.revokeObjectURL(url);
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

        <h1 className="font-[Fraunces] font-[200] text-3xl mt-4 mb-8 text-[var(--cream)]">
          Membership <em className="italic text-[var(--sun)]">Card</em>
        </h1>

        <div id="membership-card" className="bg-[var(--bark)] border-2 border-[var(--sun)] rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[var(--warm)] flex items-center justify-center text-3xl font-[Fraunces] font-[200] text-[var(--sun)] mx-auto mb-4">
              {(profile.context.name || '?').charAt(0).toUpperCase()}
            </div>
            <h2 className="font-[Fraunces] font-[300] text-2xl text-[var(--cream)]">
              {profile.context.name}
            </h2>
            <p className="text-[var(--sun)] text-sm uppercase tracking-[0.2em] mt-1">
              Community Member
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Member Since</span>
              <p className="mt-1 text-[var(--cream)]">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Offers in</span>
                <p className="mt-1 text-[var(--sun)]">{profile.offer.domain}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)]">Wants in</span>
                <p className="mt-1 text-[var(--sun)]">{profile.want.domain}</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-[var(--warm)]">
            <canvas ref={canvasRef} className="mx-auto mb-2" />
            <p className="text-xs text-[var(--sand)]">Scan to verify membership</p>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--warm)] text-center">
            <p className="text-xs text-[var(--sand)]">
              enerG·X·change — No money. No ratings. Just real exchanges.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="btn btn-primary px-8 py-3 hover:-translate-y-[2px] transition-all duration-200"
            type="button"
          >
            Download Card
          </button>
        </div>
      </div>
    </main>
  );
}

function generateQR(canvas: HTMLCanvasElement, text: string) {
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Simple QR-like pattern (for demo - in production use a QR library)
  const modules = 25;
  const cellSize = size / modules;

  ctx.fillStyle = '#f5ede0';
  ctx.fillRect(0, 0, size, size);

  // Generate a deterministic pattern based on the text
  ctx.fillStyle = '#1a1410';
  const hash = simpleHash(text);

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      const bit = (hash[(row * modules + col) % hash.length] || 0) % 2;
      if (bit === 1) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  // Add corner markers
  drawMarker(ctx, 0, 0, cellSize);
  drawMarker(ctx, (modules - 7) * cellSize, 0, cellSize);
  drawMarker(ctx, 0, (modules - 7) * cellSize, cellSize);
}

function drawMarker(ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) {
  ctx.fillStyle = '#1a1410';
  ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
  ctx.fillStyle = '#f5ede0';
  ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
  ctx.fillStyle = '#1a1410';
  ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
}

function simpleHash(text: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < text.length; i++) {
    result.push(text.charCodeAt(i));
  }
  return result;
}
