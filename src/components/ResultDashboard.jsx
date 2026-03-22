export default function ResultDashboard() {
  return (
    <section style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Sample Output</p>
          <h2 className="text-[clamp(1.5rem,4vw,2.125rem)] tracking-tight px-2" style={{ letterSpacing: '-1px', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>See what a risk report looks like</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '10px' }}>Real example of a Loan Risk Analysis result</p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid var(--border-warm)', boxShadow: '0 6px 32px rgba(28,26,23,0.06)' }}>

          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center px-4 sm:px-7 py-4 sm:py-5"
            style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-page)' }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Loan Risk Assessment</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--gold-deep)' }}>Moderate Risk</div>
              </div>
            </div>
            <div className="w-full sm:w-auto text-left sm:text-right">
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Risk Score</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 'clamp(1.5rem,6vw,1.875rem)', fontWeight: 600, color: 'var(--text-primary)' }}>6/10</div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[var(--border-light)]" style={{ borderBottom: '1px solid var(--border-light)' }}>
            {[['Monthly EMI', '₹8,500', false], ['Income Usage', '42%', true], ['Disposable', '₹12,000', false], ['Tenure', '24 mo', false]].map(([l, v, warn]) => (
              <div key={l} className="px-3 sm:px-6 py-4 sm:py-5 min-w-0">
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{l}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 'clamp(1rem,4vw,1.375rem)', fontWeight: 600, color: warn ? 'var(--gold-deep)' : 'var(--text-primary)', wordBreak: 'break-word' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-4 sm:px-6 py-5 md:border-r border-[var(--border-light)]" style={{ background: '#fff8f5' }}>
              <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '13px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                Why this risk?
              </h4>
              {['EMI exceeds recommended 40% threshold', 'Low savings buffer after expenses'].map(pt => (
                <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '13px', color: 'var(--text-faint)', marginBottom: '9px' }}>
                  <span style={{ width: '5px', height: '5px', background: 'var(--red)', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }} />
                  {pt}
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 py-5" style={{ background: '#f5fdf7' }}>
              <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '13px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Suggestions
              </h4>
              {['Reduce loan amount by 20–30%', 'Increase tenure to lower EMI'].map(pt => (
                <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '13px', color: 'var(--text-faint)', marginBottom: '9px' }}>
                  <span style={{ width: '5px', height: '5px', background: 'var(--green)', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }} />
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}