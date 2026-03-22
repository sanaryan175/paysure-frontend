import { useRef } from 'react';

const ACCEPTED = '.pdf,.docx,.doc';
const ACCEPTED_MIME = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export default function Step3Upload({ file, onFileChange, hasDocument, loanData }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;
    if (ACCEPTED_MIME.includes(dropped.type) || /\.(pdf|docx|doc)$/i.test(dropped.name)) {
      onFileChange(dropped);
    } else {
      alert('Please upload a PDF or Word document (.pdf, .docx, .doc)');
    }
  };

  // Check if user entered loan details manually
  const hasManualData = loanData?.loanAmount || loanData?.interestRate || loanData?.tenureMonths;

  return (
    <div>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.4px', marginBottom: '6px' }}>
        Upload Loan Document
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '22px' }}>
        {hasDocument
          ? 'Upload your sanction letter, loan agreement, or offer document for full risk analysis.'
          : 'Optional — upload a document for deeper contract risk detection.'}
      </p>

      {/* Smart hint based on Step 2 state */}
      {hasDocument && !hasManualData && (
        <div className="rounded-xl px-4 py-3 mb-5 flex gap-2 items-start"
          style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-border)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2"
            style={{ flexShrink: 0, marginTop: '2px' }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span style={{ fontSize: '12.5px', color: 'var(--gold-deep)', fontWeight: 500, lineHeight: '1.5' }}>
            You skipped loan details — we will auto-extract loan amount, interest rate, and tenure from your document.
          </span>
        </div>
      )}

      {hasDocument && hasManualData && (
        <div className="rounded-xl px-4 py-3 mb-5 flex gap-2 items-start"
          style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"
            style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: '12.5px', color: '#1d4ed8', fontWeight: 500, lineHeight: '1.5' }}>
            We will compare your entered values with the document — and flag any mismatches.
          </span>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="rounded-2xl flex flex-col items-center justify-center py-12 cursor-pointer transition-all"
        style={{
          border:     `2px dashed ${file ? 'var(--gold-mid)' : 'var(--border-mid)'}`,
          background:  file ? 'var(--gold-pale)' : 'var(--bg-page)',
        }}>
        {file ? (
          <>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'var(--gold-pale)', border: '1.5px solid var(--gold-border)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold-deep)' }}>{file.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {(file.size / 1024).toFixed(0)} KB · Click to change
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'var(--bg-cream)', border: '1.5px solid var(--border-warm)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
              </svg>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-faint)' }}>
              Drop file here or click to browse
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              PDF or Word document · Max 10MB
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={e => { if (e.target.files[0]) onFileChange(e.target.files[0]); }}
      />

      {/* Remove file */}
      {file && (
        <button
          onClick={e => { e.stopPropagation(); onFileChange(null); }}
          style={{ width: '100%', marginTop: '10px', fontSize: '12.5px', fontWeight: 600, padding: '8px', borderRadius: '10px', color: 'var(--red)', background: 'var(--red-pale)', border: '1px solid var(--red-border)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          Remove file
        </button>
      )}

      {/* Skip note */}
      {!hasDocument && (
        <p style={{ fontSize: '12px', textAlign: 'center', color: 'var(--text-muted)', marginTop: '14px' }}>
          You can skip this step — we will analyze your financial capacity only.
        </p>
      )}
    </div>
  );
}