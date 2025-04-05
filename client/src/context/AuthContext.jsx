import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing login on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function with hardcoded credentials
  const login = (email, password) => {
    // Admin credentials
    if (email === "admin@arqa.com" && password === "admin123") {
      const adminUser = { 
        email, 
        role: "admin", 
        name: "Admin User", 
        avatar: "https://avatar.iran.liara.run/public/33",
        prebookedMeals: 0,
        currency: 0
      };
      setCurrentUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    } 
    // Student credentials
    else if (email === "student@arqa.com" && password === "student123") {
      const studentUser = { 
        email, 
        role: "student", 
        name: "Student User", 
        avatar: "https://avatar.iran.liara.run/public/98",
        prebookedMeals: 8,
        currency: 125.50
      };
      setCurrentUser(studentUser);
      localStorage.setItem('currentUser', JSON.stringify(studentUser));
      return { success: true, user: studentUser };
    } 
    else {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};