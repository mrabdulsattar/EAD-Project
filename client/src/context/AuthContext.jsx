import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return normalizeUser(JSON.parse(localStorage.getItem('user'))); } catch { return null; }
  });
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setInitializing(false);
      return;
    }

    api.get('/auth/me')
      .then((res) => {
        const nextUser = normalizeUser(res.data?.data);
        setUser(nextUser);
        localStorage.setItem('user', JSON.stringify(nextUser));
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: nextUser } = res.data;
      const normalized = normalizeUser(nextUser);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalized));
      setUser(normalized);
      return { success: true, user: normalized };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token, user: nextUser } = res.data;
      const normalized = normalizeUser(nextUser);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalized));
      setUser(normalized);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, initializing, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}
