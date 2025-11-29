import React from "react";
import { Zap } from "lucide-react";
const Herosection = () => {
  return (
    <>
    <div className="text-center mb-12">
      <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
        <Zap className="w-4 h-4" />
        <span className="text-sm font-medium">AI-Powered Shopping</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
        Find Products with
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Natural Language</span>
      </h1>
      
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        Just describe what you're looking for. Our AI understands and finds exactly what you need.
      </p>
    </div>

    </>
  );
};

export default Herosection