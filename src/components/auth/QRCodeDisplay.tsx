import React from 'react';
import { useAuth } from '../../context/AuthContext';

const QRCodeDisplay: React.FC = () => {
  const { qrCodeData, error } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Scan QR Code to Login
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {qrCodeData ? (
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg shadow-sm mb-4 transform hover:scale-105 transition-transform duration-300">
            <img 
              src={`data:image/png;base64,${qrCodeData}`} 
              alt="Authentication QR Code" 
              className="w-64 h-64"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Scan this QR code with your i.AM mobile app to authenticate
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-48 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="mt-4 h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;