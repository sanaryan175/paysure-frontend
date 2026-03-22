export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector('nav');
    const offset = (nav?.offsetHeight ?? 64) + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white"
      style={{ borderBottom: '1px solid var(--border-light)' }}>

      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, var(--gold-mid), var(--gold-light), var(--gold-mid))' }} />
      <div className="absolute pointer-events-none"
        style={{ top: '-60px', right: '-40px', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(224,187,66,0.07) 0%, transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-12 py-24 grid grid-cols-2 gap-16 items-center" style={{ zIndex: 1 }}>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)', fontSize: '11.5px', fontWeight: 700, color: 'var(--gold-deep)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold-mid)', animation: 'pulse 2s infinite' }} />
            Financial Risk Analysis Platform
          </div>

          <h1 style={{ fontSize: '50px', lineHeight: '1.07', letterSpacing: '-2px', color: 'var(--text-primary)', marginBottom: '18px' }}>
            Know the risk<br />before you<br />
            <span style={{ color: 'var(--gold-mid)' }}>commit money.</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', maxWidth: '440px', marginBottom: '34px' }}>
            Evaluate loans, detect scams, and analyze agreements — with clear, AI-driven insights before making any financial decision.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,162,39,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              Start Analysis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="flex gap-9 mt-10 pt-8" style={{ borderTop: '1px solid var(--border-light)' }}>
            {[['10s', 'Avg. analysis time'], ['100%', 'Free to use'], ['3', 'AI-powered tools']].map(([v, l]) => (
              <div key={l}>
                <div className="font-mono text-xl font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'DM Mono, monospace' }}>{v}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Card */}
        <div className="rounded-2xl p-6"
          style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-warm)', boxShadow: '0 4px 24px rgba(28,26,23,0.06)' }}>
          <div className="flex justify-between items-start pb-4 mb-4" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Risk Level</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gold-deep)' }}>Moderate</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Score</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)' }}>6/10</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            {[['Monthly EMI', '₹8,500', false], ['Income Usage', '42%', true]].map(([l, v, warn]) => (
              <div key={l} className="rounded-xl p-3.5" style={{ background: '#fff', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{l}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '22px', fontWeight: 600, color: warn ? 'var(--gold-deep)' : 'var(--text-primary)' }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3.5 flex gap-2.5" style={{ background: '#fffdf0', border: '1px solid var(--gold-border)' }}>
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: '#fdf0b0' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a07820" strokeWidth="3">
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#a07820', marginBottom: '3px' }}>Warning</div>
              <div style={{ fontSize: '12px', color: 'var(--gold-deep)', lineHeight: 1.5 }}>EMI exceeds recommended 40% of monthly income</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}