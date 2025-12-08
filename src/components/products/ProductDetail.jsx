import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, ShoppingCart, Star, Sparkles, 
  Truck, Shield, RefreshCw, ArrowLeft
} from 'lucide-react';
import { AddProductToWishList, getProductDetails } from './services/products_services';
import AISearchLoader from '../Loader/Loader';
import {startConversation} from "../Messages/services/messages_services"
const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-slate-100 rounded-2xl overflow-hidden aspect-square"
      >
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-lg"
        >
          <Heart className="w-5 h-5 text-slate-600" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedImage === idx
                ? 'border-blue-600'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const BASE_URL = "http://127.0.0.1:8000";
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [contactingLoading, setContactingLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <AISearchLoader />;
  }

  const handleWishList = () => {
    AddProductToWishList(product.id);
  };

   const handle_seller_contact = async () => {
    try{
      const response = await startConversation(id,product.seller)
      const redirect_id = response.id
      navigate(`/messages/${redirect_id}/`)  
    }catch(err){
      console.log('')
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h2>
          <p className="text-slate-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Create array of images (main image + additional images if available)
  const images = product.image 
    ? [BASE_URL + product.image]
    : ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop"];

  
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center text-slate-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <Link to="/products" className="font-medium">Back to Products</Link>
        </motion.button>
          {product.seller}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ImageGallery images={images} productName={product.product_name} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Product Title & Stock Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2 mb-3"
              >
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  In Stock
                </span>
                
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-slate-900 mb-3"
              >
                {product.product_name}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-slate-600">4.8 (234 reviews)</span>
              </motion.div>
            </motion.div>

            {/* Price */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-4"
            >
              <span className="text-4xl font-bold text-blue-600">
                ${product.price || '0.00'}
              </span>
              {product.original_price && (
                <>
                  <span className="text-xl text-slate-400 line-through">
                    ${product.original_price}
                  </span>
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.8 }}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold"
                  >
                    Save ${product.original_price - product.price}
                  </motion.span>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="border-t border-slate-200 pt-6"
            >
              <p className="text-slate-700 leading-relaxed">
                {product.description || 'No description available.'}
              </p>
            </motion.div>

            {/* Specs */}
            {product.specifications && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                    >
                      <p className="text-xs text-slate-500 mb-1">{key}</p>
                      <p className="text-sm font-semibold text-slate-900">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
                { icon: Shield, title: "Warranty", desc: "2 year coverage" },
                { icon: RefreshCw, title: "Returns", desc: "30 day policy" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-4 border border-slate-200 text-center"
                >
                  <feature.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                  <p className="text-xs text-slate-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="space-y-4"
            >

              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  onClick={handleWishList}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </motion.button>
                <motion.button 
                  onClick={handle_seller_contact}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition font-semibold"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Contact The Seller
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;