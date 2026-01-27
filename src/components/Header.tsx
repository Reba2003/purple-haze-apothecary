import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 right-0 left-16 h-16 bg-card border-b-4 border-border z-30 flex items-center justify-end px-6"
      style={{
        boxShadow: '0 4px 0 0 hsl(0 0% 0% / 0.3)'
      }}
    >
      <div className="flex items-center gap-6">
        {/* User Email */}
        {user && (
          <span className="text-[8px] text-muted-foreground hidden sm:block truncate max-w-[200px]">
            {user.email}
          </span>
        )}

        {/* Cart Button */}
        <motion.button
          onClick={() => navigate('/cart')}
          className="relative pixel-button bg-primary text-primary-foreground p-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[8px] w-6 h-6 flex items-center justify-center border-2 border-border"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
