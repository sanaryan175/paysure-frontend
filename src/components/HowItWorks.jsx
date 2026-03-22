import { useState } from 'react';

const steps = [
  { num: '01', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>, title: 'Select your tool', desc: 'Choose between Loan Risk, Scam Check, or Agreement Analysis based on your need' },
  { num: '02', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: 'Enter details or upload', desc: 'Fill in your loan terms, paste a suspicious message, or upload a financial document' },
  { num: '03', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, title: 'Get AI-powered insights', desc: 'Receive clear risk scores, red flags, and actionable suggestions in seconds' },
];

function getRisk(ratio) {
  if (ratio < 30) return { level: 'Safe', color: '#1a7a3c', bg: '#f5fdf7', border: '#a7e0be', tagBg: '#f0faf3' };
  if (ratio < 45) return { level: 'Moderate', color: '#b8942a', bg: '#fffdf0', border: '#e8d48a', tagBg: '#fdf8ec' };
  return { level: 'High Risk', color: '#b83232', bg: '#fff8f5', border: '#f5c0b0', tagBg: '#fdf0f0' };
}

export default function HowItWorks() {
  const [income, setIncome] = useState(35000);
  const [emi, setEmi] = useState(12000);
  const [tenure, setTenure] = useState(24);

  const ratio = income > 0 ? Math.round((emi / income) * 100) : 0;
  const total = (emi * tenure).toLocaleString('en-IN');
  const risk = getRisk(ratio);

  return (
    <section id='how-it-works' style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-12 py-20">

        <div className="text-center mb-14">
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-mid)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Process</p>
          <h2 style={{ fontSize: '34px', letterSpacing: '-1px' }}>Simple, guided risk analysis</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '10px' }}>Get clear insights in three easy steps</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-10 mb-14">
          {steps.map(s => (
            <div key={s.num}>
              <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                style={{ width: '52px', height: '52px', background: 'var(--gold-pale)', border: '1.5px solid var(--gold-border)', borderRadius: '15px' }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10.5px', fontWeight: 500, color: 'var(--gold-mid)', letterSpacing: '1px', marginBottom: '10px' }}>{s.num}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Calculator */}
        <div className="rounded-2xl p-7 max-w-2xl mx-auto"
          style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-warm)' }}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold-mid)' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Try it live — Loan Risk Calculator
            </span>
          </div>

          {[
            ['Monthly Income (₹)', income, setIncome],
            ['Monthly EMI (₹)', emi, setEmi],
            ['Tenure (months)', tenure, setTenure],
          ].map(([label, val, setter]) => (
            <div key={label} className="flex items-center gap-4 mb-3.5">
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', width: '150px', flexShrink: 0 }}>{label}</span>
              <input
                type="number"
                value={val}
                onChange={e => setter(Number(e.target.value))}
                style={{ flex: 1, height: '40px', border: '1.5px solid var(--border-mid)', borderRadius: '9px', padding: '0 13px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: '#fff', transition: 'border .15s' }}
                onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
              />
            </div>
          ))}

          <div className="rounded-2xl p-5 flex justify-between items-center mt-2 transition-all"
            style={{ background: risk.bg, border: `1.5px solid ${risk.border}` }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>EMI-to-Income Ratio</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>Total repayment: ₹{total}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '26px', fontWeight: 600, color: risk.color }}>{ratio}%</div>
              <div style={{ fontSize: '11px', fontWeight: 700, padding: '4px 13px', borderRadius: '20px', marginTop: '4px', background: risk.tagBg, color: risk.color }}>
                {risk.level}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
