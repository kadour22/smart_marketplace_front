import React from "react";
import { Star,Heart } from "lucide-react";
const ProductSearchCard = ({ item,image }) => {


  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={item.product_name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition">
          <Heart className="w-5 h-5 text-slate-600" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {/* <span className="text-sm font-medium text-slate-700">{product.rating}</span> */}
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${item.price}</span>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchCard