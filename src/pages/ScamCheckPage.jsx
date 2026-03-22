import { useState, useRef } from 'react';
import ScamResult from '../components/scam/ScamResult.jsx';
import api from '../services/api.js';

const ACCEPTED_MIME = [
  'image/jpeg', 'image/png', 'image/webp',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export default function ScamCheckPage() {
  const [text,    setText]    = useState('');
  const [url,     setUrl]     = useState('');
  const [files,   setFiles]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');
  const inputRef = useRef(null);

  const handleFiles = (newFiles) => {
    const valid = Array.from(newFiles).filter(f =>
      ACCEPTED_MIME.includes(f.type) || /\.(pdf|docx|doc|jpg|jpeg|png|webp)$/i.test(f.name)
    );
    setFiles(prev => [...prev, ...valid].slice(0, 10));
    setError('');
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const getFileIcon = (file) => {
    if (file.type?.startsWith('image/')) return '🖼️';
    if (file.type === 'application/pdf') return '📄';
    return '📝';
  };

  const handleSubmit = async () => {
    if (!text.trim() && !url.trim() && files.length === 0) {
      setError('Please provide at least one input — text, link, or file.'); return;
    }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      if (text.trim()) fd.append('text', text.trim());
      if (url.trim())  fd.append('url',  url.trim());
      files.forEach(f => fd.append('files', f));
      const res = await api.post('/scam-check/analyze', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText(''); setUrl(''); setFiles([]);
    setResult(null); setError('');
  };

  const hasInput = text.trim() || url.trim() || files.length > 0;

  if (result) return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="w-full max-w-[780px] mx-auto min-w-0">
        <ScamResult data={result} onReset={handleReset} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4 uppercase tracking-wide"
            style={{ background: '#fdf0f0', border: '1px solid #f5c0b0', color: '#b83232' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#b83232' }} />
            Scam / Offer Analyzer
          </div>
          <h1 className="text-[clamp(1.5rem,5vw,2rem)]" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: '1.1', marginBottom: '10px' }}>
            Is this a scam?
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.65', maxWidth: '420px', margin: '0 auto' }}>
            Add anything suspicious — paste text, upload screenshots, enter a link. Mix and match for best results.
          </p>
        </div>

        <div className="rounded-2xl p-4 sm:p-8" style={{ background: '#fff', border: '1.5px solid var(--border-warm)', boxShadow: '0 4px 24px rgba(28,26,23,0.05)' }}>

          {/* ── 1. TEXT INPUT ── */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-faint)', marginBottom: '8px' }}>
              <span>📝</span> Paste Message or Offer
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '12px' }}>optional</span>
            </label>
            <textarea
              value={text}
              onChange={e => { setText(e.target.value); setError(''); }}
              placeholder={'Paste suspicious message, offer text, or email content here...\n\nExamples:\n• "Congratulations! You won ₹5 lakh. Click here to claim..."\n• "50% monthly returns guaranteed — invest now"'}
              style={{
                width: '100%', minHeight: '130px', border: '1.5px solid var(--border-mid)',
                borderRadius: '12px', padding: '12px 14px', fontSize: '14px',
                color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif',
                outline: 'none', background: '#faf8f4', resize: 'vertical',
                lineHeight: '1.6', transition: 'border .15s',
              }}
              onFocus={e => e.target.style.borderColor = '#b83232'}
              onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>AND / OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          {/* ── 2. FILE UPLOAD ── */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-faint)', marginBottom: '8px' }}>
              <span>🖼️</span> Upload Screenshots or Documents
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '12px' }}>optional · max 10 files</span>
            </label>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current.click()}
              onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              onDragOver={e => e.preventDefault()}
              style={{
                padding: '20px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
                border: `2px dashed ${files.length > 0 ? '#b83232' : 'var(--border-mid)'}`,
                background: files.length > 0 ? '#fdf0f0' : 'var(--bg-page)',
                marginBottom: files.length > 0 ? '10px' : '0', transition: 'all .15s',
              }}>
              <span style={{ fontSize: '24px' }}>📂</span>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', margin: '6px 0 2px' }}>
                Drop files here or click to browse
              </p>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Screenshots (JPG, PNG) · Documents (PDF, DOCX)
              </p>
            </div>

            <input ref={inputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.docx,.doc"
              style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />

            {/* File chips */}
            {files.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl px-3 py-2"
                    style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)', fontSize: '12.5px' }}>
                    <span>{getFileIcon(file)}</span>
                    <span style={{ color: 'var(--text-faint)', fontWeight: 500, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                    <button onClick={() => removeFile(i)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: '0 2px', lineHeight: 1 }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>AND / OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          {/* ── 3. URL INPUT ── */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-faint)', marginBottom: '8px' }}>
              <span>🔗</span> Paste Suspicious Link
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '12px' }}>optional</span>
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <input type="url" value={url}
                onChange={e => { setUrl(e.target.value); setError(''); }}
                placeholder="https://suspicious-link.xyz/claim-prize"
                style={{
                  width: '100%', height: '44px', border: '1.5px solid var(--border-mid)',
                  borderRadius: '10px', padding: '0 14px 0 40px', fontSize: '14px',
                  color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif',
                  outline: 'none', background: '#faf8f4', transition: 'border .15s',
                }}
                onFocus={e => e.target.style.borderColor = '#b83232'}
                onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
              />
            </div>
          </div>

          {/* What's loaded summary */}
          {hasInput && (
            <div className="rounded-xl px-4 py-3 mb-4 flex items-center gap-2"
              style={{ background: '#fdf0f0', border: '1px solid #f5c0b0' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b83232" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontSize: '13px', color: '#b83232', fontWeight: 600 }}>
                Ready to analyze:
                {text.trim() && ' 📝 Text'}
                {files.length > 0 && ` 🖼️ ${files.length} file${files.length > 1 ? 's' : ''}`}
                {url.trim() && ' 🔗 Link'}
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: 'var(--red-pale)', border: '1px solid var(--red-border)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--red)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading || !hasInput}
            style={{
              width: '100%', padding: '14px', borderRadius: '11px', border: 'none',
              background: (!hasInput || loading) ? '#e0dbd0' : 'linear-gradient(135deg, #b83232, #e05050)',
              color: '#fff', fontSize: '15px', fontWeight: 700,
              cursor: (!hasInput || loading) ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
            {loading ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                  <path d="M21 12a9 9 0 00-9-9"/>
                </svg>
                Analyzing for scam patterns...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Check for Scam
              </>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}