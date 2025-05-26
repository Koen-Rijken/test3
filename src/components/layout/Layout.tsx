import React from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      {isAuthenticated && (
        <>
          <Header />
          <div className="md:hidden absolute top-4 right-4 z-50">
            <MobileNav />
          </div>
        </>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} i.AM Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;