import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QRCodeDisplay from '../components/auth/QRCodeDisplay';
import { useTheme } from '../context/ThemeContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated, startAuthentication } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 animate-gradient">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={`/logo-${theme === 'dark' ? 'light' : 'dark'}.svg`}
              alt="i.AM Logo" 
              className="h-32 w-32 transform transition-transform hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/logo.svg';
              }}
            />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            True Passwordless Identity & Access Management
          </h1>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-all duration-300">
          <QRCodeDisplay />
          
          <div className="mt-6">
            <button
              onClick={startAuthentication}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Generate QR Code
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Scan the QR code with your i.AM mobile app to securely log in without passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;