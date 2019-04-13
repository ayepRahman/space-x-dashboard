// AuthContext.js
import React, { useEffect, useState } from 'react';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const prevToken = localStorage.getItem('token') || '';
  const [token, setToken] = useState(prevToken);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const defaultContext = {
    token,
    setToken,
  };
  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>;
};
