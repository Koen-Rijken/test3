import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useUser();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-16 inset-x-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/products')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/invoices"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/invoices')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={toggleMenu}
            >
              My Invoices
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/profile')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={toggleMenu}
            >
              My Profile
            </Link>
            {isAdmin && (
              <Link
                to="/users"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/users')
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={toggleMenu}
              >
                Manage Users
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;