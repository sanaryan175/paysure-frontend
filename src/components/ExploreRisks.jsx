const risks = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    title: 'Loan traps',
    desc: 'Hidden EMI burdens and unfair interest rates',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: 'Hidden charges',
    desc: 'Processing fees and unexpected costs',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    title: 'Fake job scams',
    desc: 'Advance fee fraud and fake recruiters',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    title: 'Investment risks',
    desc: 'Unrealistic returns and Ponzi schemes',
  },
];

export default function ExploreRisks() {
  return (
    <section style={{ background: 'var(--navy-950)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--amber-glow)' }}>Risk Education</p>
          <h2 className="text-3xl font-bold" style={{ letterSpacing: '-0.8px', color: 'var(--text-primary)' }}>
            Understand common financial risks
          </h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Learn about risks that affect millions of people
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {risks.map((r) => (
            <div key={r.title}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-200"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)';
                e.currentTarget.style.background = 'var(--surface-2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'var(--surface-1)';
              }}>
              <div className="mb-5">{r.icon}</div>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{r.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{r.desc}</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--amber-glow)' }}>
                Learn more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
