// Test script to verify Supabase connection and RLS policies
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables:');
  console.error('VITE_SUPABASE_URL:', !!supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', !!supabaseAnonKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

async function testSupabase() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('use_case_submissions')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      console.error('❌ Connection test failed:', error.message);
      return;
    }

    console.log('✅ Connection test passed');

    // Test 2: Test insert (this is what's failing)
    console.log('🔍 Testing insert permissions...');
    
    const testData = {
      whatsapp_number: '+1234567890',
      domain: 'test.com',
      platforms: ['shopify'],
      primary_pain_point: 'Test submission for RLS verification',
      marketing_consent: true,
      source: 'test_script',
      iphash: 'test-hash'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('use_case_submissions')
      .insert(testData)
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message);
      console.error('Error details:', insertError);
    } else {
      console.log('✅ Insert test passed, ID:', insertData.id);
      
      // Clean up test data
      await supabase
        .from('use_case_submissions')
        .delete()
        .eq('id', insertData.id);
      console.log('🧹 Test data cleaned up');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testSupabase();
