import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'visitor' ou 'domain'

  const login = (userData, type) => {
    setCurrentUser(userData);
    setUserType(type);
    // TODO: Implémenter la logique de connexion avec backend
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    // TODO: Implémenter la logique de déconnexion avec backend
  };

  const value = {
    currentUser,
    userType,
    login,
    logout,
    isAuthenticated: !!currentUser,
    isDomain: userType === 'domain',
    isVisitor: userType === 'visitor'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}