import React from "react";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, image }) => {
  const BASE_URL = "127.0.0.1:8000";

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
    
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={product.product_name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition">
          <Heart className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">{product.product_name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
