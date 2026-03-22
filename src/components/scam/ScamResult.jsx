const verdictConfig = {
    'Legitimate':     { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be', emoji: '✅' },
    'Suspicious':     { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a', emoji: '⚠️' },
    'Likely Scam':    { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0', emoji: '🚨' },
    'Confirmed Scam': { color: '#7c0000', bg: '#fff0f0', border: '#ff9999', emoji: '🚨' },
  };
  
  export default function ScamResult({ data, onReset }) {
    const vc = verdictConfig[data.verdict] || verdictConfig['Suspicious'];
    const isScam = data.verdict === 'Likely Scam' || data.verdict === 'Confirmed Scam';
  
    return (
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
  
        {/* ── 1. VERDICT ── */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: vc.bg, border: `2px solid ${vc.border}` }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: vc.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                Scam Analysis Result
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: vc.color }}>
                  {data.verdict}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 12px', borderRadius: '99px', background: '#fff', border: `1px solid ${vc.border}`, color: vc.color }}>
                  {data.confidence}% confident
                </span>
              </div>
              {data.scamType && (
                <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 14px', borderRadius: '99px', background: '#fff', border: `1px solid ${vc.border}`, color: vc.color }}>
                  {data.scamType}
                </span>
              )}
            </div>
            <span style={{ fontSize: '40px' }}>{vc.emoji}</span>
          </div>
  
          {/* Verdict statement */}
          {data.verdictStatement && (
            <div className="rounded-xl px-4 py-3 flex gap-2.5 items-start"
              style={{ background: '#fff', border: `1px solid ${vc.border}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={vc.color} strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text-faint)', lineHeight: '1.6' }}>
                {data.verdictStatement}
              </p>
            </div>
          )}
        </div>
  
        {/* ── 2. WHAT THEY WANT + HOW IT WORKS ── */}
        {isScam && (data.whatTheyWant || data.howItWorks) && (
          <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
              How This Scam Works
            </div>
            {data.whatTheyWant && (
              <div className="rounded-xl p-4 mb-3" style={{ background: '#fdf0f0', border: '1px solid #f5c0b0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#b83232', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What they want from you
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{data.whatTheyWant}</p>
              </div>
            )}
            {data.howItWorks && (
              <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{data.howItWorks}</p>
            )}
          </div>
        )}
  
        {/* ── 3. RED FLAGS ── */}
        {data.redFlags?.length > 0 && (
          <div className="rounded-2xl p-5 mb-5" style={{ background: '#fdf0f0', border: '1.5px solid #f5c0b0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#b83232', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
              🚩 Red Flags Detected
            </div>
            {data.redFlags.map((flag, i) => (
              <div key={i} className="flex gap-2.5 mb-3 last:mb-0">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#b83232' }} />
                <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{flag}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* ── 4. WHAT CAN GO WRONG ── */}
        {data.whatCanGoWrong?.length > 0 && (
          <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff8f5', border: '1.5px solid #f5c0b0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#b83232', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              What Can Go Wrong
            </div>
            {data.whatCanGoWrong.map((item, i) => (
              <div key={i} className="flex gap-3 pb-3 mb-3" style={{ borderBottom: i < data.whatCanGoWrong.length - 1 ? '1px solid #f5c0b0' : 'none' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf0f0', border: '1px solid #f5c0b0', fontSize: '11px', fontWeight: 700, color: '#b83232', marginTop: '2px' }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* ── 5. NEXT STEPS ── */}
        {data.nextSteps?.length > 0 && (
          <div className="rounded-2xl p-5 mb-6" style={{ background: '#f5fdf7', border: '1.5px solid #a7e0be' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a7a3c', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              What To Do Now
            </div>
            {data.nextSteps.map((step, i) => (
              <div key={i} className="flex gap-3 mb-3 last:mb-0">
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8f8ef', border: '1px solid #a7e0be', fontSize: '11px', fontWeight: 700, color: '#1a7a3c', marginTop: '2px' }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{step}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* Summary + reset */}
        {data.summary && (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.65', textAlign: 'center', marginBottom: '20px' }}>
            {data.summary}
          </p>
        )}
        <div className="text-center">
          <button onClick={onReset}
            style={{ padding: '11px 28px', borderRadius: '11px', background: 'var(--bg-page)', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)'; }}>
            Check Another
          </button>
        </div>
      </div>
    );
  }