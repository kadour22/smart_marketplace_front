import React from "react";
import { Sparkle } from "lucide-react";
const AISuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-3 justify-center">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:text-blue-600 hover:border-blue-300 transition flex items-center space-x-2"
        >
          <Sparkles className="w-3 h-3" />
          <span>{suggestion}</span>
        </button>
      ))}
    </div>
  );
};
export default AISuggestions