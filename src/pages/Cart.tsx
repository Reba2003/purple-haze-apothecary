import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to checkout.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // For demo purposes, mark as paid immediately
      // In production, this would integrate with Paystack
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'paid', payment_reference: `DEMO-${Date.now()}` })
        .eq('id', order.id);

      if (updateError) throw updateError;

      clearCart();
      
      toast({
        title: "Order placed!",
        description: `Your order #${order.id.slice(0, 8)} has been confirmed.`
      });

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg text-foreground pixel-text-shadow mb-2">
            CART EMPTY
          </h2>
          <p className="text-[10px] text-muted-foreground">
            Add some products to get started.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-xl text-primary pixel-text-shadow mb-2">
          YOUR CART
        </h1>
        <p className="text-[10px] text-muted-foreground">
          {items.length} item{items.length !== 1 ? 's' : ''} in your cart
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="pixel-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xs text-foreground pixel-text-shadow mb-1">
                  {item.name}
                </h3>
                <span className="text-[8px] text-muted-foreground">
                  {item.category}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="pixel-button bg-muted text-muted-foreground p-2"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs text-foreground w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="pixel-button bg-muted text-muted-foreground p-2"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Price */}
              <span className="text-sm text-primary pixel-text-shadow min-w-[100px] text-right">
                {formatPrice(item.price * item.quantity)}
              </span>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="pixel-button bg-destructive text-destructive-foreground p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pixel-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-foreground pixel-text-shadow">
              TOTAL
            </span>
            <span className="text-lg text-primary pixel-text-shadow">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <motion.button
            onClick={handleCheckout}
            disabled={loading}
            className="pixel-button w-full bg-accent text-accent-foreground py-4 text-xs flex items-center justify-center gap-3 disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard className="w-5 h-5" />
            {loading ? 'PROCESSING...' : 'CHECKOUT WITH PAYSTACK'}
          </motion.button>

          <p className="text-[8px] text-muted-foreground text-center mt-4">
            Secure payment via Card or Instant EFT
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
