import React from "react";
import { Sparkles, SlidersHorizontal, Zap } from "lucide-react";
import FeatureCard from "./FeatuerCard";
const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Search",
      description: "Describe what you want in plain English. Our AI understands context and intent.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: SlidersHorizontal,
      title: "Smart Filters",
      description: "AI automatically applies the right filters based on your description.",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get relevant products in seconds with semantic search technology.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;