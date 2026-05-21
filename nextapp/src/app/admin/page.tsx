'use client';

import { useEffect, useState } from 'react';
import {
  getAllProfilesAllTenants,
  getAllMatchesAllTenants,
  getAllExchangesAllTenants,
  getCurrentTenantId,
  setCurrentTenantId,
} from '@/lib/storage';
import type { Profile, Match, Exchange } from '@/lib/storage';
import { seedAll } from '@/lib/seed';

interface MatchLog extends Match {
  userAName: string;
  userBName: string;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'matches', label: 'Matches' },
  { id: 'exchanges', label: 'Exchanges' },
];

export default function AdminPage() {
  const [stats, setStats] = useState({ totalProfiles: 0, totalMatches: 0, completedExchanges: 0 });
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<MatchLog[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [tenantId, setTenantId] = useState('');
  const [seeded, setSeeded] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const detailRef = (typeof window !== 'undefined') ? (null as unknown as HTMLDivElement | null) : null;

  const loadData = () => {
    const tid = getCurrentTenantId();
    setTenantId(tid);
    const allP = getAllProfilesAllTenants();
    const allM = getAllMatchesAllTenants();
    const allE = getAllExchangesAllTenants();
    const tp = tid === '__all__' ? allP : allP.filter((p) => p.tenantId === tid);
    const tm = tid === '__all__' ? allM : allM.filter((m) => m.tenantId === tid);
    const te = tid === '__all__' ? allE : allE.filter((e) => e.tenantId === tid);
    setProfiles(tp);
    setExchanges(te);
    setMatches(tm.map((m) => {
      const a = allP.find((p) => p.id === m.userAId);
      const b = allP.find((p) => p.id === m.userBId);
      return { ...m, userAName: a?.context.name || m.userAId.slice(0, 6), userBName: b?.context.name || m.userBId.slice(0, 6) };
    }));
    setStats({ totalProfiles: tp.length, totalMatches: tm.length, completedExchanges: te.filter((e) => e.completed).length });
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (selectedUser) {
      // move focus into the dialog for screen readers / keyboard users
      setTimeout(() => {
        const panel = document.querySelector('[role="dialog"] [tabindex="-1"]') as HTMLElement | null;
        panel?.focus();
      }, 50);
    }
  }, [selectedUser]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && selectedUser) setSelectedUser(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedUser]);

  const handleSeed = () => { seedAll(); setSeeded(true); loadData(); setTimeout(() => setSeeded(false), 2000); };
  const completionRate = stats.totalMatches > 0 ? Math.round((stats.completedExchanges / stats.totalMatches) * 100) : 0;
  const switchTenant = (tid: string) => {
    setCurrentTenantId(tid === '__all__' ? 'default' : tid);
    if (tid === '__all__') { setTenantId('__all__'); loadData(); } else { window.location.reload(); }
  };
  const tenants = [...new Set(getAllProfilesAllTenants().map((p) => p.tenantId || 'default'))];
  const scrollTo = (id: string) => { setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="min-h-screen bg-[var(--soil)] text-[var(--cream)]">
      {/* Top bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[var(--bark)]/95 backdrop-blur-[12px] border-b border-[var(--warm)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-[Fraunces] font-[200] text-lg text-[var(--cream)]">
            {tenantId === '__all__' ? 'Super Admin' : <><em className="italic text-[var(--sun)]">{tenantId || '...'}</em></>}
          </h1>
          <span className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em]">{tenants.length} tenant{tenants.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-3">
          {profiles.length === 0 && (
            <button type="button" onClick={handleSeed} className="btn btn-primary text-[12px] px-3 py-1.5">{seeded ? 'Seeded!' : 'Seed Data'}</button>
          )}
          <select aria-label="Switch tenant" value={tenantId} onChange={(e) => switchTenant(e.target.value)} className="bg-[var(--soil)] border border-[var(--warm)] rounded-lg text-[var(--sand)] text-[11px] px-2.5 py-1.5 focus:border-[var(--sun)] focus:outline-none">
            <option value="__all__">All Tenants</option>
            {tenants.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="flex pt-24" aria-hidden={selectedUser ? 'true' : 'false'}>
        {/* Side nav */}
        <nav className="fixed left-0 top-24 bottom-0 w-44 bg-[var(--bark)] border-r border-[var(--warm)] py-4 overflow-y-auto hidden md:block">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-5 py-2.5 text-[13px] transition-colors flex items-center gap-2.5 ${
                activeSection === item.id ? 'text-[var(--sun)] bg-[var(--sun)]/5 border-r-2 border-[var(--sun)]' : 'text-[var(--text-secondary)] hover:text-[var(--cream)]'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-[var(--sun)]' : 'bg-[var(--text-tertiary)]'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 md:ml-44 px-6 pb-20 max-w-5xl">
          {/* Overview */}
          <section id="overview" className="pt-6 mb-12">
            <h2 className="font-[Fraunces] font-[300] text-lg mb-5">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: stats.totalProfiles, color: 'var(--sun)' },
                { label: 'Matches', value: stats.totalMatches, color: 'var(--sun)' },
                { label: 'Exchanges Done', value: stats.completedExchanges, color: 'var(--green)' },
                { label: 'Completion Rate', value: completionRate + '%', color: completionRate > 0 ? 'var(--green)' : 'var(--text-tertiary)' },
              ].map((s) => (
                <div key={s.label} className="card rounded-xl p-4 text-center">
                  <p className="text-[1.5rem] font-[Fraunces] font-[200]" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[var(--text-tertiary)] text-[11px] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Users */}
          <section id="users" className="mb-12">
            <h2 className="font-[Fraunces] font-[300] text-lg mb-4">Users</h2>
            {profiles.length === 0 ? (
              <div className="card rounded-xl p-8 text-center"><p className="text-[var(--text-tertiary)] text-sm">No profiles.</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--warm)] text-[var(--text-tertiary)] text-[11px] uppercase tracking-[0.08em]">
                    <th className="text-left py-3 px-4 font-medium">Name</th><th className="text-left py-3 px-4 font-medium">Offer</th><th className="text-left py-3 px-4 font-medium">Want</th><th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} onClick={() => setSelectedUser(p)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedUser(p); }} role="button" tabIndex={0} className="border-b border-[var(--warm)]/50 hover:bg-[var(--bark)]/50 transition-colors cursor-pointer">
                        <td className="py-3 px-4"><p className="text-[var(--cream)] text-[13px]">{p.context.name || '-'}</p>{p.context.location && <p className="text-[var(--text-tertiary)] text-[11px]">{p.context.location}</p>}</td>
                        <td className="py-3 px-4"><span className="text-[13px] text-[var(--sand)]">{p.offer.domain}</span><p className="text-[var(--text-tertiary)] text-[11px] truncate max-w-[120px]">{p.offer.description}</p></td>
                        <td className="py-3 px-4"><span className="text-[13px] text-[var(--sand)]">{p.want.domain}</span><p className="text-[var(--text-tertiary)] text-[11px] truncate max-w-[120px]">{p.want.description}</p></td>
                        <td className="py-3 px-4"><span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${p.status === 'completed' ? 'bg-[var(--green)]/15 text-[var(--green)]' : p.status === 'matched' ? 'bg-[var(--sun)]/15 text-[var(--sun)]' : 'bg-[var(--warm)]/50 text-[var(--text-secondary)]'}`}>{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Matches */}
          <section id="matches" className="mb-12">
            <h2 className="font-[Fraunces] font-[300] text-lg mb-4">Matches</h2>
            {matches.length === 0 ? (
              <div className="card rounded-xl p-8 text-center"><p className="text-[var(--text-tertiary)] text-sm">No matches.</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--warm)] text-[var(--text-tertiary)] text-[11px] uppercase tracking-[0.08em]">
                    <th className="text-left py-3 px-3 font-medium">ID</th><th className="text-left py-3 px-3 font-medium">User A</th><th className="text-left py-3 px-3 font-medium">User B</th><th className="text-left py-3 px-3 font-medium">Score</th><th className="text-left py-3 px-4 font-medium">Reason</th><th className="text-left py-3 px-3 font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {matches.map((m) => (
                      <tr key={m.id} className="border-b border-[var(--warm)]/50 hover:bg-[var(--bark)]/50 transition-colors">
                        <td className="py-3 px-3 text-[var(--text-tertiary)] text-[11px] font-mono">{m.id.slice(0, 8)}</td>
                        <td className="py-3 px-3 text-[var(--cream)] text-[13px]">{m.userAName}</td>
                        <td className="py-3 px-3 text-[var(--cream)] text-[13px]">{m.userBName}</td>
                        <td className="py-3 px-3"><span className="text-[13px] font-[Fraunces]" style={{ color: m.score >= 70 ? 'var(--green)' : m.score >= 50 ? 'var(--sun)' : 'var(--ember)' }}>{m.score}</span></td>
                        <td className="py-3 px-4 text-[var(--text-tertiary)] text-[11px] truncate max-w-[200px]">{m.reason}</td>
                        <td className="py-3 px-3"><span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${m.status === 'completed' ? 'bg-[var(--green)]/15 text-[var(--green)]' : m.status === 'pending' ? 'bg-[var(--sun)]/15 text-[var(--sun)]' : 'bg-[var(--warm)]/50 text-[var(--text-secondary)]'}`}>{m.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Exchanges */}
          <section id="exchanges">
            <h2 className="font-[Fraunces] font-[300] text-lg mb-4">Exchanges</h2>
            {exchanges.length === 0 ? (
              <div className="card rounded-xl p-8 text-center"><p className="text-[var(--text-tertiary)] text-sm">No exchanges.</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--warm)] text-[var(--text-tertiary)] text-[11px] uppercase tracking-[0.08em]">
                    <th className="text-left py-3 px-4 font-medium">Match ID</th><th className="text-left py-3 px-4 font-medium">A</th><th className="text-left py-3 px-4 font-medium">B</th><th className="text-left py-3 px-4 font-medium">Done</th><th className="text-left py-3 px-4 font-medium">When</th>
                  </tr></thead>
                  <tbody>
                    {exchanges.map((e) => (
                      <tr key={e.id} className="border-b border-[var(--warm)]/50 hover:bg-[var(--bark)]/50 transition-colors">
                        <td className="py-3 px-4 text-[var(--text-tertiary)] text-[11px] font-mono">{e.matchId.slice(0, 8)}</td>
                        <td className="py-3 px-4"><span className={`inline-block w-2 h-2 rounded-full ${e.confirmedByA ? 'bg-[var(--green)]' : 'bg-[var(--ember)]'}`} /><span className="text-[var(--text-secondary)] text-[11px] ml-2">{e.confirmedByA ? 'yes' : 'no'}</span></td>
                        <td className="py-3 px-4"><span className={`inline-block w-2 h-2 rounded-full ${e.confirmedByB ? 'bg-[var(--green)]' : 'bg-[var(--ember)]'}`} /><span className="text-[var(--text-secondary)] text-[11px] ml-2">{e.confirmedByB ? 'yes' : 'no'}</span></td>
                        <td className="py-3 px-4"><span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${e.completed ? 'bg-[var(--green)]/15 text-[var(--green)]' : 'bg-[var(--warm)]/50 text-[var(--text-secondary)]'}`}>{e.completed ? 'done' : 'pending'}</span></td>
                        <td className="py-3 px-4 text-[var(--text-tertiary)] text-[11px]">{new Date(e.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* User detail — inbox-style split pane */}
      {selectedUser && (
        <>
          <div className="fixed inset-0 z-30 bg-black/40" role="button" aria-label="Close user details" onClick={() => setSelectedUser(null)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedUser(null); }} tabIndex={0} />

          <div ref={(el) => { /* attach ref for focus */ }} className="fixed top-24 right-0 bottom-0 z-40 w-full max-w-md bg-[var(--bark)] border-l border-[var(--warm)] overflow-y-auto animate-fade-in shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="admin-user-title">
          <div className="sticky top-0 bg-[var(--bark)] border-b border-[var(--warm)] px-6 py-4 flex items-center justify-between">
            <h3 id="admin-user-title" className="font-[Fraunces] font-[300] text-lg">{selectedUser.context.name || 'Anonymous'}</h3>
            <button onClick={() => setSelectedUser(null)} aria-label="Close user details" className="text-[var(--text-tertiary)] hover:text-[var(--cream)] text-xl">&times;</button>
          </div>
            <div className="px-6 py-5 space-y-5" tabIndex={-1}>
              <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">Status</p><span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${selectedUser.status === 'completed' ? 'bg-[var(--green)]/15 text-[var(--green)]' : selectedUser.status === 'matched' ? 'bg-[var(--sun)]/15 text-[var(--sun)]' : 'bg-[var(--warm)]/50 text-[var(--text-secondary)]'}`}>{selectedUser.status}</span></div>
              <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">ID</p><p className="text-[var(--sand)] text-xs font-mono">{selectedUser.id}</p></div>
              <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">Tenant</p><p className="text-[var(--sand)] text-xs font-mono">{selectedUser.tenantId}</p></div>
              {selectedUser.context.location && <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">Location</p><p className="text-[var(--sand)] text-sm">{selectedUser.context.location}</p></div>}
              <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">Bio</p><p className="text-[var(--sand)] text-sm leading-relaxed">&ldquo;{selectedUser.context.bio}&rdquo;</p></div>
              <div><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-1">Member Since</p><p className="text-[var(--sand)] text-xs">{new Date(selectedUser.createdAt).toLocaleDateString()}</p></div>
              <div className="card rounded-xl p-4"><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-2">Offers</p><span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-2 bg-[var(--warm)]/30 text-[var(--sand)]">{selectedUser.offer.domain} · {selectedUser.offer.focusArea}</span><p className="text-[var(--cream)] text-sm leading-relaxed">{selectedUser.offer.description}</p></div>
              <div className="card rounded-xl p-4"><p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.1em] mb-2">Wants</p><span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-2 bg-[var(--warm)]/30 text-[var(--sand)]">{selectedUser.want.domain} · {selectedUser.want.focusArea}</span><p className="text-[var(--cream)] text-sm leading-relaxed">{selectedUser.want.description}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
