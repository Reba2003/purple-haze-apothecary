import React, { createContext, useContext, useState, useEffect } from 'react';

interface AgeVerificationContextType {
  isVerified: boolean;
  verify: () => void;
  deny: () => void;
}

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

export const useAgeVerification = () => {
  const context = useContext(AgeVerificationContext);
  if (!context) {
    throw new Error('useAgeVerification must be used within an AgeVerificationProvider');
  }
  return context;
};

export const AgeVerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState(() => {
    const saved = sessionStorage.getItem('purple-haze-age-verified');
    return saved === 'true';
  });

  useEffect(() => {
    if (isVerified) {
      sessionStorage.setItem('purple-haze-age-verified', 'true');
    }
  }, [isVerified]);

  const verify = () => {
    setIsVerified(true);
  };

  const deny = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AgeVerificationContext.Provider value={{ isVerified, verify, deny }}>
      {children}
    </AgeVerificationContext.Provider>
  );
};
