import { useState } from 'react';
import FormField, { Input } from './FormField.jsx';

export default function Step2LoanDetails({ data, errors, onChange, onToggleHasDoc }) {
  const [hasDocument, setHasDocument] = useState(data._hasDocument || false);

  const handleToggle = (val) => {
    setHasDocument(val);
    onChange('_hasDocument', val);
    if (onToggleHasDoc) onToggleHasDoc(val);
  };

  // Live EMI preview
  const emi = (() => {
    const p = parseFloat(data.loanAmount);
    const r = parseFloat(data.interestRate) / 12 / 100;
    const n = parseInt(data.tenureMonths);
    if (!p || !r || !n) return null;
    const val = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(val).toLocaleString('en-IN');
  })();

  return (
    <div>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.4px', marginBottom: '6px' }}>
        Loan Details
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '22px' }}>
        Enter the loan you are considering.
      </p>

      {/* Toggle — do you have a document? */}
      <div className="rounded-2xl p-4 mb-6" style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-warm)' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '12px' }}>
          Do you have a loan document to upload?
        </p>
        <div className="flex gap-3">
          {[
            { val: false, label: "No — I'm just exploring", icon: '🔍' },
            { val: true,  label: 'Yes — I have a document', icon: '📄' },
          ].map(({ val, label, icon }) => (
            <button
              key={String(val)}
              onClick={() => handleToggle(val)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer',
                transition: 'all .15s',
                border: hasDocument === val
                  ? '1.5px solid var(--gold-mid)'
                  : '1.5px solid var(--border-mid)',
                background: hasDocument === val ? 'var(--gold-pale)' : '#fff',
                color: hasDocument === val ? 'var(--gold-deep)' : 'var(--text-faint)',
              }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Context hint based on choice */}
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
          {hasDocument
            ? 'You can leave fields blank — we will auto-fill from your document in the next step.'
            : 'Fill in the loan details below for a simulation analysis.'}
        </p>
      </div>

      {/* Loan fields — optional hint if has document */}
      {hasDocument && (
        <div className="rounded-xl px-4 py-3 mb-5 flex gap-2 items-center"
          style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: '12.5px', color: '#1d4ed8', fontWeight: 500 }}>
            Fields below are optional — your document will fill them automatically. Or enter values to compare.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-5">
        <FormField
          label="Loan Amount"
          hint={hasDocument ? '(optional)' : ''}
          error={errors.loanAmount}>
          <Input
            prefix="₹"
            type="number"
            placeholder="e.g. 500000"
            value={data.loanAmount}
            onChange={e => onChange('loanAmount', e.target.value)}
          />
        </FormField>

        <FormField
          label="Interest Rate"
          hint={hasDocument ? '(optional) per annum' : 'per annum'}
          error={errors.interestRate}>
          <Input
            type="number"
            placeholder="e.g. 12.5"
            value={data.interestRate}
            onChange={e => onChange('interestRate', e.target.value)}
          />
        </FormField>

        <FormField
          label="Tenure"
          hint={hasDocument ? '(optional) in months' : 'in months'}
          error={errors.tenureMonths}>
          <Input
            type="number"
            placeholder="e.g. 36"
            value={data.tenureMonths}
            onChange={e => onChange('tenureMonths', e.target.value)}
          />
        </FormField>
      </div>

      {/* Live EMI preview */}
      {emi && (
        <div className="rounded-2xl p-4 mt-2 flex items-center justify-between"
          style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>
              Estimated Monthly EMI
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Based on values above
            </p>
          </div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '22px', fontWeight: 600, color: 'var(--gold-deep)' }}>
            ₹{emi}
          </span>
        </div>
      )}
    </div>
  );
}