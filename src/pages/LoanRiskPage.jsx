
import { useState } from 'react';
import StepIndicator    from '../components/loan/StepIndicator.jsx';
import Step1Financial   from '../components/loan/Step1Financial.jsx';
import Step2LoanDetails from '../components/loan/Step2LoanDetails.jsx';
import Step3Upload      from '../components/loan/Step3Upload.jsx';
import LoanResult       from '../components/loan/LoanResult.jsx';
import { analyzeLoan }  from '../services/loanService.js';
 
const initialForm = {
  monthlyIncome: '', monthlyExpenses: '', existingEMIs: '',
  savings: '', jobType: '',
  loanAmount: '', interestRate: '', tenureMonths: '',
  _hasDocument: false,
};
 
const validateStep = (step, form) => {
  const errors = {};
 
  if (step === 1) {
    if (!form.monthlyIncome  || Number(form.monthlyIncome)  <= 0) errors.monthlyIncome  = 'Required';
    if (form.monthlyExpenses === '' || Number(form.monthlyExpenses) < 0) errors.monthlyExpenses = 'Required';
    if (form.savings === '' || Number(form.savings) < 0) errors.savings = 'Required';
    if (!form.jobType) errors.jobType = 'Please select job type';
  }
 
  if (step === 2) {
    // If user has a document — all fields optional
    // If no document — loan amount and rate required for simulation
    if (!form._hasDocument) {
      if (!form.loanAmount   || Number(form.loanAmount)   <= 0) errors.loanAmount   = 'Required for simulation';
      if (!form.interestRate || Number(form.interestRate) <= 0) errors.interestRate  = 'Required for simulation';
      if (!form.tenureMonths || Number(form.tenureMonths) <= 0) errors.tenureMonths  = 'Required for simulation';
    }
  }
 
  return errors;
};
 
