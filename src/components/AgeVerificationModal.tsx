import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';

const AgeVerificationModal: React.FC = () => {
  const { isVerified, verify, deny } = useAgeVerification();

  if (isVerified) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Blurred background */}
        <div className="absolute inset-0 bg-background/80 blur-backdrop" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <div className="pixel-card p-8 max-w-md w-full text-center">
            {/* Logo */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex justify-center mb-6"
            >
              <img 
                src="/logo.png" 
                alt="Purple Haze" 
                className="w-32 h-auto animate-pixel-float"
              />
            </motion.div>

            {/* Title */}
            <h1 className="text-xl text-primary pixel-text-shadow mb-4">
              PURPLE HAZE
            </h1>
            <h2 className="text-sm text-accent pixel-text-shadow mb-6">
              Premium Apothecary
            </h2>

            {/* Warning */}
            <div className="bg-muted p-4 mb-6 border-2 border-border">
              <p className="text-xs text-foreground leading-relaxed mb-4">
                This website contains products intended for adults only.
              </p>
              <p className="text-lg text-primary pixel-text-shadow">
                ARE YOU 18+?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={verify}
                className="pixel-button bg-primary text-primary-foreground px-6 py-3 text-xs hover:bg-primary/90"
              >
                YES, ENTER
              </button>
              <button
                onClick={deny}
                className="pixel-button bg-destructive text-destructive-foreground px-6 py-3 text-xs hover:bg-destructive/90"
              >
                NO, EXIT
              </button>
            </div>

            <p className="text-[8px] text-muted-foreground mt-6">
              By entering, you confirm you are of legal age in your jurisdiction.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AgeVerificationModal;
