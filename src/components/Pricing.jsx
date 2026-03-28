import { useNavigate, useLocation } from 'react-router-dom';

const perks = [
  'Unlimited loan risk analysis',
  'Scam and offer detection',
  'Agreement and document analysis',
  'No credit card required',
];

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStart = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  return (
    <section id='pricing' style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Pricing</p>
          <h2 className="text-[clamp(1.5rem,4vw,2.125rem)] tracking-tight" style={{ letterSpacing: '-1px', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>Simple, transparent pricing</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '10px' }}>100% free to use, forever</p>
        </div>

        <div className="max-w-md mx-auto rounded-2xl p-6 sm:p-10 text-center"
          style={{ background: '#fff', border: '2px solid var(--gold-border)', boxShadow: '0 8px 32px rgba(201,162,39,0.08)' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 'clamp(2.5rem,12vw,3.5rem)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>₹0</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Free Forever</div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.5 }}>
            ₹0 today. Could save you ₹50,000 tomorrow.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '28px', textAlign: 'left' }}>
            {perks.map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <div style={{ width: '22px', height: '22px', background: 'var(--gold-pale)', border: '1px solid var(--gold-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: '14.5px', color: 'var(--text-faint)' }}>{p}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '11px', padding: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,162,39,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            Start Now — It's Free
          </button>
        </div>
      </div>
    </section>
  );
}