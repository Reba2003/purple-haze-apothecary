import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  category,
  stock
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, category });
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
    });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'sativa':
        return 'text-primary';
      case 'indica':
        return 'text-accent';
      case 'specialty greens':
        return 'text-secondary-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="pixel-card p-4 flex flex-col h-full"
    >
      {/* Product Image Placeholder */}
      <div className="bg-muted aspect-square mb-4 flex items-center justify-center border-2 border-border relative overflow-hidden">
        <Leaf className="w-16 h-16 text-primary/30" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>

      {/* Category Badge */}
      <span className={`text-[8px] ${getCategoryColor(category)} pixel-text-shadow mb-2`}>
        {category.toUpperCase()}
      </span>

      {/* Product Name */}
      <h3 className="text-xs text-foreground pixel-text-shadow mb-2 line-clamp-2">
        {name}
      </h3>

      {/* Description */}
      <p className="text-[8px] text-muted-foreground mb-4 flex-1 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Price & Stock */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-primary pixel-text-shadow">
          {formatPrice(price)}
        </span>
        <span className={`text-[8px] ${stock > 0 ? 'text-primary' : 'text-destructive'}`}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </span>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        disabled={stock <= 0}
        className="pixel-button w-full bg-primary text-primary-foreground py-3 text-[10px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-4 h-4" />
        ADD TO CART
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
