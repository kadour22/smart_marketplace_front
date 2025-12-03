import React,{useState} from "react";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosInstace from "../../AxiosInstance/call_api";


const ProductCard = ({ product, image }) => {

  return (
    <motion.div
      className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
      
      // Card entrance animation
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      
      // Hover animation
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={product.product_name}
          className="w-full h-40 object-cover"
          
          // Image zoom on card hover
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Animated heart button */}
        <motion.button 
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
            onClick={() => AddProductToWishList(product.id)}
        >
          <Heart className="w-4 h-4 text-slate-600" />
        </motion.button>

        {/* Animated overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4">
        {/* Product name animation */}
        <motion.div 
          className="flex items-start justify-between mb-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">
            {product.product_name}
          </h3>
          
          {/* Star rating animation */}
          <motion.div 
            className="flex items-center space-x-1 flex-shrink-0 ml-2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-slate-700">4.8</span>
          </motion.div>
        </motion.div>

        {/* Specs animation */}
        <motion.p 
          className="text-xs text-slate-600 mb-3 line-clamp-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {product.specs || "Premium quality product"}
        </motion.p>

        {/* Price and button section */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Price animation with pulsing effect */}
          <motion.span 
            className="text-xl font-bold text-blue-600"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            ${product.price}
          </motion.span>
          
          {/* View Details button */}
          <Link to={`/product/${product.id}`}>
            <motion.button
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition text-sm font-medium relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">View</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute top-2 left-2 pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        whileHover={{ opacity: 1, scale: 1, rotate: 180 }}
        transition={{ duration: 0.4 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L11.5 6.5L18 8L11.5 9.5L10 16L8.5 9.5L2 8L8.5 6.5L10 0Z" fill="#60A5FA" opacity="0.6"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;