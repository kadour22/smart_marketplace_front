import React from "react";

const FeatureCard = ({ icon: Icon, title, description, bgColor, iconColor }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 text-center">
      <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default FeatureCard;