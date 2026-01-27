import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast({
        title: "Invalid email",
        description: emailResult.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast({
        title: "Invalid password",
        description: passwordResult.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login failed",
            description: error.message === 'Invalid login credentials' 
              ? 'Invalid email or password. Please try again.' 
              : error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in."
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          const message = error.message.includes('already registered')
            ? 'This email is already registered. Please sign in instead.'
            : error.message;
          toast({
            title: "Sign up failed",
            description: message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to Purple Haze."
          });
          navigate('/');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pixel-card p-8 max-w-md w-full"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.img 
            src="/logo.png" 
            alt="Purple Haze" 
            className="w-24 h-auto"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <h1 className="text-lg text-primary pixel-text-shadow text-center mb-2">
          PURPLE HAZE
        </h1>
        <p className="text-[10px] text-muted-foreground text-center mb-8">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] text-foreground block mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-input text-foreground p-3 text-xs border-4 border-border focus:border-primary outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-foreground block mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-input text-foreground p-3 text-xs border-4 border-border focus:border-primary outline-none transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="pixel-button w-full bg-primary text-primary-foreground py-3 text-xs disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'LOADING...' : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] text-accent hover:text-accent/80 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
