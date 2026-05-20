import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hackathon — enerG·X·change',
  description:
    'Build with Gemini XPRIZE — $2,000,000 in prizes. AI-powered trust infrastructure for community economies.',
};

export default function HackathonPage() {
  return (
    <main className="min-h-screen bg-[var(--soil)] text-[var(--cream)] pt-20">
      <div className="px-6 max-w-3xl mx-auto pb-20 animate-up">
        <Link
          href="/"
          className="text-[var(--sand)] hover:text-[var(--sun)] transition-colors mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em]"
        >
          &larr; Back Home
        </Link>

        {/* Hero */}
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--sun)] mb-2">
          Build with Gemini XPRIZE &middot; $2,000,000
        </p>
        <h1 className="font-[Fraunces] font-[200] text-3xl mt-2 mb-2 text-[var(--cream)]">
          Hackathon <em className="italic text-[var(--sun)]">Project</em>
        </h1>
        <p className="text-[var(--sand)] text-lg font-[Fraunces] italic mb-3 leading-relaxed">
          Give something real. Receive something real.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="https://xprize.devpost.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sun)] hover:underline"
          >
            Devpost &rarr;
          </a>
          <span className="text-[var(--sand)] opacity-40">|</span>
          <a
            href="https://github.com/Tich-Labs/enerGxChange"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sun)] hover:underline"
          >
            GitHub &rarr;
          </a>
          <span className="text-[var(--sand)] opacity-40">|</span>
          <a
            href="https://tich-labs.github.io/enerGxChange/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sun)] hover:underline"
          >
            Live Demo &rarr;
          </a>
        </div>

        {/* Event & Team */}
        <section className="mt-10 mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Event
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6 space-y-3">
            <InfoRow label="Hackathon" value="Build with Gemini XPRIZE" />
            <InfoRow label="Platform" value="Devpost (Online)" />
            <InfoRow label="Sponsor" value="XPRIZE" />
            <InfoRow label="Prize Pool" value="$2,000,000" />
            <InfoRow label="Dates" value="May 19 – Aug 17, 2026 (90 days)" />
            <InfoRow label="Judging" value="Aug 18 – Sep 15, 2026" />
            <InfoRow label="Winners" value="~Sep 25, 2026" />
            <InfoRow label="Solo Dev" value="Naijeria Toweett" />
            <InfoRow
              label="GitHub"
              value="github.com/Tich-Labs/enerGxChange"
            />
          </div>
        </section>

        {/* What It Is */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            What It Is
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--sun)] rounded-2xl p-6">
            <p className="text-[var(--cream)] text-base font-[Fraunces] leading-relaxed mb-3">
              AI-powered trust infrastructure for community economies.
            </p>
            <p className="text-[var(--sand)] text-sm leading-relaxed">
              A community exchange network where people trade skills, services,
              and time through trust-based matching — not money. Members earn
              access by completing one real exchange, creating communities
              rooted in reciprocity rather than transactions.
            </p>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6">
            <h3 className="font-[Fraunces] font-[300] text-lg mb-3 text-[var(--cream)]">
              The Problem
            </h3>
            <p className="text-[var(--sand)] text-sm leading-relaxed">
              Transactional platforms, ratings culture, and algorithmic feeds
              have exhausted people. Money sits between every human connection.
              Skills and time go underutilized because the infrastructure for
              trust-based exchange doesn't exist.
            </p>
          </div>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6">
            <h3 className="font-[Fraunces] font-[300] text-lg mb-3 text-[var(--cream)]">
              Our Approach
            </h3>
            <p className="text-[var(--sand)] text-sm leading-relaxed">
              One intentional match — not a feed, not a marketplace. No
              browsing, no ratings. Access to the full community unlocks only
              after a verified real-world exchange. This earned-entry mechanic
              transforms community membership from a sign-up into something
              meaningful.
            </p>
          </div>
        </section>

        {/* Category */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            XPRIZE Category
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--sun)] rounded-2xl p-6">
            <h3 className="font-[Fraunces] font-[300] text-lg text-[var(--sun)]">
              Entrepreneurship & Job Creation
            </h3>
            <p className="text-[var(--sand)] text-sm mt-2 leading-relaxed">
              Creates economic opportunity without currency — unlocks skills,
              builds alternative access systems, and supports local economies.
              Also relevant to Professional Services Access and Small Business
              Services.
            </p>
          </div>
        </section>

        {/* How AI Powers It */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            AI-Native Architecture
          </h2>
          <p className="text-[var(--sand)] text-sm mb-4 opacity-60">
            Gemini runs across four systems — AI is not bolted on, it is the
            operating layer.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Match Intelligence',
                desc: 'Gemini analyzes skills, needs, availability, location, and trust signals to generate meaningful one-to-one exchange recommendations — semantic understanding, not keyword filters.',
              },
              {
                title: 'Community Stewardship',
                desc: 'AI surfaces collaboration opportunities, detects inactive exchanges, and moderates harmful behavior — entirely in the background, maintaining community health without public scores.',
              },
              {
                title: 'Exchange Memory',
                desc: 'AI builds private, evolving member profiles from real exchange history: contributions, consistency, and collaborative strengths — never a public rating.',
              },
              {
                title: 'Onboarding Guide',
                desc: 'Conversational AI helps new members articulate their offers and wants within the 4-world framework, ensuring high-signal profiles from day one.',
              },
            ].map((system) => (
              <div
                key={system.title}
                className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-[var(--sun)]" />
                <div>
                  <h3 className="font-[Fraunces] font-[300] text-base text-[var(--cream)]">
                    {system.title}
                  </h3>
                  <p className="text-[var(--sand)] text-sm mt-1">
                    {system.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Tech
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6">
            <div className="flex flex-wrap gap-2">
              {[
                'Next.js 16',
                'React 19',
                'Tailwind CSS 4',
                'TypeScript',
                'Gemini API',
                'Google Cloud',
                'jsPDF',
                'qrcode.react',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs uppercase tracking-[0.1em] border border-[var(--warm)] text-[var(--sand)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Roadmap
          </h2>

          {/* Phase 1 — Hackathon */}
          <div className="bg-[var(--bark)] border border-[var(--sun)] rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 rounded text-xs uppercase tracking-[0.12em] bg-[var(--sun)]/20 text-[var(--sun)] border border-[var(--sun)]/30">
                Phase 1
              </span>
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--sand)] opacity-60">
                Hackathon — Now
              </span>
            </div>
            <p className="text-sm text-[var(--sand)] mb-4">
              The core trust loop. Narrow and deep.
            </p>
            <div className="space-y-2">
              {[
                { step: '01', label: 'Onboarding', desc: '4-world profile creation. AI-assisted articulation of offers and wants.' },
                { step: '02', label: 'AI Matching', desc: 'Gemini generates one intentional match per member — not a feed.' },
                { step: '03', label: 'Exchange Confirmation', desc: 'Binary. It happened or it didn\'t. Both parties confirm.' },
                { step: '04', label: 'Community Unlock', desc: 'Constellation and member profiles become visible. Earned entry.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 py-2">
                  <span className="text-xs text-[var(--sun)] font-[Fraunces] w-5 shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <span className="text-sm text-[var(--cream)] font-[Fraunces]">
                      {item.label}
                    </span>
                    <span className="text-sm text-[var(--sand)] opacity-60 ml-2">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2 — Post-Hackathon */}
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 rounded text-xs uppercase tracking-[0.12em] bg-[var(--sand)]/10 text-[var(--sand)] border border-[var(--warm)]">
                Phase 2
              </span>
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--sand)] opacity-60">
                Post-Hackathon
              </span>
            </div>
            <p className="text-sm text-[var(--sand)] mb-4">
              Expand the platform layers — communication, knowledge, local
              networks.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Communication Layer', desc: 'Member-to-member messaging within matched pairs and community channels.' },
                { label: 'Knowledge Layer', desc: 'AI-generated community insights — exchange trends, skill gaps, opportunity surfaces.' },
                { label: 'Local Networks', desc: 'Geographic trust clusters. Proximity-based matching and in-person exchange events.' },
                { label: 'Membership Card V2', desc: 'Physical card ordering via Gelato print-on-demand. Verifiable QR credentials.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[var(--sand)] opacity-40" />
                  <div>
                    <span className="text-sm text-[var(--cream)]">{item.label}</span>
                    <span className="text-sm text-[var(--sand)] opacity-60 ml-2">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3 — Future */}
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 rounded text-xs uppercase tracking-[0.12em] bg-[var(--sand)]/5 text-[var(--sand)] opacity-60 border border-[var(--warm)]">
                Phase 3
              </span>
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--sand)] opacity-40">
                Future
              </span>
            </div>
            <p className="text-sm text-[var(--sand)] mb-4">
              Protocol-level features. The platform becomes infrastructure.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Exchange Protocol API', desc: 'Open API for third-party communities to adopt the earned-entry exchange model.' },
                { label: 'Federated Constellations', desc: 'Multiple interconnected community graphs. Cross-constellation trust bridges.' },
                { label: 'AI Governance', desc: 'Community-driven AI stewardship policies. Transparent moderation and matching logic.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[var(--sand)] opacity-20" />
                  <div>
                    <span className="text-sm text-[var(--cream)] opacity-70">{item.label}</span>
                    <span className="text-sm text-[var(--sand)] opacity-40 ml-2">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We're Not Building */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Scope Discipline
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-5">
            <p className="text-[var(--sand)] text-sm mb-3">
              For the hackathon, focus stays on the core trust loop. These are
              intentionally deferred:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Chat / messaging',
                'Video calls',
                'Marketplace browsing',
                'Discussion forums',
                'Blockchain / crypto',
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs border border-[var(--warm)] text-[var(--sand)] opacity-40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Judging Criteria */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Judging Criteria
          </h2>
          <p className="text-[var(--sand)] text-sm mb-4 opacity-60">
            Equally weighted. Here's how we address each.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Business Viability',
                desc: 'Earned-entry ensures quality over quantity. Each verified exchange strengthens the network. The model compounds — more members mean more match possibilities, but access remains gated behind real participation.',
              },
              {
                title: 'AI-Native Operations',
                desc: 'Gemini is not a feature — it is the operating system. Four AI systems run continuously: matching, stewardship, exchange memory, and onboarding. Every core function has an AI-native implementation.',
              },
              {
                title: 'Category Impact',
                desc: 'Economic opportunity without money. Skills that are currently invisible to the market become discoverable. Local economies gain infrastructure for trust-based exchange that doesn\'t depend on currency.',
              },
            ].map((criterion) => (
              <div
                key={criterion.title}
                className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-[var(--ember)]" />
                <div>
                  <h3 className="font-[Fraunces] font-[300] text-base text-[var(--cream)]">
                    {criterion.title}
                  </h3>
                  <p className="text-[var(--sand)] text-sm mt-1">
                    {criterion.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prizes */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Prizes
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6 space-y-2">
            {[
              { place: '1st Place', amount: '$500,000' },
              { place: '2nd Place', amount: '$200,000' },
              { place: '3rd–5th Place', amount: '$100,000 each' },
              { place: 'Runner-up (×15)', amount: '$50,000 each' },
              { place: 'Category Winner (×5)', amount: '$50,000 each' },
            ].map((prize) => (
              <div
                key={prize.place}
                className="flex justify-between items-center py-2 border-b border-[var(--warm)] last:border-b-0"
              >
                <span className="text-sm text-[var(--sand)]">{prize.place}</span>
                <span className="text-sm font-[Fraunces] text-[var(--sun)]">
                  {prize.amount}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 mt-2 border-t border-[var(--sun)]">
              <span className="text-sm text-[var(--cream)] font-[Fraunces]">
                Total Prize Pool
              </span>
              <span className="text-base font-[Fraunces] text-[var(--sun)]">
                $2,000,000
              </span>
            </div>
          </div>
        </section>

        {/* Submission Checklist */}
        <section className="mb-10">
          <h2 className="font-[Fraunces] font-[300] text-xl mb-4 text-[var(--cream)]">
            Submission Checklist
          </h2>
          <div className="bg-[var(--bark)] border border-[var(--warm)] rounded-2xl p-6">
            <ul className="space-y-3">
              {[
                'GitHub repo shared with testing@devpost.com and judging@hacker.fund',
                '3-minute demo video (YouTube, Vimeo, or Youku)',
                'Written narrative (500–1000 words) on AI usage and human vs. AI roles',
                'Revenue evidence — explain zero-revenue trust economy model',
                'Expenses disclosure — hosting, API costs, marketing (disclose even if zero)',
                'Product evidence — Gemini API logs, agent execution records, screenshots',
                'Customer evidence — user contacts, testimonials, exchange feedback',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[var(--sand)]"
                >
                  <span className="text-[var(--sun)] mt-0.5 shrink-0">
                    &#9744;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <span className="text-xs uppercase tracking-[0.15em] text-[var(--sand)] opacity-60 w-32 shrink-0">
        {label}
      </span>
      <span className="text-sm text-[var(--cream)]">{value}</span>
    </div>
  );
}
