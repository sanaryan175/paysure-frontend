const verdictConfig = {
  'Suitable':      { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be', label: 'Suitable' },
  'Needs Caution': { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a', label: 'Needs Caution' },
  'High Risk':     { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0', label: 'High Risk' },
};

const scoreConfig = {
  Strong:          { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be' },
  Moderate:        { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  Low:             { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  Suitable:        { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be' },
  'Needs Caution': { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  'High Risk':     { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  'Not Analyzed':  { color: '#a09880', bg: '#f5f2eb', border: '#e0dbd0' },
  Okay:            { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  Weak:            { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  Critical:        { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  Medium:          { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  High:            { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
};

function Badge({ label }) {
  const c = scoreConfig[label] || scoreConfig['Needs Caution'];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
      {label}
    </span>
  );
}

function MetricCard({ label, value, meaning, highlight }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '20px', fontWeight: 600, color: highlight || 'var(--text-primary)', marginBottom: meaning ? '4px' : '0' }}>{value}</div>
      {meaning && <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{meaning}</div>}
    </div>
  );
}

export default function LoanResult({ data, onReset }) {
  const vc = verdictConfig[data.overallVerdict] || verdictConfig['Needs Caution'];

  const emiColor   = data.emiToIncomeRatio < 30 ? '#1a7a3c' : data.emiToIncomeRatio < 50 ? '#b8942a' : '#b83232';
  const dispColor  = data.disposableIncome > 0 ? 'var(--text-primary)' : '#b83232';
  const emiMeaning = data.emiToIncomeRatio < 30 ? 'Low burden — safe range' : data.emiToIncomeRatio < 50 ? 'Moderate — watch expenses' : 'Dangerous — above safe limit';
  const dispMeaning = data.disposableIncome > 0 ? 'Available after all costs' : 'You will be in deficit';

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── 1. FINAL DECISION — action-oriented ── */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ background: vc.bg, border: `1.5px solid ${vc.border}` }}>
        <div className="flex items-center justify-between mb-4">
          <div style={{ fontSize: '10px', fontWeight: 700, color: vc.color, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Final Decision
          </div>
          <Badge label={data.overallVerdict} />
        </div>

        {/* Action-oriented statement — THE key addition */}
        <p style={{ fontSize: '16px', fontWeight: 600, color: vc.color, lineHeight: '1.6', marginBottom: '14px', fontFamily: 'Syne, sans-serif' }}>
          {data.finalDecisionStatement || data.overallSummary}
        </p>

        {/* Impact statement with meaning */}
        {data.impactStatement && (
          <div className="rounded-xl px-4 py-3 flex gap-2.5 items-start"
            style={{ background: '#fff', border: `1px solid ${vc.border}` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={vc.color} strokeWidth="2.5"
              style={{ flexShrink: 0, marginTop: '2px' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-faint)', lineHeight: '1.55' }}>
              {data.impactStatement}
            </span>
          </div>
        )}
      </div>

      {/* ── 2. FINANCIAL CAPACITY ── */}
      <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
          Your Financial Capacity
        </div>

        {/* Score badges */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            ['Repayment Capacity', data.capacityScore],
            ['Financial Stress',   data.financialStressLevel],
            ['Emergency Safety',   data.emergencyBufferStatus],
          ].map(([label, val]) => (
            <div key={label} className="rounded-xl p-4 text-center" style={{ border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</div>
              <Badge label={val} />
            </div>
          ))}
        </div>

        {/* Metrics with meaning */}
        <div className="grid grid-cols-4 gap-3">
          <MetricCard
            label="Monthly EMI"
            value={`₹${data.calculatedEMI?.toLocaleString('en-IN')}`}
          />
          <MetricCard
            label="EMI Burden"
            value={`${data.emiToIncomeRatio}%`}
            meaning={emiMeaning}
            highlight={emiColor}
          />
          <MetricCard
            label="Left Per Month"
            value={`₹${data.disposableIncome?.toLocaleString('en-IN')}`}
            meaning={dispMeaning}
            highlight={dispColor}
          />
          <MetricCard
            label="Emergency Buffer"
            value={`${data.emergencyBufferMonths} mo`}
            meaning={data.emergencyBufferMonths < 3 ? 'Below safe minimum' : data.emergencyBufferMonths < 6 ? 'Acceptable range' : 'Well protected'}
          />
        </div>
      </div>

      {/* ── 3. LOAN RISK ANALYSIS ── */}
      {data.documentUploaded ? (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Loan Risk Analysis
            </div>
            <Badge label={data.loanFairnessScore} />
          </div>

          {/* Extracted terms */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {data.interestRateFound && (
              <MetricCard label="Interest Rate"      value={data.interestRateFound} />
            )}
            {data.processingFee && (
              <MetricCard label="Processing Fee"     value={data.processingFee} />
            )}
            {data.prepaymentPenalty && (
              <MetricCard label="Prepayment Penalty" value={data.prepaymentPenalty} />
            )}
          </div>

          {/* Critical Risks */}
          {data.hardRedFlags?.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: '#fdf0f0', border: '1px solid #f5c0b0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#b83232', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
                Critical Risks — Can cause direct financial loss
              </div>
              {data.hardRedFlags.map((f, i) => (
                <div key={i} className="flex gap-2 text-sm mb-1.5" style={{ color: 'var(--text-faint)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b83232' }} />{f}
                </div>
              ))}
            </div>
          )}

          {/* Medium risks */}
          {data.mediumRisks?.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: '#fdf8ec', border: '1px solid #e8d48a' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#b8942a', marginBottom: '10px' }}>
                ⚠️ Medium Risks
              </div>
              {data.mediumRisks.map((f, i) => (
                <div key={i} className="flex gap-2 text-sm mb-1.5" style={{ color: 'var(--text-faint)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b8942a' }} />{f}
                </div>
              ))}
            </div>
          )}

          {/* Soft signals */}
          {data.softSignals?.length > 0 && (
            <div className="rounded-xl p-4" style={{ background: '#f5f2eb', border: '1px solid #e0dbd0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#7a7060', marginBottom: '10px' }}>
                🟡 Soft Signals
              </div>
              {data.softSignals.map((f, i) => (
                <div key={i} className="flex gap-2 text-sm mb-1.5" style={{ color: 'var(--text-faint)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#a09880' }} />{f}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl p-4 mb-5 flex gap-3 items-center"
          style={{ background: 'var(--bg-page)', border: '1px dashed var(--border-mid)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            No document uploaded — upload your loan agreement for complete contract risk analysis.
          </span>
        </div>
      )}

      {/* ── 4. WHAT CAN GO WRONG — THE KEY SECTION ── */}
      {data.whatCanGoWrong?.length > 0 && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#fff8f0', border: '1.5px solid #f5c0b0' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#b83232', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            What Can Go Wrong
          </div>
          {data.whatCanGoWrong.map((item, i) => (
            <div key={i} className="flex gap-3 mb-3 pb-3"
              style={{ borderBottom: i < data.whatCanGoWrong.length - 1 ? '1px solid #f5c0b0' : 'none' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#fdf0f0', border: '1px solid #f5c0b0', fontSize: '10px', fontWeight: 700, color: '#b83232' }}>
                {i + 1}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-faint)', lineHeight: '1.6' }}>{item}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── 5. KEY REASONS + SMART SUGGESTIONS ── */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-2xl p-5" style={{ background: '#f5fdf7', border: '1.5px solid #a7e0be' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a7a3c', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Smart Suggestions
          </div>
          {data.suggestions?.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm mb-2.5" style={{ color: 'var(--text-faint)' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#1a7a3c' }} />{s}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-5" style={{ background: '#fff8f5', border: '1.5px solid #f5c0b0' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#b83232', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            Key Reasons
          </div>
          {data.keyReasons?.map((r, i) => (
            <div key={i} className="flex gap-2 text-sm mb-2.5" style={{ color: 'var(--text-faint)' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b83232' }} />{r}
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Summary numbers ── */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard label="Total Repayment"   value={`₹${data.totalRepayment?.toLocaleString('en-IN')}`}
          meaning={`₹${data.totalInterest?.toLocaleString('en-IN')} is interest cost`} />
        <MetricCard label="Total Interest"    value={`₹${data.totalInterest?.toLocaleString('en-IN')}`}
          meaning="Amount paid above principal" highlight="#b83232" />
      </div>

      {/* Reset */}
      <div className="text-center">
        <button onClick={onReset}
          style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', borderRadius: '11px', padding: '10px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)'; }}>
          Analyze Another Loan
        </button>
      </div>
    </div>
  );
}