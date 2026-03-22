import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();
  const returnTo     = location.state?.from || '/';

  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', height: '44px', border: '1.5px solid var(--border-mid)',
    borderRadius: '10px', padding: '0 14px', fontSize: '14px',
    color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif',
    outline: 'none', background: '#faf8f4', transition: 'border .15s',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-10"
      style={{ background: 'var(--bg-page)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 cursor-pointer"
            onClick={() => navigate('/')}
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text-primary)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
              </svg>
            </div>
            PaySure
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.6px', marginBottom: '6px' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Free forever. No credit card needed.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-5 sm:p-8"
          style={{ background: '#fff', border: '1.5px solid var(--border-warm)', boxShadow: '0 4px 24px rgba(28,26,23,0.05)' }}>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '6px' }}>
                Full name
              </label>
              <input
                name="name" type="text" value={form.name}
                onChange={handleChange} placeholder="Sanskriti Gupta" required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '6px' }}>
                Email address
              </label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com" required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '6px' }}>
                Password
                <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '6px' }}>min. 6 characters</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password" type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} placeholder="••••••••" required
                  style={{ ...inputStyle, padding: '0 44px 0 14px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-muted)' }}>
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: 'var(--red-pale)', border: '1px solid var(--red-border)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--red)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: '11px', border: 'none',
                background: loading ? '#e0dbd0' : 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))',
                color: '#fff', fontSize: '15px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
              {loading ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                    <path d="M21 12a9 9 0 00-9-9"/>
                  </svg>
                  Creating account...
                </>
              ) : 'Create Free Account'}
            </button>
          </form>
        </div>

        {/* Switch to login */}
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/login" state={{ from: returnTo }} style={{ color: 'var(--gold-deep)', fontWeight: 700, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}