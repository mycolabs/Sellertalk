import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 pb-4 mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 italic mb-8">
          Last updated: September 6, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>AI Agents for Sellers</strong> ("we," "us," or "our"). 
              This Privacy Policy explains how we collect, use, disclose, and protect your 
              personal information when you use our website and services to receive 
              personalized AI automation blueprints.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By submitting our form or using our services, you{" "}
              <span className="bg-blue-100 px-2 py-1 rounded font-semibold">
                actively consent
              </span>{" "}
              to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-700 mb-3">Personal Information You Provide:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>WhatsApp Number:</strong> Used to deliver your personalized AI blueprint</li>
              <li><strong>Business Domain:</strong> Used to understand your business type</li>
              <li><strong>Platform Preferences:</strong> Instagram, WhatsApp usage patterns</li>
              <li><strong>Pain Point Descriptions:</strong> Your specific business challenges</li>
              <li><strong>Marketing Consent:</strong> Your explicit opt-in preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Service Delivery:</strong> Generate your personalized AI blueprint</li>
              <li><strong>Communication:</strong> Send updates via WhatsApp (with consent only)</li>
              <li><strong>Personalization:</strong> Match you with tailored AI solutions</li>
              <li><strong>Security:</strong> Prevent spam, fraud, and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Correction:</strong> Update inaccurate information</li>
                <li><strong>Deletion:</strong> Request data removal</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};