'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 
      bg-[rgba(var(--nav-bg-rgb),0.95)] backdrop-blur-[12px] 
      border-b border-[rgba(var(--nav-border-rgb),0.1)] pr-20">
      <Link
        href="/"
        className="font-[Fraunces] font-[300] text-lg tracking-[0.05em] text-[var(--cream)] no-underline hover:text-[var(--sun)] transition-colors"
      >
        enerG·X·<em className="italic text-[var(--sun)]">change</em>
      </Link>
      <div className="flex items-center gap-6">
        {[
          { href: '/profile/new', label: 'Create Profile' },
          { href: '/profile/me', label: 'Profile' },
          { href: '/constellation', label: 'Constellation' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm no-underline transition-colors uppercase tracking-[0.12em] ${
              isActive(href) ? 'text-[var(--sun)]' : 'text-[var(--nav-text)] hover:text-[var(--cream)]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
