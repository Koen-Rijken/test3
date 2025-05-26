import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getUserByEmail } from '../data/users';
import { useAuth } from './AuthContext';

interface UserContextType {
  currentUser: User | null;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, userEmail } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      const user = getUserByEmail(userEmail);
      setCurrentUser(user || null);
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, userEmail]);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <UserContext.Provider value={{ currentUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};