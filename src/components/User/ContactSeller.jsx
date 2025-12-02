import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, X, User, Mail, Phone, 
  Clock, CheckCircle, Sparkles
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ContactSeller = ({ seller, productName, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {state} = useLocation();

  const username = state?.seller

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    
    // Simulate API call - Replace with your actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setIsSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSent(false);
      if (onClose) onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Floating sparkles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 mb-2"
                >
                  <MessageSquare className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Contact Seller</h2>
                </motion.div>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100"
                >
                  Ask about: <span className="font-semibold">{productName || "Product"}</span>
                </motion.p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Seller Info Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="m-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {username || "Premium Seller"} product owner
                </h3>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Responds in 2 hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-6 mb-4 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-green-900">Message Sent!</p>
                    <p className="text-sm text-green-700">The seller will respond shortly.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {/* Name Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Message Input */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Hi, I'm interested in this product. Is it still available?"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Be specific about what you'd like to know
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSending || isSent}
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
                    isSending || isSent
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl text-white'
                  }`}
                >
                  {isSending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      <span>Sending...</span>
                    </>
                  ) : isSent ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
            >
              <div className="flex items-start space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Quick Tips</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Be clear and specific about your questions</li>
                    <li>• Mention any special requirements or concerns</li>
                    <li>• Check your email for the seller's response</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactSeller;