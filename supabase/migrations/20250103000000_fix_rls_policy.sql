-- Fix RLS policy for use_case_submissions table
-- This migration ensures the public insert policy works correctly

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow public inserts" ON use_case_submissions;
DROP POLICY IF EXISTS "Service role can read all" ON use_case_submissions;

-- Recreate the public insert policy with explicit permissions
CREATE POLICY "Allow public inserts"
  ON use_case_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Recreate the service role read policy
CREATE POLICY "Service role can read all"
  ON use_case_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Also allow authenticated users to read their own submissions (if needed later)
CREATE POLICY "Allow authenticated users to read all"
  ON use_case_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE use_case_submissions ENABLE ROW LEVEL SECURITY;
