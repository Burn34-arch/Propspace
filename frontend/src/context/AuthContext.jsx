import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { registerUser, loginUser } from '../api/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('propspace_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const persist = (user, token) => {
    localStorage.setItem('propspace_token', token);
    localStorage.setItem('propspace_user', JSON.stringify(user));
    setUser(user);
  };

  const register = useCallback(async (data) => {
    const res = await registerUser(data);
    persist(res.data.user, res.data.token);
    return res.data.user;
  }, []);

  const login = useCallback(async (data) => {
    const res = await loginUser(data);
    persist(res.data.user, res.data.token);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('propspace_token');
    localStorage.removeItem('propspace_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('propspace_user', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
