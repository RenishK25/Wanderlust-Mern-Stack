// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState(getUserFromStorage);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};