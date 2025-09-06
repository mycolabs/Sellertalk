import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-slate-300">
              © 2025 SellerVoice AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#contact"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};