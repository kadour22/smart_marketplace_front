import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Search, Zap, TrendingUp, Star, ShoppingCart, 
  MessageSquare, Cpu, Filter, ChevronRight, Check, ArrowRight
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center"
          >
            {/* Badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Shopping Revolution</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Shop Smarter with
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Search
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto"
            >
              Just describe what you want in natural language. Our AI understands your needs, 
              applies smart filters, and finds exactly what you're looking for in seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition font-semibold text-lg flex items-center space-x-2"
              >
                <Link to="/products">
                 <span>Start Shopping Free</span>
                </Link>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:shadow-lg transition font-semibold text-lg flex items-center space-x-2"
              >
                <span>Watch Demo</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div 
              variants={fadeInUp}
              className="relative max-w-5xl mx-auto"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-4">
                {/* Search Bar Preview */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 mb-6"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <input
                        type="text"
                        placeholder="Try: 'Gaming laptop under $1500 with RTX graphics'"
                        className="flex-1 text-lg outline-none text-slate-400"
                        disabled
                      />
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium">
                        Search
                      </button>
                    </div>
                  </motion.div>

                  {/* Mock Results */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="bg-white rounded-xl p-4 border border-slate-200"
                      >
                        <div className="bg-slate-100 rounded-lg h-32 mb-3"></div>
                        <div className="h-3 bg-slate-200 rounded mb-2"></div>
                        <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience the future of online shopping with our intelligent search technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Natural Language Search",
                description: "Just type what you want in plain English. No complex filters needed.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Cpu,
                title: "Smart AI Processing",
                description: "Our AI extracts key requirements and understands context automatically.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Filter,
                title: "Auto-Applied Filters",
                description: "Filters are automatically applied based on your description for precise results.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Search,
                title: "Semantic Search",
                description: "Find products by meaning, not just keywords. Discover what you didn't know existed.",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get results in seconds with our optimized search algorithms.",
                gradient: "from-orange-500 to-yellow-500"
              },
              {
                icon: TrendingUp,
                title: "Personalized Results",
                description: "AI learns your preferences to show you the most relevant products.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Shopping made simple in three easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Describe What You Want",
                description: "Type your search in natural language. Be as specific or general as you like.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "AI Analyzes Your Request",
                description: "Our AI extracts price, specs, features, and applies smart filters automatically.",
                icon: Cpu
              },
              {
                step: "03",
                title: "Get Perfect Results",
                description: "Browse curated products that match exactly what you're looking for.",
                icon: Star
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-blue-100 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Shop Smarter?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of shoppers who are already experiencing the future of online shopping.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition font-bold text-lg inline-flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SmartMarket</span>
              </div>
              <p className="text-slate-400">AI-powered shopping for everyone</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SmartMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;