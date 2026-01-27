import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Leaf,
      title: 'ORGANIC',
      description: 'Premium organic herbs from sustainable South African farms.'
    },
    {
      icon: Shield,
      title: 'QUALITY',
      description: 'Lab-tested products ensuring purity and potency.'
    },
    {
      icon: Truck,
      title: 'DELIVERY',
      description: 'Discreet nationwide delivery within 3-5 business days.'
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <img 
            src="/logo.png" 
            alt="Purple Haze" 
            className="w-32 h-auto mx-auto animate-pixel-float"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl text-primary pixel-text-shadow mb-4"
        >
          PURPLE HAZE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-accent pixel-text-shadow mb-6"
        >
          PREMIUM APOTHECARY
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed"
        >
          South Africa's finest selection of organic herbal products, 
          curated for the discerning herbalist.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/products')}
          className="pixel-button bg-primary text-primary-foreground px-8 py-4 text-xs inline-flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BROWSE PRODUCTS
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="pixel-card p-6 text-center"
            >
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xs text-foreground pixel-text-shadow mb-3">
                {feature.title}
              </h3>
              <p className="text-[8px] text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16">
        <h2 className="text-lg text-primary pixel-text-shadow text-center mb-8">
          CATEGORIES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {['SATIVA', 'INDICA', 'SPECIALTY'].map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              onClick={() => navigate('/products')}
              className="pixel-card p-8 text-center hover:bg-muted/50 transition-colors group"
              whileHover={{ y: -4 }}
            >
              <Leaf className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-foreground pixel-text-shadow">
                {category}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
