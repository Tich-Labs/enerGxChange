import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--warm)] py-8 px-8 text-center">
      <p className="text-sm text-[var(--sand)]">
        enerG·X·<em className="italic text-[var(--sun)]">change</em> — AI-powered community exchange
      </p>
      <p className="text-xs text-[var(--sand)] mt-2 opacity-60">
        No money. No ratings. Just real exchanges.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.12em]">
        <Link
          href="/hackathon"
          className="text-[var(--sand)] opacity-60 hover:text-[var(--sun)] hover:opacity-100 transition-colors"
        >
          Hackathon
        </Link>
      </div>
    </footer>
  );
}
