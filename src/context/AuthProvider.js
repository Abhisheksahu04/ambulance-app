"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/libs/appwrite";

const AuthContext = createContext();

export function AuthProvider({ children }) {
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
      console.error("Error checking user:", error);
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

  const register = async (
    email,
    password,
    name,
    role,
    additionalDetails = {}
  ) => {
    try {
      const user = await authService.register(
        email,
        password,
        name,
        role,
        additionalDetails
      );
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const feedbackService = async (userId, rating, responseTime, staffBehavior, comments) => {
    try {
      const feedback = await authService.submitFeedback(
        rating,
        responseTime,
        staffBehavior,
        comments,
        userId
      );
      setUser(feedback);
      return feedback;
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, checkUser, feedbackService }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
