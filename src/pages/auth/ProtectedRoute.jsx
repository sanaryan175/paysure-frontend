import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait for auth check to complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-page)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px', height: '40px', border: '3px solid var(--gold-border)',
            borderTop: '3px solid var(--gold-mid)', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 16px',
          }} />
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            Loading...
          </p>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in — redirect to login, remember where they were going
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}