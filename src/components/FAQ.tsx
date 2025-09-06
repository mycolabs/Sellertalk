import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const faqs = [
  {
    q: 'What exactly does the AI agent do?',
    a: 'Automatically responds to price, size, stock, and COD questions while you sleep.'
  },
  {
    q: 'How long does the audit take?',
    a: 'You\'ll receive your blueprint within 5 minutes.'
  },
  {
    q: 'Will you spam me?',
    a: 'Never. We respect your time. Unsubscribe anytime.'
  },
  {
    q: 'Can this work with my existing WhatsApp Business?',
    a: 'Yes, integrates seamlessly.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            FAQs
          </h2>
          <p className="text-lg text-slate-600">
            Trusted by 50+ small sellers already
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection
              key={index}
              delay={index * 100}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-slate-900 text-lg">
                  {faq.q}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-slate-100">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};