import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinks = [
  { label: 'Features',           id: 'features'    },
  { label: 'How it Works',       id: 'how-it-works' },
  { label: "Developer's Vision", id: 'vision'       },
  { label: 'Pricing',            id: 'pricing'      },
  { label: 'Support',            id: 'cta'          },
];

// ─── Click-based dropdown ─────────────────────────────────────────────────────
function DropdownMenu({ user, onHistory, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px', borderRadius: '10px',
          background: 'var(--gold-pale)', border: '1px solid var(--gold-border)',
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
        }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', background: 'var(--gold-mid)', flexShrink: 0 }}>
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold-deep)' }}>
          {user?.name?.split(' ')[0]}
        </span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)',
          minWidth: '200px', zIndex: 200,
          background: '#fff', borderRadius: '14px',
          border: '1.5px solid var(--border-warm)',
          boxShadow: '0 8px 32px rgba(28,26,23,0.12)',
          overflow: 'hidden',
        }}>
          {/* User info */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{user?.email}</p>
          </div>

          {/* View History */}
          <button
            onClick={() => { setOpen(false); onHistory(); }}
            style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-page)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)' }}>View History</span>
          </button>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '0 16px' }} />

          {/* Logout */}
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fdf0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--red)' }}>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: '1px solid var(--border-light)', boxShadow: '0 1px 8px rgba(28,26,23,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-14 sm:h-16 flex items-center justify-between gap-2">

        {/* Logo */}
        <div onClick={() => { setMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0 shrink"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(17px, 4vw, 19px)', color: 'var(--text-primary)' }}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))' }}>
            <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
            </svg>
          </div>
          <span className="truncate">PaySure</span>
        </div>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center flex-1 justify-center min-w-0">
          {navLinks.map(({ label, id }) => (
            <button key={id} onClick={() => handleNavClick(id)}
              style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, padding: '8px 12px', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              {label}
            </button>
          ))}
        </div>

        {/* Auth + menu toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {isAuthenticated ? (
            <DropdownMenu
              user={user}
              onHistory={() => { setMenuOpen(false); navigate('/history'); }}
              onLogout={() => { setMenuOpen(false); handleLogout(); }}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <button onClick={() => navigate('/login')}
                style={{ background: 'transparent', border: '1.5px solid var(--border-mid)', color: 'var(--text-muted)', borderRadius: '10px', padding: '8px 18px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-mid)'; e.currentTarget.style.color = 'var(--gold-deep)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                Login
              </button>
              <button onClick={() => navigate('/register')}
                style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,162,39,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                Sign Up
              </button>
            </div>
          )}

          <button
            type="button"
            className="md:hidden p-2 rounded-lg -mr-1"
            style={{ border: '1px solid var(--border-light)', background: 'var(--bg-page)' }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border-light)] bg-white px-4 py-3 shadow-lg max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="text-left py-3 px-2 rounded-lg text-[15px] font-medium"
                style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); navigate('/login'); }}
                className="w-full py-3 rounded-[10px] text-[14px] font-medium"
                style={{ border: '1.5px solid var(--border-mid)', color: 'var(--text-muted)', background: 'transparent', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); navigate('/register'); }}
                className="w-full py-3 rounded-[10px] text-[14px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))', border: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}