import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';

const WA_NUMBER = '+919876543210'; // Replace with actual WhatsApp number

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  const whatsappUrl = `https://wa.me/${WA_NUMBER.replace('+', '')}?text=Hi%20team%2C%20I%20submitted%20my%20pain%20point%20on%20your%20website.%20Looking%20forward%20to%20hearing%20about%20AI%20solutions!`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold">
              Your AI Agent match is on the way!
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              We'll review your problem and ping you on WhatsApp shortly with your personalized AI automation blueprint.
            </p>
          </div>

          {/* New section encouraging multiple submissions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Have Another Business Challenge?
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              Feel free to submit another challenge. We'd love to help with all your business pain points.
            </p>
            <button
              onClick={onBackToHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Another Challenge
            </button>
          </div>


          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-all duration-300 hover:scale-105 hover:bg-slate-100 px-4 py-2 rounded-lg group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};
