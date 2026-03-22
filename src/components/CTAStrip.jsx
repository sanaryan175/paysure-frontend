export default function CTAStrip() {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden text-center px-4 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-[72px]"
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(212,175,55,0.1)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}>

      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold-mid), transparent)' }}
      />

      <div className="relative max-w-3xl mx-auto" style={{ zIndex: 1 }}>
        <h2 className="text-[clamp(1.5rem,5vw,2.375rem)] leading-tight tracking-tight mb-6 sm:mb-7" style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          color: '#f5f0e8',
          letterSpacing: '-1.2px',
        }}>
          Still unsure? Analyze your risk<br className="hidden sm:block" />{' '}
          before making{' '}
          <span style={{ color: 'var(--gold-light)' }}>a decision.</span>
        </h2>

        <button
          onClick={scrollToFeatures}
          style={{
            background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))',
            color: '#fff',
            border: 'none',
            borderRadius: '11px',
            padding: '14px 34px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(201,162,39,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
          Start Analysis
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  );
}