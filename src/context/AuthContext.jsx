import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, getCurrentUser, signUp, signIn, logout } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    const result = await signUp(email, password);
    if (result.error) {
      toast.error(getErrorMessage(result.error));
      return { success: false, error: result.error };
    }
    toast.success('🎉 Account created successfully!');
    return { success: true, user: result.user };
  };

  const login = async (email, password) => {
    const result = await signIn(email, password);
    if (result.error) {
      toast.error(getErrorMessage(result.error));
      return { success: false, error: result.error };
    }
    toast.success('👋 Welcome back!');
    return { success: true, user: result.user };
  };

  const logoutUser = async () => {
    const result = await logout();
    if (result.error) {
      toast.error(getErrorMessage(result.error));
      return { success: false };
    }
    toast.success('👋 Logged out successfully');
    return { success: true };
  };

  // Helper function for user-friendly error messages
  const getErrorMessage = (error) => {
    const errorMap = {
      'auth/api-key-not-valid.-please-pass-a-valid-api-key.': '🔥 API Key error. Please check Firebase config.',
      'auth/email-already-in-use': '📧 This email is already registered. Please login.',
      'auth/invalid-email': '📧 Invalid email address.',
      'auth/weak-password': '🔑 Password should be at least 6 characters.',
      'auth/user-not-found': '👤 No account found with this email.',
      'auth/wrong-password': '🔑 Incorrect password. Please try again.',
      'auth/too-many-requests': '⏳ Too many attempts. Please try again later.',
    };
    return errorMap[error] || `❌ ${error}`;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logoutUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};