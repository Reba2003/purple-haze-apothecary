import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Products', path: '/products' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <motion.div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 200 : 64 }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r-4 border-sidebar-border z-40 flex flex-col"
      style={{
        boxShadow: '4px 0 0 0 hsl(0 0% 0% / 0.3)'
      }}
    >
      {/* Logo */}
      <div className="p-3 border-b-4 border-sidebar-border">
        <motion.div
          animate={{ justifyContent: isExpanded ? 'flex-start' : 'center' }}
          className="flex items-center gap-3"
        >
          <img 
            src="/logo.png" 
            alt="Purple Haze" 
            className="w-10 h-10 object-contain"
          />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[8px] text-sidebar-foreground pixel-text-shadow whitespace-nowrap"
            >
              PURPLE HAZE
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-primary' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t-4 border-sidebar-border p-4">
        <motion.button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 text-destructive hover:text-destructive/80 transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-6 h-6 shrink-0" />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] whitespace-nowrap"
            >
              Log out
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
