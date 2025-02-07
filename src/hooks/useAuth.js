// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authService } from '@/libs/appwrite';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  const login = async (email, password) => {
    const session = await authService.login(email, password);
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    return session;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const register = async (email, password, name) => {
    const newUser = await authService.register(email, password, name);
    setUser(newUser);
    return newUser;
  };

  return {
    user,
    loading,
    login,
    logout,
    register
  };
}