export default function LoanRiskPage() {
  const [step,       setStep]       = useState(1);
  const [form,       setForm]       = useState(initialForm);
  const [file,       setFile]       = useState(null);
  const [errors,     setErrors]     = useState({});
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState(null);
  const [apiError,   setApiError]   = useState(null);
  const [mismatch,   setMismatch]   = useState(null); // mismatch detection
 
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };
 
  const handleNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };
 
  const handleBack = () => { setErrors({}); setStep(s => s - 1); };
 
  // Check for mismatch between manual entry and document extracted values
  const checkMismatch = (responseData) => {
    if (!responseData.documentUploaded) return null;
    const mismatches = [];
 
    // If user entered loan amount and doc found different one
    if (form.loanAmount && responseData.interestRateFound) {
      const docRate = parseFloat(responseData.interestRateFound);
      const userRate = parseFloat(form.interestRate);
      if (!isNaN(docRate) && !isNaN(userRate) && Math.abs(docRate - userRate) > 1) {
        mismatches.push(`Interest rate: you entered ${userRate}% but document shows ${docRate}%`);
      }
    }
    return mismatches.length > 0 ? mismatches : null;
  };
 
  const handleSubmit = async () => {
    setLoading(true);
    setApiError(null);
    setMismatch(null);
 
    try {
      const fd = new FormData();
 
      // Append financial fields — always required
      fd.append('monthlyIncome',   form.monthlyIncome);
      fd.append('monthlyExpenses', form.monthlyExpenses);
      fd.append('existingEMIs',    form.existingEMIs || '0');
      fd.append('savings',         form.savings);
      fd.append('jobType',         form.jobType);
 
      // Append loan fields only if filled
      if (form.loanAmount)   fd.append('loanAmount',   form.loanAmount);
      if (form.interestRate) fd.append('interestRate', form.interestRate);
      if (form.tenureMonths) fd.append('tenureMonths', form.tenureMonths);
 
      // Flag if doc-only mode
      if (form._hasDocument && !form.loanAmount) fd.append('loanDetailsFromDoc', 'true');
 
      if (file) fd.append('document', file);
 
      const res = await analyzeLoan(fd);
 
      // Check for mismatches
      const mismatches = checkMismatch(res.data);
      if (mismatches) setMismatch(mismatches);
 
      setResult(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
      setApiError(msg);
      console.error('Loan analysis error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleReset = () => {
    setStep(1);
    setForm(initialForm);
    setFile(null);
    setErrors({});
    setResult(null);
    setApiError(null);
    setMismatch(null);
  };
 
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-2xl mx-auto">
 
        {!result && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4 uppercase tracking-wide"
              style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)', color: 'var(--gold-deep)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold-mid)' }} />
              Loan Risk Analyzer
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '32px', letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: '1.1' }}>
              Loan Affordability &amp;<br />Risk Analyzer
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '10px' }}>
              Find out if this loan fits your financial capacity — and whether the terms are fair.
            </p>
          </div>
        )}
 
        {result ? (
          <>
            {/* Mismatch warning */}
            {mismatch && (
              <div className="rounded-xl p-4 mb-5 flex items-start gap-2"
                style={{ background: '#fff8ec', border: '1.5px solid var(--gold-border)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: '1px' }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-deep)', marginBottom: '6px' }}>
                    Mismatch detected between your entries and document:
                  </p>
                  {mismatch.map((m, i) => (
                    <p key={i} style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>• {m}</p>
                  ))}
                </div>
              </div>
            )}
            <LoanResult data={result} onReset={handleReset} />
          </>
        ) : (
          <div className="rounded-2xl p-8"
            style={{ background: '#fff', border: '1.5px solid var(--border-warm)', boxShadow: '0 4px 24px rgba(28,26,23,0.05)' }}>
 
            <StepIndicator currentStep={step} />
 
            {step === 1 && (
              <Step1Financial data={form} errors={errors} onChange={handleChange} />
            )}
            {step === 2 && (
              <Step2LoanDetails
                data={form}
                errors={errors}
                onChange={handleChange}
              />
            )}
            {step === 3 && (
              <Step3Upload
                file={file}
                onFileChange={setFile}
                hasDocument={form._hasDocument}
                loanData={{ loanAmount: form.loanAmount, interestRate: form.interestRate, tenureMonths: form.tenureMonths }}
              />
            )}
 
            {/* API error */}
            {apiError && (
              <div className="mt-4 rounded-xl p-3.5 text-sm font-medium flex items-start gap-2"
                style={{ background: 'var(--red-pale)', border: '1px solid var(--red-border)', color: 'var(--red)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: '1px' }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {apiError}
              </div>
            )}
 
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6"
              style={{ borderTop: '1px solid var(--border-light)' }}>
 
              {step > 1 ? (
                <button onClick={handleBack}
                  style={{ background: 'transparent', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', borderRadius: '11px', padding: '10px 20px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)'; }}>
                  ← Back
                </button>
              ) : <div />}
 
              {step < 3 ? (
                <button onClick={handleNext}
                  style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '11px', padding: '10px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(201,162,39,0.28)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  Continue →
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Skip document option */}
                  {!file && (
                    <button onClick={handleSubmit}
                      disabled={loading}
                      style={{ background: 'transparent', border: '1.5px solid var(--border-mid)', color: 'var(--text-faint)', borderRadius: '11px', padding: '10px 18px', fontSize: '13px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                      Skip & Analyze →
                    </button>
                  )}
                  <button onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      background: loading ? '#e0dbd0' : 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))',
                      color: '#fff', border: 'none', borderRadius: '11px', padding: '10px 28px',
                      fontSize: '14px', fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'DM Sans, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '8px',
                    }}>
                    {loading ? (
                      <>
                        <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                          <path d="M21 12a9 9 0 00-9-9"/>
                        </svg>
                        Analyzing...
                      </>
                    ) : file ? 'Analyze with Document →' : 'Analyze Loan →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
 