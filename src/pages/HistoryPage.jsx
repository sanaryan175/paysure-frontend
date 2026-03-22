import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

const verdictColors = {
  // Loan
  'Suitable':       { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be' },
  'Needs Caution':  { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  'High Risk':      { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  // Scam
  'Legitimate':     { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be' },
  'Suspicious':     { color: '#b8942a', bg: '#fdf8ec', border: '#e8d48a' },
  'Likely Scam':    { color: '#b83232', bg: '#fdf0f0', border: '#f5c0b0' },
  'Confirmed Scam': { color: '#7c0000', bg: '#fff0f0', border: '#ff9999' },
  'Scam Alert':     { color: '#7c0000', bg: '#fff0f0', border: '#ff9999' },
  // Agreement
  'Safe':           { color: '#1a7a3c', bg: '#f0faf3', border: '#a7e0be' },
};

const TABS = [
  { id: 'loan',      label: '💰 Loan Analysis',       endpoint: '/loan-risk/history'  },
  { id: 'scam',      label: '🛡️ Scam Checks',         endpoint: '/scam-check/history' },
  { id: 'agreement', label: '📄 Agreement Analysis',  endpoint: '/agreement/history'  },
];

function VerdictBadge({ verdict }) {
  const c = verdictColors[verdict] || verdictColors['Needs Caution'];
  return (
    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
      {verdict}
    </span>
  );
}

function LoanCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
      <div className="flex items-center justify-between gap-3 p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <VerdictBadge verdict={item.overallVerdict} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <p className="break-words" style={{ fontSize: '14px', color: 'var(--text-faint)', fontWeight: 500 }}>
            ₹{Number(item.loanAmount)?.toLocaleString('en-IN') || '—'} loan · {item.interestRate}% · {item.tenureMonths} months
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
          className="shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border-light)', padding: '16px' }}>
          {item.finalDecisionStatement && (
            <p style={{ fontSize: '14px', color: 'var(--text-faint)', lineHeight: '1.65', marginBottom: '12px', fontStyle: 'italic' }}>
              "{item.finalDecisionStatement}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              ['Repayment Capacity', item.capacityScore],
              ['Financial Stress',   item.financialStressLevel],
              ['Emergency Buffer',   item.emergencyBufferStatus],
            ].map(([label, val]) => val && (
              <div key={label} style={{ background: 'var(--bg-page)', borderRadius: '10px', padding: '10px 12px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>{val}</div>
              </div>
            ))}
          </div>
          {item.keyReasons?.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Key Reasons</p>
              {item.keyReasons.slice(0, 3).map((r, i) => (
                <div key={i} className="flex gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b83232' }}/>
                  <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>{r}</p>
                </div>
              ))}
            </div>
          )}
          {item.documentUploaded && (
            <div className="mt-3 flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>📄</span> Document analyzed: {item.originalFileName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScamCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
      <div className="flex items-center justify-between gap-3 p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <VerdictBadge verdict={item.verdict} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <p className="break-words" style={{ fontSize: '14px', color: 'var(--text-faint)', fontWeight: 500 }}>
            {item.scamType || 'Unknown type'}
            {item.fileCount > 0 && ` · ${item.fileCount} file${item.fileCount > 1 ? 's' : ''} uploaded`}
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
          className="shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border-light)', padding: '16px' }}>
          {item.verdictStatement && (
            <p style={{ fontSize: '14px', color: 'var(--text-faint)', lineHeight: '1.65', marginBottom: '12px', fontStyle: 'italic' }}>
              "{item.verdictStatement}"
            </p>
          )}
          {item.whatTheyWant && (
            <div style={{ background: '#fdf0f0', border: '1px solid #f5c0b0', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#b83232', textTransform: 'uppercase' }}>What They Wanted: </span>
              <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>{item.whatTheyWant}</span>
            </div>
          )}
          {item.redFlags?.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Red Flags</p>
              {item.redFlags.slice(0, 3).map((f, i) => (
                <div key={i} className="flex gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b83232' }}/>
                  <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>{f}</p>
                </div>
              ))}
            </div>
          )}
          {item.filesUploaded?.length > 0 && (
            <div className="mt-3 flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>📎</span> Files: {item.filesUploaded.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AgreementCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: '#fff', border: '1.5px solid var(--border-warm)' }}>
      <div className="flex items-center justify-between gap-3 p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <VerdictBadge verdict={item.verdict} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <p className="break-words" style={{ fontSize: '14px', color: 'var(--text-faint)', fontWeight: 500 }}>
            {item.documentType || 'Document'} · {item.originalFileName || 'No file'}
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
          className="shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border-light)', padding: '16px' }}>
          {item.verdictStatement && (
            <p style={{ fontSize: '14px', color: 'var(--text-faint)', lineHeight: '1.65', marginBottom: '12px', fontStyle: 'italic' }}>
              "{item.verdictStatement}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {item.interestRate && <div style={{ background: 'var(--bg-page)', borderRadius: '10px', padding: '10px 12px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Interest Rate</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>{item.interestRate}</div>
            </div>}
            {item.processingFee && <div style={{ background: 'var(--bg-page)', borderRadius: '10px', padding: '10px 12px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Processing Fee</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>{item.processingFee}</div>
            </div>}
          </div>
          {item.criticalRisks?.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#b83232', textTransform: 'uppercase', marginBottom: '8px' }}>Critical Risks</p>
              {item.criticalRisks.slice(0, 2).map((r, i) => (
                <div key={i} className="flex gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#b83232' }}/>
                  <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>{r}</p>
                </div>
              ))}
            </div>
          )}
          {item.recommendation && (
            <div className="mt-3" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 700 }}>Recommendation: </span>{item.recommendation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('loan');
  const [data,      setData]      = useState({});
  const [loading,   setLoading]   = useState(false);

  const currentTab = TABS.find(t => t.id === activeTab);

  useEffect(() => {
    if (data[activeTab]) return; // already loaded
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await api.get(currentTab.endpoint);
        setData(prev => ({ ...prev, [activeTab]: res.data.data }));
      } catch {
        setData(prev => ({ ...prev, [activeTab]: [] }));
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [activeTab]);

  const items = data[activeTab] || [];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="w-full max-w-[700px] mx-auto min-w-0">

        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/')}
            style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ← Back to home
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))' }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
                {user?.name}'s History
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Your previous analyses</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: '10px', fontSize: 'clamp(12px,3.5vw,13px)',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                border: '1.5px solid',
                borderColor: activeTab === tab.id ? 'var(--gold-mid)' : 'var(--border-mid)',
                background: activeTab === tab.id ? 'var(--gold-pale)' : '#fff',
                color: activeTab === tab.id ? 'var(--gold-deep)' : 'var(--text-faint)',
                transition: 'all .15s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--gold-border)', borderTop: '3px solid var(--gold-mid)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }}/>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Loading history...</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '36px', marginBottom: '12px' }}>📭</p>
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '6px' }}>No history yet</p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {activeTab === 'loan'      && 'Start by analyzing a loan'}
              {activeTab === 'scam'      && 'Check a suspicious message or offer'}
              {activeTab === 'agreement' && 'Upload a financial document to analyze'}
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              {items.length} record{items.length > 1 ? 's' : ''} — most recent first
            </p>
            {items.map(item =>
              activeTab === 'loan'      ? <LoanCard      key={item._id} item={item} /> :
              activeTab === 'scam'      ? <ScamCard      key={item._id} item={item} /> :
                                          <AgreementCard key={item._id} item={item} />
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}