import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { currentUser, isAdmin } = useUser();
  const { theme } = useTheme();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
            >
              <img
                src={`/logo-${theme === 'dark' ? 'light' : 'dark'}.svg`}
                alt="i.AM Logo"
                className="h-8 w-auto transition-opacity duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/logo.svg';
                }}
              />
            </Link>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated && (
              <nav className="hidden md:ml-6 md:flex md:space-x-4">
                <Link 
                  to="/products" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/products') 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors duration-200`}
                >
                  Products
                </Link>
                <Link 
                  to="/invoices" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/invoices') 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors duration-200`}
                >
                  My Invoices
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/profile') 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors duration-200`}
                >
                  My Profile
                </Link>
                {isAdmin && (
                  <Link 
                    to="/users" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/users') 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    } transition-colors duration-200`}
                  >
                    Manage Users
                  </Link>
                )}
              </nav>
            )}
            
            <div className="ml-4 flex items-center md:ml-6">
              <ThemeToggle />
              
              {isAuthenticated && (
                <div className="ml-3 relative flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">{currentUser?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;