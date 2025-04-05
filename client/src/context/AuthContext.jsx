import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(0); // Separate currency state

  // Check for existing login on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setCurrency(user.currency || 0); // Initialize currency from stored user
    }
    setLoading(false);
  }, []);

  // Update both currentUser and currency when user changes
  const updateUser = (user) => {
    setCurrentUser(user);
    setCurrency(user.currency || 0);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Mock login function
  const login = (email, password) => {
    let user;
    
    if (email === "admin@arqa.com" && password === "admin123") {
      user = { 
        email, 
        role: "admin", 
        name: "Admin User", 
        avatar: "https://avatar.iran.liara.run/public/33",
        prebookedMeals: 0,
        currency: 0
      };
    } 
    else if (email === "student@arqa.com" && password === "student123") {
      user = { 
        email, 
        role: "student", 
        name: "Student User", 
        avatar: "https://avatar.iran.liara.run/public/98",
        prebookedMeals: 8,
        currency: 125.50
      };
    } 
    else {
      return { success: false, error: "Invalid credentials" };
    }

    updateUser(user);
    return { success: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrency(0);
    localStorage.removeItem('currentUser');
  };

  // Function to update currency
  const updateCurrency = (amount) => {
    const updatedUser = {
      ...currentUser,
      currency: amount
    };
    updateUser(updatedUser);
  };

  // Function to add/subtract currency
  const adjustCurrency = (amount) => {
    const newAmount = (currentUser?.currency || 0) + amount;
    updateCurrency(newAmount);
  };

  const value = {
    currentUser,
    currency, // Expose currency directly
    login,
    logout,
    loading,
    updateCurrency,
    adjustCurrency
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};