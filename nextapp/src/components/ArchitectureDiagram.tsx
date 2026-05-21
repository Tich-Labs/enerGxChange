import React from 'react';

export default function ArchitectureDiagram() {
  return (
    <section className="py-16 md:py-24 pb-20 md:pb-32 bg-[var(--bark)] border-t border-b border-[rgba(196,168,130,0.12)]">
      <div className="px-6 max-w-4xl mx-auto text-center">

        <h3 className="font-[Fraunces] font-[300] text-[1.25rem] mb-10 text-[var(--cream)]">
          System Architecture
        </h3>

        <div className="relative flex flex-col items-center gap-8">

          {/* centered spine */}
          <div
            className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-[rgba(196,168,130,0.20)] transform -translate-x-1/2 pointer-events-none z-0"
            aria-hidden
          />

          {/* Institutional Layer */}
          <div className="w-full max-w-2xl z-10">
            <div className="rounded-xl p-5 bg-[var(--soil)] border border-[rgba(196,168,130,0.28)]" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--sun)' }}>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.08em]">Institutional Layer</p>
              <div className="mt-1.5 flex items-baseline justify-between">
                <div className="text-sm text-[var(--cream)] font-[Fraunces]">Universities / NGOs / Communities</div>
                <div className="text-[11px] text-[var(--text-tertiary)] font-mono">tenantId = organization</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="z-10"><ArrowDown /></div>

          {/* Core Engine */}
          <div className="w-full z-10">
            <div className="rounded-xl p-6 bg-[var(--soil)] border border-[rgba(196,168,130,0.28)]" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--sun)' }}>
              <div className="text-center mb-3">
                <h4 className="font-[Fraunces] font-[300] text-[var(--cream)] text-lg">enerG·X·change Engine</h4>
                <div className="text-xs text-[var(--text-secondary)]">Trust-based exchange system (Next.js + LocalStorage MVP)</div>
              </div>
              <ul className="text-sm text-[var(--sand)] w-full max-w-2xl mx-auto md:flex md:justify-between md:gap-6 md:items-start mt-2">
                <li className="mb-1 md:mb-0">&bull; Profile System (Offer / Need)</li>
                <li className="mb-1 md:mb-0">&bull; Exchange Verification Layer</li>
                <li className="mb-1 md:mb-0">&bull; AI Matching Pipeline (Gemini)</li>
                <li className="mb-1 md:mb-0">&bull; Tenant Isolation Layer</li>
              </ul>
            </div>
          </div>

          {/* Inputs (participants) */}
          <div className="w-full relative z-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="flex-1">
                <div className="rounded-xl p-5 bg-[var(--soil)] border border-[rgba(196,168,130,0.28)] h-full" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--sun)' }}>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.08em]">Participant A</p>
                  <div className="text-sm text-[var(--cream)] font-[Fraunces] mt-2">Skills, Time, or Knowledge</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-xl p-5 bg-[var(--soil)] border border-[rgba(196,168,130,0.28)] h-full" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--sun)' }}>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.08em]">Participant B</p>
                  <div className="text-sm text-[var(--cream)] font-[Fraunces] mt-2">Skills, Time, or Knowledge</div>
                </div>
              </div>
            </div>

            {/* horizontal connectors */}
            <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden>
              <line x1="0" y1="2" x2="44" y2="2" stroke="rgba(196,168,130,0.28)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="56" y1="2" x2="100" y2="2" stroke="rgba(196,168,130,0.28)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="50" cy="2" r="1.2" fill="rgba(196,168,130,0.30)" />
            </svg>
          </div>

          {/* Merge Node */}
          <div className="z-10"><ArrowMerge /></div>

          {/* Gemini AI */}
          <div className="w-full max-w-xl z-10">
            <div className="rounded-xl p-6 bg-[var(--soil)] border-2 transition-all" style={{ borderColor: 'var(--sun)', boxShadow: '0 0 24px rgba(232,201,122,0.08)' }}>
              <div className="text-center mb-3">
                <h4 className="font-[Fraunces] font-[300] text-[var(--cream)] text-[1.125rem]">Gemini AI Matching Layer</h4>
                <div className="text-xs text-[var(--text-secondary)]">Reciprocal trust intelligence engine</div>
              </div>
              <ul className="text-sm text-[var(--sand)] w-full max-w-lg mx-auto md:flex md:justify-between md:gap-6 md:items-start mt-2">
                <li className="mb-1 md:mb-0">&bull; Compatibility scoring</li>
                <li className="mb-1 md:mb-0">&bull; Match reasoning</li>
                <li className="mb-1 md:mb-0">&bull; Reciprocal pairing</li>
              </ul>
            </div>
          </div>

          {/* Arrow */}
          <div className="z-10"><ArrowDown /></div>

          {/* Output */}
          <div className="w-full max-w-md z-10">
            <div className="rounded-xl p-5 bg-[var(--soil)] border border-[rgba(196,168,130,0.28)]" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--sun)' }}>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.08em]">System Output</p>
              <div className="mt-1.5 text-sm text-[var(--cream)] font-[Fraunces]">One Intentional Real-World Exchange</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function ArrowDown() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v12" stroke="rgba(196,168,130,0.28)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 12l-6 6-6-6" stroke="rgba(196,168,130,0.28)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowMerge() {
  return (
    <div className="flex items-center justify-center">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M2 12h8" stroke="rgba(196,168,130,0.28)" strokeWidth="1.8" />
        <path d="M22 12h-8" stroke="rgba(196,168,130,0.28)" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" fill="rgba(196,168,130,0.30)" />
      </svg>
    </div>
  );
}
