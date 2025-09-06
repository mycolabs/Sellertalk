import React from 'react';
import { ArrowRight, Smartphone, MessageCircle } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface HeroProps {
  onCTAClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Stop Answering{' '}
              <span className="text-green-400">'Price kya hai?'</span>{' '}
              DMs. Start{' '}
              <span className="text-orange-400">Automating Sales.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed">
              Our AI Agent automatically replies to price, size, availability questions and confirms COD orders - so you can focus on growing your business.
            </p>
            
            <button
              onClick={onCTAClick}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform-gpu group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">
              Get My Free AI Blueprint
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <div className="text-slate-300 text-sm">
              <span className="text-amber-400 font-semibold">Limited:</span> Only 100 free audits this month | No spam guaranteed
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200} className="lg:text-center">
            <div className="inline-block p-6 sm:p-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl shadow-2xl">
              <Smartphone className="w-32 h-32 sm:w-40 sm:h-40 text-green-400 mx-auto mb-4" />
              <div className="space-y-3">
                <div className="bg-white text-slate-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-500" />
                  Price kya hai? 💸
                </div>
                <div className="bg-white text-slate-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-500" />
                  Size available? 👕
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  AI Agent replies instantly! 🤖
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};