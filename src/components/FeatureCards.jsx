import { useNavigate } from 'react-router-dom';

const features = [
  {
    id: 'loan',
    tag: 'Loan Risk',
    tagIcon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    tagStyle:   { background: '#fdf8ec', color: '#b8942a', border: '1px solid #e8d48a' },
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.7">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    iconStyle:  { background: '#fdf8ec', border: '1.5px solid #e8d48a' },
    topBar:     'linear-gradient(90deg, #c9a227, #e0bb42)',
    title:      'Loan Risk Analyzer',
    desc:       'Know if your loan fits your financial capacity.',
    subline:    'Avoid over-borrowing and hidden financial stress.',
    subStyle:   { background: '#fdf8ec', color: '#b8942a', border: '1px solid #e8d48a' },
    ctaColor:   '#b8942a',
    cta:        'Analyze Loan',
    route:      '/loan-risk',
  },
  {
    id: 'scam',
    tag: 'Scam Detection',
    tagIcon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    tagStyle:   { background: '#fdf0f0', color: '#b83232', border: '1px solid #f5c0b0' },
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b83232" strokeWidth="1.7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    iconStyle:  { background: '#fdf0f0', border: '1.5px solid #f5c0b0' },
    topBar:     'linear-gradient(90deg, #b83232, #e05050)',
    title:      'Scam / Offer Analyzer',
    desc:       'Identify fraud in messages, links, and offers.',
    subline:    'Stay protected from common financial scams.',
    subStyle:   { background: '#fdf0f0', color: '#b83232', border: '1px solid #f5c0b0' },
    ctaColor:   '#b83232',
    cta:        'Check Offer',
    route:      '/scam-check',
  },
  {
    id: 'doc',
    tag: 'Agreement Analysis',
    tagIcon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    tagStyle:   { background: '#f0faf3', color: '#1a7a3c', border: '1px solid #a7e0be' },
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a7a3c" strokeWidth="1.7">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    iconStyle:  { background: '#f0faf3', border: '1.5px solid #a7e0be' },
    topBar:     'linear-gradient(90deg, #1a7a3c, #2da858)',
    title:      'Agreement Risk Analyzer',
    desc:       'Break down complex financial documents instantly.',
    subline:    'Understand hidden terms before you sign anything.',
    subStyle:   { background: '#f0faf3', color: '#1a7a3c', border: '1px solid #a7e0be' },
    ctaColor:   '#1a7a3c',
    cta:        'Review Agreement',
    route:      '/agreement',
  },
];

export default function FeatureCards() {
  const navigate = useNavigate();
  return (
    <section id='features' style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-12 py-20">

        {/* Section header */}
        <div className="text-center mb-12">
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
            What PaySure Does
          </p>
          <h2 style={{ fontSize: '34px', letterSpacing: '-1px' }}>Three tools. One platform.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '10px', lineHeight: '1.65' }}>
            Everything you need to make safer financial decisions — before you sign, transfer, or borrow.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.id}
              className="rounded-2xl relative overflow-hidden"
              style={{
                background: '#fff',
                border: '1.5px solid var(--border-warm)',
                cursor: 'pointer',
                transition: 'all .22s',
                padding: '32px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(201,162,39,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.querySelector('.top-bar').style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-warm)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.querySelector('.top-bar').style.opacity = '0';
              }}>

              {/* Hover top bar */}
              <div className="top-bar absolute top-0 left-0 right-0"
                style={{ height: '3px', background: f.topBar, opacity: 0, transition: 'opacity .22s' }} />

              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full self-start mb-5"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '4px 12px', ...f.tagStyle }}>
                {f.tagIcon}{f.tag}
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center rounded-2xl mb-6"
                style={{ width: '56px', height: '56px', ...f.iconStyle }}>
                {f.icon}
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.4px', lineHeight: '1.2' }}>
                {f.title}
              </h3>

              {/* Desc — what it does */}
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '8px' }}>
                {f.desc}
              </p>

              {/* Spacer pushes subline + CTA to bottom */}
              <div style={{ flex: 1, minHeight: '24px' }} />

              {/* Subline box — why it matters */}
              <div className="rounded-xl mb-6"
                style={{ padding: '12px 16px', fontSize: '13.5px', fontWeight: 600, lineHeight: '1.55', ...f.subStyle }}>
                {f.subline}
              </div>

              {/* CTA */}
              <button
                onClick={() => f.route && navigate(f.route)}
                style={{ fontSize: '13.5px', fontWeight: 700, color: f.ctaColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'DM Sans, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                {f.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}