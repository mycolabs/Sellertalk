import React from 'react';
import { AnimatedSection } from './AnimatedSection';

const problems = [
  {
    icon: '💬',
    text: 'Answering the same questions (price, size, availability) 100 times.'
  },
  {
    icon: '⏰',
    text: 'Wasting hours confirming COD orders & chasing payments.'
  },
  {
    icon: '😓',
    text: 'Replying to DMs late at night, with no time left for yourself.'
  }
];

export const Problems: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Does Your Business Day Feel Like This?
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <AnimatedSection
              key={index}
              delay={index * 100}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                {problem.text}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};