import { useState, useEffect } from 'react';
import { authService } from '@/libs/appwrite';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { session, user } = await authService.login(email, password);
      setUser(user);
      return { session, user };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, name, role, additionalDetails = {}) => {
    try {
      const user = await authService.register(email, password, name, role, additionalDetails);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    checkUser
  };
}