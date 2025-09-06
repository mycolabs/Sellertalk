import React from 'react';
import { AnimatedSection } from './AnimatedSection';

const steps = [
  {
    number: '1',
    title: 'Tell us your biggest challenge',
    subtitle: '30 seconds'
  },
  {
    number: '2',
    title: 'Enter your WhatsApp number',
    subtitle: 'to receive your free Blueprint'
  },
  {
    number: '3',
    title: 'Get your free AI Blueprint',
    subtitle: ''
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Blueprint in 3 Easy Steps
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={index * 200} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-300">
                {step.title}
              </h3>
              {step.subtitle && <p className="text-slate-300">({step.subtitle})</p>}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};