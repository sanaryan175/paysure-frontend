const verdictConfig = {
  'Safe':          { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be', emoji: '✅' },
  'Needs Caution': { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a', emoji: '⚠️' },
  'High Risk':     { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0', emoji: '🔴' },
  'Scam Alert':    { color: '#7c0000', bg: '#fff0f0', border: '#ff9999', emoji: '🚨' },
};

const nextStepConfig = {
  'Review Carefully Before Signing': { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0', icon: '🔍' },
  'Clarify Terms Before Signing':    { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a', icon: '💬' },
  'Consider Alternatives First':     { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a', icon: '🔄' },
  'Appears Safe to Proceed':         { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be', icon: '✅' },
};

const personalRiskColor = {
  'Low': '#1a7a3c', 'Medium': '#b8942a',
  'High': '#b83232', 'Very High': '#7c0000', 'Not Assessed': '#a09880',
};

function ScoreBar({ score }) {
  const pct   = (score / 10) * 100;
  const color = score <= 3 ? '#1a7a3c' : score <= 6 ? '#b8942a' : '#b83232';
  const label = score <= 3 ? 'Low Risk' : score <= 6 ? 'Moderate Risk' : score <= 8 ? 'High Risk' : 'Dangerous';
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>RISK SCORE</span>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '12px', color, fontWeight: 600 }}>{label}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '18px', fontWeight: 700, color }}>
            {score}<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/10</span>
          </span>
        </div>
      </div>
      <div style={{ height: '7px', borderRadius: '99px', background: 'var(--border-light)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '99px' }} />
      </div>
    </div>
  );
}

function ImpactRow({ label, term, impact }) {
  if (!term || ['Not found','Not specified','N/A','None'].includes(term)) return null;
  return (
    <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: impact ? '7px' : 0 }}>{term}</div>
      {impact && (
        <div className="flex gap-1.5 items-start pt-1" style={{ borderTop: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '13px', marginTop: '1px' }}>💸</span>
          <p style={{ fontSize: '14px', color: '#b83232', fontWeight: 600, lineHeight: '1.5' }}>{impact}</p>
        </div>
      )}
    </div>
  );
}

export default function AgreementResult({ data, onReset }) {
  const vc     = verdictConfig[data.verdict]    || verdictConfig['Needs Caution'];
  const nsc    = nextStepConfig[data.finalAction]    || nextStepConfig['Review Carefully Before Signing'];
  const isScam = data.verdict === 'Scam Alert';
  const hasRisks = data.criticalRisks?.length > 0 || data.mediumRisks?.length > 0 || data.softSignals?.length > 0;

  return (
    <div className="w-full max-w-[780px] mx-auto min-w-0 px-1 sm:px-0">

      {/* ── 1. VERDICT HEADER ── */}
      <div className="rounded-2xl p-4 sm:p-6 mb-5" style={{ background: vc.bg, border: `2px solid ${vc.border}` }}>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl shrink-0" aria-hidden>{vc.emoji}</span>
              <div className="min-w-0">
                <div style={{ fontSize: '12px', fontWeight: 700, color: vc.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Document Verdict
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-[clamp(1.25rem,4vw,1.625rem)] break-words" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: vc.color, letterSpacing: '-0.5px' }}>
                    {data.verdict}
                  </span>
                  <span className="shrink-0" style={{ fontSize: '12px', fontWeight: 700, padding: '3px 12px', borderRadius: '99px', background: '#fff', border: `1px solid ${vc.border}`, color: vc.color }}>
                    {data.confidence}% confident
                  </span>
                </div>
              </div>
            </div>

            {/* VERDICT STATEMENT — aggressive decisive line */}
            {data.verdictStatement && (
              <div className="rounded-xl px-4 py-3 mb-4"
                style={{ background: '#fff', border: `1.5px solid ${vc.border}` }}>
                <p style={{ fontSize: '16px', fontWeight: 800, color: vc.color, lineHeight: '1.5', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
                  {data.verdictStatement}
                </p>
              </div>
            )}

            {data.verdictScore && <ScoreBar score={data.verdictScore} />}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <p style={{ fontSize: '15px', color: 'var(--text-faint)', lineHeight: '1.7', marginTop: '14px' }}>
            {data.summary}
          </p>
        )}
      </div>

      {/* ── 2. RECOMMENDATION ── */}
      {data.recommendation && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
            What You Should Do
          </div>
          <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', marginBottom: '6px' }}>
            {data.recommendation}
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-faint)', lineHeight: '1.65' }}>
            {data.recommendationReason}
          </p>
        </div>
      )}

      {/* ── 3. PERSONALIZED RISK ── */}
      {data.hasFinancialProfile && data.personalizedVerdict && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Risk For You Specifically
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, padding: '3px 14px', borderRadius: '99px', background: 'var(--bg-page)', border: '1px solid var(--border-light)', color: personalRiskColor[data.personalizedRisk] || 'var(--text-muted)' }}>
              {data.personalizedRisk} Risk
            </span>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-faint)', lineHeight: '1.65', fontWeight: 500 }}>
            {data.personalizedVerdict}
          </p>
        </div>
      )}

      {/* ── 4. BENCHMARK ── */}
      {data.benchmark && (
        <div className="rounded-2xl p-4 mb-5 flex gap-3 items-start" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>📊</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Market Comparison</div>
            <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.6' }}>{data.benchmark}</p>
          </div>
        </div>
      )}

      {/* ── 5. KEY TERMS IN IMPACT LANGUAGE ── */}
      {!isScam && (data.interestRate || data.processingFee || data.lateFee || data.prepaymentPenalty || data.loanAmount || data.tenure) && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              What This Means For You
            </div>
            {data.documentType && (
              <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 12px', borderRadius: '99px', background: 'var(--gold-pale)', border: '1px solid var(--gold-border)', color: 'var(--gold-deep)' }}>
                {data.documentType}
              </span>
            )}
          </div>
          <ImpactRow label="Interest Rate"      term={data.interestRate}      impact={data.interestImpact} />
          <ImpactRow label="Processing Fee"     term={data.processingFee}     impact={data.processingImpact} />
          <ImpactRow label="Late Payment"       term={data.lateFee}           impact={data.lateFeeImpact} />
          <ImpactRow label="Prepayment Penalty" term={data.prepaymentPenalty} impact={null} />
          <ImpactRow label="Loan Amount"        term={data.loanAmount}        impact={null} />
          <ImpactRow label="Tenure"             term={data.tenure}            impact={null} />
        </div>
      )}

      {/* ── 6. SCAM EMERGENCY ── */}
      {isScam && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff0f0', border: '2px solid #ff4444' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#7c0000', marginBottom: '12px' }}>🚨 Immediate Actions</div>
          {data.suggestions?.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2.5" style={{ fontSize: '14.5px', color: '#7c0000' }}>
              <span style={{ fontWeight: 700 }}>{i + 1}.</span> {s}
            </div>
          ))}
        </div>
      )}

      {/* ── 7. RISK BREAKDOWN ── */}
      {!isScam && hasRisks && (
        <div className="mb-5">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Risk Breakdown
          </div>
          {data.criticalRisks?.length > 0 && (
            <div className="rounded-2xl p-5 mb-3" style={{ background: '#fdf0f0', border: '1.5px solid #f5c0b0' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#b83232', marginBottom: '12px' }}>
                🚨 Critical Risks — Direct financial loss
              </div>
              {data.criticalRisks.map((r, i) => (
                <div key={i} className="flex gap-2.5 mb-3 last:mb-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#b83232' }} />
                  <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{r}</p>
                </div>
              ))}
            </div>
          )}
          {data.mediumRisks?.length > 0 && (
            <div className="rounded-2xl p-5 mb-3" style={{ background: '#fdf8ec', border: '1.5px solid #e8d48a' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#b8942a', marginBottom: '12px' }}>
                ⚠️ Medium Risks — Unfavorable terms
              </div>
              {data.mediumRisks.map((r, i) => (
                <div key={i} className="flex gap-2.5 mb-3 last:mb-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#b8942a' }} />
                  <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{r}</p>
                </div>
              ))}
            </div>
          )}
          {data.softSignals?.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: '#f5f2eb', border: '1.5px solid #e0dbd0' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#7a7060', marginBottom: '12px' }}>
                🟡 Soft Signals — Vague or one-sided
              </div>
              {data.softSignals.map((r, i) => (
                <div key={i} className="flex gap-2.5 mb-3 last:mb-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#a09880' }} />
                  <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 8. WHAT CAN GO WRONG ── */}
      {!isScam && data.whatCanGoWrong?.length > 0 && (
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

      {/* ── 9. SUGGESTIONS ── */}
      {!isScam && data.suggestions?.length > 0 && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: '#f5fdf7', border: '1.5px solid #a7e0be' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a7a3c', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Before You Sign — Do This
          </div>
          {data.suggestions.map((s, i) => (
            <div key={i} className="flex gap-2.5 mb-3 last:mb-0">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#1a7a3c' }} />
              <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{s}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── 10. NEXT STEPS SECTION ── */}
      <div className="rounded-2xl p-6 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>

        {/* Status banner */}
        {data.finalAction && (
          <div className="rounded-xl px-4 py-3 mb-5 flex items-center gap-3"
            style={{ background: nsc.bg, border: `1.5px solid ${nsc.border}` }}>
            <span style={{ fontSize: '18px' }}>{nsc.icon}</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: nsc.color, fontFamily: 'Syne, sans-serif' }}>
              {data.finalAction}
            </span>
          </div>
        )}

        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
          Recommended Next Steps
        </div>

        {/* AI-generated next steps */}
        {(data.nextSteps?.length > 0 ? data.nextSteps : data.suggestions)?.map((step, i) => (
          <div key={i} className="flex gap-3 mb-4 last:mb-0">
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gold-pale)', border: '1.5px solid var(--gold-border)', fontSize: '12px', fontWeight: 700, color: 'var(--gold-deep)', marginTop: '1px' }}>
              {i + 1}
            </div>
            <p style={{ fontSize: '14.5px', color: 'var(--text-faint)', lineHeight: '1.7' }}>{step}</p>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="rounded-xl px-4 py-3 mt-5"
          style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
             📋 PaySure analyzes document terms and highlights potential risks to help you make a more informed decision. For complex agreements or large loan amounts, we recommend discussing the findings with a financial advisor.
          </p>
        </div>
      </div>

      {/* Analyze another */}
      <div className="text-center mb-2">
        <button onClick={onReset}
          style={{ padding: '11px 28px', borderRadius: '11px', background: 'var(--bg-page)', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)'; }}>
          Analyze Another Document
        </button>
      </div>

    </div>
  );
}