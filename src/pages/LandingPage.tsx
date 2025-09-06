import React, { useRef, useState } from 'react';
import { Hero } from '../components/Hero';
import { Problems } from '../components/Problems';
import { Solution } from '../components/Solution';
import { HowItWorks } from '../components/HowItWorks';
import { SubmissionForm } from '../components/SubmissionForm';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { ThankYouPage } from './ThankYouPage';

export const LandingPage: React.FC = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleFormSuccess = () => {
    setShowThankYou(true);
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
  };

  if (showThankYou) {
    return <ThankYouPage onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen">
      <Hero onCTAClick={scrollToForm} />
      <Problems />
      <Solution onCTAClick={scrollToForm} />
      <HowItWorks />
      <div ref={formRef}>
        <SubmissionForm onSuccess={handleFormSuccess} />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};