import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Session ends when the tab/window is closed (sessionStorage, not localStorage)
  useEffect(() => {
    localStorage.removeItem('paysure_token');
    localStorage.removeItem('paysure_user');

    const token = sessionStorage.getItem('paysure_token');
    const saved = sessionStorage.getItem('paysure_user');
    if (token && saved) {
      setUser(JSON.parse(saved));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    sessionStorage.setItem('paysure_token', token);
    sessionStorage.setItem('paysure_user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    sessionStorage.setItem('paysure_token', token);
    sessionStorage.setItem('paysure_user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return res.data;
  };

  const logout = () => {
    sessionStorage.removeItem('paysure_token');
    sessionStorage.removeItem('paysure_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};