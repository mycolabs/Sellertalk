import React from 'react';
import { Zap, Users } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface SolutionProps {
  onCTAClick: () => void;
}

export const Solution: React.FC<SolutionProps> = ({ onCTAClick }) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Get Your Personalized AI Automation Blueprint.{' '}
            <span className="text-green-600">For Free.</span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Get a free, personalized AI Blueprint showing exactly which AI Agent will save you hours every week, plus early access to our beta.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
            <AnimatedSection
              delay={100}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-blue-100"
            >
              <div 
                onClick={onCTAClick}
                className="w-full h-full cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-slate-800 font-medium">
                  Get Your Personalized AI Blueprint
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection
              delay={200}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-green-100"
            >
              <div 
                onClick={onCTAClick}
                className="w-full h-full cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <p className="text-slate-800 font-medium">
                  Early Access to AI Agent Beta
                </p>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Testimonial Section */}
          <AnimatedSection delay={300} className="mt-16 bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "I was spending 4 hours daily answering 'price kya hai?' messages. Now my AI bot handles 85% of inquiries instantly while I focus on sourcing new products."
              </blockquote>
              <cite className="text-slate-600 font-medium">
                — Priya Sharma, Fashion Seller, Mumbai
              </cite>
              <div className="text-sm text-green-600 font-semibold mt-2">
                Saved 25+ hours weekly
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
};