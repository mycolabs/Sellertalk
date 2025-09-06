import React from 'react';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 mb-4">
      <p>
        We respect your privacy and will only use your WhatsApp number to send your free AI blueprint 
        and updates (if you opt-in). Your data is encrypted and never sold.{" "}
        <a 
          href="/privacy-policy" 
          className="text-blue-600 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our full Privacy Policy
        </a>
      </p>
    </div>
  );
};