import React, { createContext, useState, useEffect,useContext  } from 'react';
import {jwtDecode} from 'jwt-decode'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(jwtDecode(storedToken).userId);
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(jwtDecode(newToken).userId);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
  };