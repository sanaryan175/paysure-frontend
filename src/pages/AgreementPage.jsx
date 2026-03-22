import { useState, useRef } from 'react';
import AgreementResult from '../components/agreement/AgreementResult.jsx';
import api from '../services/api.js';

const ACCEPTED_MIME = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

const Input = ({ prefix, ...props }) => (
  <div style={{ position: 'relative' }}>
    {prefix && (
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
        {prefix}
      </span>
    )}
    <input {...props}
      style={{ width: '100%', height: '42px', border: '1.5px solid var(--border-mid)', borderRadius: '10px', padding: prefix ? '0 12px 0 28px' : '0 12px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: '#faf8f4', transition: 'border .15s', ...(props.style || {}) }}
      onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
      onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
    />
  </div>
);

export default function AgreementPage() {
  const [step,        setStep]        = useState(1);
  const [profile,     setProfile]     = useState({ monthlyIncome: '', monthlyExpenses: '', existingEMIs: '', savings: '', jobType: '' });
  const [skipProfile, setSkipProfile] = useState(false);
  const [file,        setFile]        = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [result,      setResult]      = useState(null);
  const [error,       setError]       = useState('');
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (ACCEPTED_MIME.includes(f.type) || /\.(pdf|docx|doc)$/i.test(f.name)) {
      setFile(f); setError('');
    } else {
      setError('Please upload a PDF or Word document.');
    }
  };

  const handleSubmit = async () => {
    if (!file) { setError('Please upload a document.'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('document', file);
      if (!skipProfile && profile.monthlyIncome) {
        Object.entries(profile).forEach(([k, v]) => { if (v) fd.append(k, v); });
      }
      const res = await api.post('/agreement/analyze', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1); setProfile({ monthlyIncome: '', monthlyExpenses: '', existingEMIs: '', savings: '', jobType: '' });
    setSkipProfile(false); setFile(null); setResult(null); setError('');
  };

  if (result) return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="w-full max-w-[780px] mx-auto min-w-0">
        <AgreementResult data={result} onReset={handleReset} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-2xl mx-auto w-full min-w-0">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4 uppercase tracking-wide"
            style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)', color: 'var(--gold-deep)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold-mid)' }} />
            Agreement Risk Analyzer
          </div>
          <h1 className="text-[clamp(1.5rem,5vw,2rem)]" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: '1.1', marginBottom: '10px' }}>
            Know what you're signing
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.65', maxWidth: '440px', margin: '0 auto' }}>
            Upload any financial document and get a plain English risk breakdown — personalized to your financial situation.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-8 px-1">
          {[{ n: 1, label: 'Your Profile' }, { n: 2, label: 'Upload Document' }].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, background: step >= n ? 'var(--gold-mid)' : 'var(--bg-cream)', color: step >= n ? '#fff' : 'var(--text-muted)', border: step >= n ? 'none' : '1.5px solid var(--border-mid)', transition: 'all .2s' }}>
                  {step > n ? '✓' : n}
                </div>
                <span className="text-[11px] sm:text-xs" style={{ fontWeight: 600, color: step >= n ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</span>
              </div>
              {i < 1 && <div className="hidden sm:block w-8 lg:w-10 h-0.5 shrink-0" style={{ background: step > n ? 'var(--gold-mid)' : 'var(--border-mid)', transition: 'all .2s' }} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4 sm:p-8" style={{ background: '#fff', border: '1.5px solid var(--border-warm)', boxShadow: '0 4px 24px rgba(28,26,23,0.05)' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Your Financial Profile
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Optional — we'll tell you if this agreement is safe specifically for your income.
              </p>

              <div className="rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-warm)' }}>
                <div className="min-w-0">
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>
                    {skipProfile ? '🔍 Document-only analysis' : '👤 Personalized analysis'}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {skipProfile ? 'Analyzing document risk only' : 'Fill profile for personalized risk'}
                  </p>
                </div>
                <button onClick={() => setSkipProfile(!skipProfile)} className="self-start sm:self-center shrink-0"
                  style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', background: skipProfile ? 'var(--bg-cream)' : 'var(--gold-pale)', border: `1.5px solid ${skipProfile ? 'var(--border-mid)' : 'var(--gold-border)'}`, color: skipProfile ? 'var(--text-muted)' : 'var(--gold-deep)' }}>
                  {skipProfile ? 'Add Profile' : 'Skip'}
                </button>
              </div>

              {!skipProfile && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: 'monthlyIncome',  label: 'Monthly Income',   placeholder: '50000' },
                    { field: 'monthlyExpenses', label: 'Monthly Expenses', placeholder: '20000' },
                    { field: 'existingEMIs',   label: 'Existing EMIs',    placeholder: '5000'  },
                    { field: 'savings',        label: 'Total Savings',    placeholder: '100000'},
                  ].map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>{label}</label>
                      <Input type="number" prefix="₹" placeholder={placeholder} value={profile[field]} onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Job Type</label>
                    <select value={profile.jobType} onChange={e => setProfile(p => ({ ...p, jobType: e.target.value }))}
                      style={{ width: '100%', height: '42px', border: '1.5px solid var(--border-mid)', borderRadius: '10px', padding: '0 12px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: '#faf8f4', cursor: 'pointer' }}>
                      <option value="">Select job type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="freelance">Freelance</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-stretch sm:justify-end mt-6 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
                <button onClick={() => setStep(2)} className="w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '11px', padding: '11px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(201,162,39,0.28)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Upload Your Document
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Loan agreement, sanction letter, investment offer, or any financial contract.
              </p>

              {/* Accepted document types */}
              <div className="rounded-xl p-4 mb-5" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Accepted Document Types
                </p>
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    ['📄', 'Loan Agreement'],
                    ['📋', 'Sanction Letter'],
                    ['🏠', 'Rental Agreement'],
                    ['📊', 'Investment Offer'],
                    ['🛡️', 'Insurance Policy'],
                    ['💳', 'Credit Card T&C'],
                  ].map(([icon, label]) => (
                    <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-2"
                      style={{ background: '#fff', border: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '14px' }}>{icon}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-faint)', fontWeight: 500 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                {[['🔒', 'Encrypted upload'], ['🗑️', 'Auto-deleted after analysis'], ['👁️', 'Never stored or shared']].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <span style={{ fontSize: '13px' }}>{icon}</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div onClick={() => inputRef.current.click()}
                onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                onDragOver={e => e.preventDefault()}
                className="px-4 py-8 sm:px-6 sm:py-10"
                style={{ borderRadius: '16px', textAlign: 'center', cursor: 'pointer', border: `2px dashed ${file ? 'var(--gold-mid)' : 'var(--border-mid)'}`, background: file ? 'var(--gold-pale)' : 'var(--bg-page)', marginBottom: '12px', transition: 'all .15s' }}>
                {file ? (
                  <><div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-deep)', marginBottom: '4px' }}>{file.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(0)} KB · Click to change</p></>
                ) : (
                  <><div style={{ fontSize: '32px', marginBottom: '8px' }}>📂</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '4px' }}>Drop your document here</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PDF or Word · Max 10MB</p></>
                )}
              </div>

              <input ref={inputRef} type="file" accept=".pdf,.docx,.doc" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

              {file && (
                <button onClick={() => setFile(null)}
                  style={{ width: '100%', marginBottom: '12px', padding: '8px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--red)', background: 'var(--red-pale)', border: '1px solid var(--red-border)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                  Remove file
                </button>
              )}

              {error && (
                <div style={{ background: 'var(--red-pale)', border: '1px solid var(--red-border)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--red)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
                <button onClick={() => setStep(1)} className="w-full sm:w-auto"
                  style={{ background: 'transparent', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', borderRadius: '11px', padding: '10px 20px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)'; }}>
                  ← Back
                </button>
                <button onClick={handleSubmit} disabled={loading || !file} className="w-full sm:w-auto justify-center"
                  style={{ background: (!file || loading) ? '#e0dbd0' : 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '11px', padding: '11px 28px', fontSize: '14px', fontWeight: 700, cursor: (!file || loading) ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {loading ? (
                    <><svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/><path d="M21 12a9 9 0 00-9-9"/></svg>Analyzing...</>
                  ) : 'Analyze Document →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}