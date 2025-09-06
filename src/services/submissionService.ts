import { supabase, type SubmissionData } from '../lib/supabase';
import { generateIPHash } from '../utils/validation';

// Enhanced error types for better debugging
export interface SubmissionError {
  type: 'network' | 'validation' | 'auth' | 'rate_limit' | 'server' | 'unknown';
  message: string;
  details?: any;
}

export interface SubmissionResult {
  success: boolean;
  error?: SubmissionError;
  id?: string;
  retryable?: boolean;
}

// Cache for rate limit checks to reduce database calls
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced error classification
const classifyError = (error: any): SubmissionError => {
  if (!navigator.onLine) {
    return {
      type: 'network',
      message: 'No internet connection. Please check your network and try again.',
      details: error
    };
  }

  // Step 1: Update Error Message - Professional duplicate submission handling
  if (error?.code === '23505' && error?.message?.includes('unique_submission_hash')) {
    return {
      type: 'validation',
      message: 'We\'ve already received this submission. Feel free to share a different business challenge instead.',
      details: error
    };
  }

  if (error?.code === '42501' || error?.message?.includes('permission denied')) {
    return {
      type: 'auth',
      message: 'Authentication error. Please refresh the page and try again.',
      details: error
    };
  }

  if (error?.code === 'PGRST116' || error?.message?.includes('rate limit')) {
    return {
      type: 'rate_limit',
      message: 'Too many submissions. Please wait a few minutes before trying again.',
      details: error
    };
  }

  if (error?.message?.includes('fetch')) {
    return {
      type: 'network',
      message: 'Connection failed. Please check your internet and try again.',
      details: error
    };
  }

  return {
    type: 'unknown',
    message: 'Something went wrong. Please try again or contact support.',
    details: error
  };
};

export class SubmissionService {
  // Simplified connection test that doesn't require table access
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase configuration');
      return { success: false, error: 'Missing Supabase configuration' };
    }
    
    try {
      // Test auth session instead of table access
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Supabase connection test failed:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Supabase connection test error:', error);
      return { success: false, error: 'Failed to connect to database' };
    }
  }

  // Client-side rate limiting only (since we can't read from table)
  static async checkRateLimit(iphash: string): Promise<boolean> {
    try {
      // Check cache only (can't query database with anon role)
      const cached = rateLimitCache.get(iphash);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        return cached.count < 5;
      }
      
      // Allow submission if we can't check database
      return true;
    } catch (error) {
      return true;
    }
  }

  // Submit with retry logic
  static async submitFormData(
    data: Omit<SubmissionData, 'iphash' | 'source'>,
    userIP: string = '127.0.0.1'
  ): Promise<SubmissionResult> {
    return this.submitWithRetry(data, userIP, 0);
  }

  private static async submitWithRetry(
    data: Omit<SubmissionData, 'iphash' | 'source'>,
    userIP: string,
    attempt: number
  ): Promise<SubmissionResult> {
    try {
      // Test connection on first attempt
      if (attempt === 0) {
        const connectionTest = await this.testConnection();
        if (!connectionTest.success) {
          return {
            success: false,
            error: {
              type: 'auth',
              message: 'Unable to connect to our servers. Please refresh the page and try again.',
              details: connectionTest.error
            },
            retryable: true
          };
        }
      }

      const iphash = await generateIPHash(userIP);
      
      // Simple client-side rate limiting
      const canSubmit = await this.checkRateLimit(iphash);
      if (!canSubmit) {
        return {
          success: false,
          error: {
            type: 'rate_limit',
            message: 'You\'ve submitted too many requests. Please wait 5 minutes before trying again.'
          },
          retryable: false
        };
      }

      // Generate submission hash
      const submissionHash = btoa(
        `${data.whatsapp_number.toLowerCase().trim()}|${data.domain.toLowerCase().trim()}|${data.primary_pain_point.toLowerCase().trim()}`
      );

      const submissionData = {
        whatsapp_number: data.whatsapp_number,
        domain: data.domain,
        platforms: data.platforms || [],
        primary_pain_point: data.primary_pain_point,
        marketing_consent: data.marketing_consent,
        iphash,
        source: 'landing_v1',
        submission_hash: submissionHash
      };


      const { error } = await supabase
        .from('use_case_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Supabase submission error:', error);
        const classifiedError = classifyError(error);
        
        // Retry for certain error types
        if (attempt < MAX_RETRIES && (classifiedError.type === 'network' || classifiedError.type === 'auth')) {
          await delay(RETRY_DELAY * (attempt + 1));
          return this.submitWithRetry(data, userIP, attempt + 1);
        }
        
        return {
          success: false,
          error: classifiedError,
          retryable: attempt < MAX_RETRIES
        };
      }

      
      // Update cache after successful submission
      const cached = rateLimitCache.get(iphash);
      if (cached) {
        rateLimitCache.set(iphash, { 
          count: cached.count + 1, 
          timestamp: cached.timestamp 
        });
      } else {
        rateLimitCache.set(iphash, { 
          count: 1, 
          timestamp: Date.now() 
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Submission error:', error);
      const classifiedError = classifyError(error);
      
      if (attempt < MAX_RETRIES && classifiedError.type === 'network') {
        await delay(RETRY_DELAY * (attempt + 1));
        return this.submitWithRetry(data, userIP, attempt + 1);
      }
      
      return {
        success: false,
        error: classifiedError,
        retryable: attempt < MAX_RETRIES
      };
    }
  }
}