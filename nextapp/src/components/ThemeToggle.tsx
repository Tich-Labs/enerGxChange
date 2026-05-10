'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const light = html.getAttribute('data-theme') === 'light';
    const next = light ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsLight(!light);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-[0.85rem] right-6 z-[1001] w-9 h-9 rounded-full border border-[rgba(196,168,130,0.25)] bg-[rgba(42,32,24,0.9)] backdrop-blur-[8px] flex items-center justify-center text-sm cursor-pointer transition-all duration-300 text-[var(--sand)] hover:border-[var(--sun)] hover:text-[var(--sun)]"
      style={{ 
        background: isLight ? 'rgba(228,221,208,0.9)' : undefined,
        borderColor: isLight ? 'rgba(107,93,74,0.25)' : undefined,
        color: isLight ? 'var(--sand)' : undefined,
      }}
      aria-label="Toggle theme"
    >
      {isLight ? '☾' : '☀'}
    </button>
  );
}
