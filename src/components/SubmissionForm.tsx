import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { PrivacyNotice } from './PrivacyNotice';
import { validateWhatsAppNumber, formatWhatsAppNumber } from '../utils/validation';
import { SubmissionService, type SubmissionError } from '../services/submissionService';

type FormData = {
  whatsapp_number: string;
  domain: string;
  platforms: string[];
  primary_pain_point: string;
  marketing_consent: boolean;
};

const domains = [
  'Sarees & Ethnic Wear',
  'Handicrafts & Traditional Art',
  'Regional Food Specialties',
  'Ayurvedic & Natural Products',
  'Western Clothing & Fashion',
  'Electronics & Mobile Accessories',
  'Beauty & Cosmetics',
  'Home Decor & Handicrafts',
  'Jewelry & Accessories',
  'Health & Wellness Products',
  'Digital Services & Coaching',
  'Other (specify in pain point)'
];

const platforms = ['Instagram', 'WhatsApp'];

interface SubmissionFormProps {
  onSuccess: () => void;
}

// Input sanitization helper
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmissionError | null>(null);
  const [whatsappValid, setWhatsappValid] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);
  const [showRetryOption, setShowRetryOption] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    setValue,
  } = useForm<FormData>();

  const watchedPainPoint = watch('primary_pain_point', '');
  const watchedWhatsapp = watch('whatsapp_number', '');

  // Test connection on component mount
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await SubmissionService.testConnection();
        setConnectionTested(true);
        if (!result.success) {
          setSubmitError({
            type: 'auth',
            message: 'Connection issue detected. Please refresh the page if you encounter problems submitting.',
            details: result.error
          });
        }
      } catch (error) {
        setConnectionTested(true);
        setSubmitError({
          type: 'network',
          message: 'Unable to connect to our servers. Please check your internet connection.',
        });
      }
    };
    
    testConnection();
  }, []);

  // Real-time WhatsApp validation
  React.useEffect(() => {
    if (watchedWhatsapp) {
      const isValid = validateWhatsAppNumber(watchedWhatsapp);
      setWhatsappValid(isValid);
    } else {
      setWhatsappValid(false);
    }
  }, [watchedWhatsapp]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    setShowRetryOption(false);

    try {
      // Sanitize inputs
      const sanitizedData = {
        ...data,
        whatsapp_number: formatWhatsAppNumber(data.whatsapp_number),
        domain: sanitizeInput(data.domain),
        primary_pain_point: sanitizeInput(data.primary_pain_point),
        platforms: data.platforms?.map(p => sanitizeInput(p)) || []
      };

      const result = await SubmissionService.submitFormData(sanitizedData);
      
      if (result.success) {
        onSuccess();
      } else {
        setSubmitError(result.error || {
          type: 'unknown',
          message: 'Failed to submit. Please try again.'
        });
        setShowRetryOption(result.retryable || false);
      }
    } catch (error) {
      setSubmitError({
        type: 'unknown',
        message: 'An unexpected error occurred. Please try again.'
      });
      setShowRetryOption(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Keep handleRetry Simple (unchanged - maintains form data)
  const handleRetry = () => {
    setSubmitError(null);
    setShowRetryOption(false);
    handleSubmit(onSubmit)();
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const currentPlatforms = watch('platforms') || [];
    if (checked) {
      setValue('platforms', [...currentPlatforms, platform]);
    } else {
      setValue('platforms', currentPlatforms.filter(p => p !== platform));
    }
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'network': return '🌐';
      case 'auth': return '🔒';
      case 'rate_limit': return '⏰';
      case 'validation': return '⚠️';
      default: return '❌';
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'network': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'auth': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'rate_limit': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'validation': return 'bg-gray-50 border-gray-200 text-gray-700';
      default: return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  return (
    <section id="form" className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Share Your Challenge in 60 Seconds
          </h2>
          <p className="text-xl text-slate-600">
            Help us understand your business so we can recommend the perfect AI solution.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-50 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6" autoComplete="on">
          
          {/* Connection Status Indicator */}
          {!connectionTested && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting to our servers...</span>
            </div>
          )}

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsapp_number" className="block text-sm font-semibold text-slate-700 mb-2">
              WhatsApp Number *
            </label>
            <div className="relative">
              <input
                {...register('whatsapp_number', {
                  required: 'WhatsApp number is required',
                  validate: (value) => validateWhatsAppNumber(value) || 'Please enter valid WhatsApp number'
                })}
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 min-h-[44px] ${
                  errors.whatsapp_number 
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                    : whatsappValid 
                      ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                      : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {whatsappValid && !errors.whatsapp_number && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.whatsapp_number && (
              <p className="mt-1 text-sm text-red-600">{errors.whatsapp_number.message}</p>
            )}
            {whatsappValid && !errors.whatsapp_number && (
              <p className="mt-1 text-sm text-green-600">✓ Valid WhatsApp number</p>
            )}
          </div>

          {/* Domain */}
          <div>
            <label htmlFor="domain" className="block text-sm font-semibold text-slate-700 mb-2">
              Business Domain *
            </label>
            <select
              {...register('domain', { required: 'Please select your business domain' })}
              className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 min-h-[44px] ${
                errors.domain 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select your business type</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            {errors.domain && (
              <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
            )}
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Which platforms do you use? (Optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <label key={platform} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-slate-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pain Point */}
          <div>
            <label htmlFor="primary_pain_point" className="block text-sm font-semibold text-slate-700 mb-2">
              What's your biggest pain point? *
            </label>
            <textarea
              {...register('primary_pain_point', {
                required: 'Please describe your biggest challenge',
                minLength: { value: 20, message: 'Please provide at least 20 characters' },
                maxLength: { value: 300, message: 'Please keep it under 300 characters' }
              })}
              rows={4}
              placeholder="e.g., I spend 3 hours daily answering price questions on Instagram..."
              className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 resize-none ${
                errors.primary_pain_point 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.primary_pain_point ? (
                <p className="text-sm text-red-600">{errors.primary_pain_point.message}</p>
              ) : (
                <p className="text-sm text-slate-500">Be specific - it helps us match you better</p>
              )}
              <span className={`text-sm ${watchedPainPoint.length > 280 ? 'text-red-600' : 'text-slate-400'}`}>
                {watchedPainPoint.length}/300
              </span>
            </div>
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start space-x-3 cursor-pointer min-h-[44px]">
              <input
                {...register('marketing_consent', { 
                  required: 'Please agree to receive your Blueprint & updates' 
                })}
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
              />
              <span className="text-sm text-slate-600">
                I agree to receive my Blueprint & product updates on WhatsApp (No spam)
              </span>
            </label>
            {errors.marketing_consent && (
              <p className="mt-1 text-sm text-red-600">{errors.marketing_consent.message}</p>
            )}
          </div>


          {/* Submit Error - UPDATED WITH ALL IMPLEMENTATION STEPS */}
          {submitError && (
            <div className={`${getErrorColor(submitError.type)} border px-4 py-3 rounded-lg flex items-start gap-3`}>
              <span className="text-lg">{getErrorIcon(submitError.type)}</span>
              <div className="flex-1">
                <p className="font-medium">{submitError.message}</p>
                {submitError.type === 'network' && (
                  <p className="text-sm mt-1">
                    Check your internet connection and try again.
                  </p>
                )}
                {submitError.type === 'auth' && (
                  <p className="text-sm mt-1">
                    Try refreshing the page or contact support if the issue persists.
                  </p>
                )}
                {/* Step 4: Add Visual Cue for Pain Point Field */}
                {submitError.type === 'validation' && (
                  <p className="text-sm mt-1 text-gray-600">
                    Consider adding more specific details to your pain point description.
                  </p>
                )}
                {showRetryOption && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className={`mt-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                      submitError.type === 'validation' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {submitError.type === 'validation' ? 'Submit Different Challenge' : 'Try Again'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Privacy Notice */}
          <PrivacyNotice />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 group relative overflow-hidden transform-gpu min-h-[44px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Your Blueprint...
              </>
            ) : (
              <>
                Send My Free Blueprint Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
            </span>
          </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};