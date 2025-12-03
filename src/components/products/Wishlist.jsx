import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Trash2, ShoppingCart, Sparkles, Package, 
  AlertCircle, X
} from 'lucide-react';
import { getWishlist,RemoveProductFromWishList } from './services/products_services';
import { Link,useLocation } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

   const handleRemoveFromWishlist = async (productId) => {
    const response = await RemoveProductFromWishList(productId);
    setRefresh(prev => !prev);
    console.log('Remove product:', productId);
    // Update state after removal
  };
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlist(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [refresh]);
  const BASE_URL = "http://127.0.0.1:8000";
 
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const products = wishlist?.wishlist?.[0]?.products || [];
  const isEmpty = products.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">My Wishlist</h1>
                <p className="text-slate-600">
                  {products.length} {products.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>

            {!isEmpty && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  User: {wishlist?.username || 'Guest'}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Empty State */}
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-16 h-16 text-pink-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-slate-600 mb-8">Start adding products you love!</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition font-semibold"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-pink-300"
                  >
                    {/* Product Image Placeholder */}
                    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 h-48 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* <Package className="w-20 h-20 text-slate-300" /> */}
                        <img src={BASE_URL + product.image} alt={product.product_name} />
                      </div>
                      
                      {/* Floating Heart Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        className="absolute top-3 left-3 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </motion.div>

                      {/* Remove Button */}
                     

                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 transition line-clamp-2">
                            {product.product_name}
                          </h3>
                        </Link>
                        
                        <p className="text-xs text-slate-500 mb-4">Product ID: #{product.id}</p>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            
                            className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition font-medium text-sm flex items-center justify-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove From Wishlist</span>
                          </motion.button>
                    
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom shine effect */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Wishlist Summary</h3>
                    <p className="text-sm text-slate-600">
                      You have {products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist
                    </p>
                  </div>
                </div>
         
              </div>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-6"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
                  <p className="text-sm text-blue-700">
                    Items in your wishlist are saved across devices. Share your wishlist with friends and family!
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;