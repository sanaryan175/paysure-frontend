import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext.jsx';
import ProtectedRoute    from './pages/auth/ProtectedRoute.jsx';
import Navbar            from './components/Navbar.jsx';
import Hero              from './components/Hero.jsx';
import FeatureCards      from './components/FeatureCards.jsx';
import HowItWorks        from './components/HowItWorks.jsx';
import ResultDashboard   from './components/ResultDashboard.jsx';
import DeveloperVision   from './components/DeveloperVision.jsx';
import Pricing           from './components/Pricing.jsx';
import CTAStrip          from './components/CTAStrip.jsx';
import Footer            from './components/Footer.jsx';
import LoanRiskPage      from './pages/LoanRiskPage.jsx';
import AgreementPage     from './pages/AgreementPage.jsx';
import ScamCheckPage     from './pages/ScamCheckPage.jsx';
import HistoryPage       from './pages/HistoryPage.jsx';
import LoginPage         from './pages/auth/LoginPage.jsx';
import RegisterPage      from './pages/auth/RegisterPage.jsx';

function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <ResultDashboard />
      <DeveloperVision />
      <Pricing />
      <CTAStrip />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const pingUrl = `${base.replace(/\/$/, '')}/ping`;
    fetch(pingUrl).catch((err) => console.error('Error fetching ping:', err));
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/"         element={<LandingPage />} />
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected */}
            <Route path="/loan-risk" element={
              <ProtectedRoute><LoanRiskPage /></ProtectedRoute>
            } />
            <Route path="/agreement" element={
              <ProtectedRoute><AgreementPage /></ProtectedRoute>
            } />
            <Route path="/scam-check" element={
              <ProtectedRoute><ScamCheckPage /></ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute><HistoryPage /></ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}