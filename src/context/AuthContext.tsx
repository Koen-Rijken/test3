import React, { createContext, useContext, useState, useEffect } from 'react';
import { IAMService } from '../services/IAMService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  error: string | null;
  qrCodeData: string | null;
  startAuthentication: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const iamService = new IAMService();
const APP_ID = '77974e01-f54d-4357-b95b-e1b8c9581466';
const HUB_ID = '6bf8216f-a8ff-46ef-a43f-b9c1ab831505';
const PRIVATE_KEY = 'MCwCAQAwBQYDK2VwBCBVG5ND8woNtjER587JMtEAIdzChXsMxMu6L7UAa87e3g==';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [verificationInterval, setVerificationInterval] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const clearVerificationInterval = () => {
    if (verificationInterval) {
      window.clearInterval(verificationInterval);
      setVerificationInterval(null);
    }
  };

  useEffect(() => {
    return () => clearVerificationInterval();
  }, []);

  const startAuthentication = async () => {
    try {
      setError(null);
      const qrResponse = await iamService.generateAuthQRCode({
        appId: APP_ID,
        hubId: HUB_ID,
        signingPrivateKey: PRIVATE_KEY,
      });

      setQrCodeData(qrResponse.qrCodeBase64);
      setTransactionId(qrResponse.transactionId);

      // Start polling for verification
      const intervalId = window.setInterval(async () => {
        try {
          const verificationResponse = await iamService.checkVerification({
            applicationId: APP_ID,
            transactionId: qrResponse.transactionId,
            timeoutInMs: 5000,
          });

          if (verificationResponse.verified && 
              verificationResponse.encryptedSessionToken && 
              verificationResponse.encryptionIv) {
            clearVerificationInterval();

            const sessionResponse = await iamService.verifySession({
              encryptedSessionToken: verificationResponse.encryptedSessionToken,
              encryptionIv: verificationResponse.encryptionIv,
              applicationId: APP_ID,
            });

            setUserEmail(sessionResponse.email);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Verification check failed:', error);
        }
      }, 2000);

      setVerificationInterval(intervalId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      console.error('Authentication error:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setQrCodeData(null);
    setError(null);
    setTransactionId(null);
    clearVerificationInterval();
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userEmail,
      error,
      qrCodeData,
      startAuthentication,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};