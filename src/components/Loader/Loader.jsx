import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AISearchLoader = ({ message = "AI is analyzing your request..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Robot SVG Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Floating Robot */}
        <motion.svg
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Robot Head */}
          <motion.rect
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            x="30"
            y="30"
            width="60"
            height="50"
            rx="8"
            fill="url(#robotGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Antenna */}
          <motion.line
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            x1="60"
            y1="30"
            x2="60"
            y2="15"
            stroke="url(#antennaGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.circle
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            cx="60"
            cy="12"
            r="4"
            fill="#60A5FA"
            className="drop-shadow-md"
          />
          
          {/* Left Eye */}
          <motion.circle
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            cx="45"
            cy="50"
            r="6"
            fill="#60A5FA"
          />
          
          {/* Right Eye */}
          <motion.circle
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            cx="75"
            cy="50"
            r="6"
            fill="#60A5FA"
          />
          
          {/* Mouth/Display */}
          <motion.rect
            animate={{ width: [30, 40, 30] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            x="45"
            y="62"
            width="30"
            height="8"
            rx="4"
            fill="#818CF8"
            opacity="0.6"
          />
          
          {/* Body */}
          <rect
            x="35"
            y="85"
            width="50"
            height="25"
            rx="6"
            fill="url(#bodyGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Left Arm */}
          <motion.rect
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            x="20"
            y="88"
            width="12"
            height="20"
            rx="6"
            fill="url(#armGradient)"
            style={{ transformOrigin: "26px 88px" }}
          />
          
          {/* Right Arm */}
          <motion.rect
            animate={{ rotate: [20, -20, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            x="88"
            y="88"
            width="12"
            height="20"
            rx="6"
            fill="url(#armGradient)"
            style={{ transformOrigin: "94px 88px" }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="armGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Sparkles around robot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(60px)`,
              }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-lg font-semibold text-slate-700 mb-2">{message}</p>
        
        {/* Animated Dots */}
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-3, 3, -3],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "240px" }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-6 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
      />
    </div>
  );
};

export default AISearchLoader;