import React from "react";
import { Sparkles,SlidersHorizontal,Search } from "lucide-react";
import {SemanticSearchProducts} from "../products/services/products_services"
import Herosection from "./Herosection";
const AISearchBar = ({ handleAISearch,searchQuery,setSearchQuery }) => {

    return (
    <>
        <Herosection/>
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition"></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try: 'Laptop under $1999 with good battery for programming'"
            className="flex-1 text-lg outline-none text-slate-900 placeholder-slate-400"
          />
          
          {/* <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-3 hover:bg-slate-100 rounded-xl transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-slate-600" />
          </button> */}
          
          <button onClick={handleAISearch} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition font-medium flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AISearchBar