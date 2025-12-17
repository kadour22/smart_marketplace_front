import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Zap, TrendingUp, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AddProductToWishList } from "./services/products_services";

const ProductCard = ({ product, image }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await AddProductToWishList(product.id);
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-blue-400"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12 }}
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      {/* Premium Badge */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1"
      >
        <Zap className="w-3 h-3" />
        <span>FEATURED</span>
      </motion.div>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[4/3]">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Product Image */}
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={image}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Floating Action Buttons */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col space-y-2 z-20"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlist}
            className={`p-2.5 backdrop-blur-md rounded-full shadow-lg transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white'
            }`}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-white' : ''}`}
            />
          </motion.button>

          {/* Quick View Button */}
          <AnimatePresence>
            {showQuickView && (
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="p-2.5 bg-blue-600 text-white backdrop-blur-md rounded-full shadow-lg hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trending Indicator */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center space-x-1"
        >
          <TrendingUp className="w-3 h-3" />
          <span>Trending</span>
        </motion.div>

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', skewX: -20 }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Content Section */}
      <div className="p-5 relative">
        {/* Floating Sparkles */}
        <motion.div
          className="absolute -top-3 right-4"
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-blue-400 opacity-60" />
        </motion.div>

        {/* Product Name & Rating */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors">
              {product.product_name}
            </h3>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-3">
            <motion.div
              className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <Star
                    className={`w-3 h-3 ${
                      i < 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </motion.div>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">4.8</span>
            </motion.div>
            <span className="text-xs text-slate-500">(234 reviews)</span>
          </div>
        </motion.div>

        {/* Specs/Category */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-4"
        >
          <p className="text-xs text-slate-600 line-clamp-1 bg-slate-50 px-3 py-1.5 rounded-lg inline-block">
            {product.category || "Premium Quality Product"}
          </p>
        </motion.div>

        {/* Price & CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 150 }}
              >
                ${product.price}
              </motion.div>
              {product.original_price && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 line-through">
                    ${product.original_price}
                  </span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Stock Indicator */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">In Stock</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Add to Cart */}
            <Link to={`/product/${product.id}`} className="flex-1">
              <motion.button
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm relative overflow-hidden group/btn shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </span>
              </motion.button>
            </Link>

            {/* Quick Add to Cart */}
            <motion.button
              className="p-2.5 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-xl transition-all"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Corner Accent */}
      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default ProductCard;