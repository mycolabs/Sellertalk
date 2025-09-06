-- Alternative: Keep RLS enabled but with a more permissive policy
-- Use this if you prefer to keep RLS enabled for security

-- Re-enable RLS
ALTER TABLE use_case_submissions ENABLE ROW LEVEL SECURITY;

-- Create a very permissive policy for anonymous inserts
-- This policy allows ANY anonymous user to insert ANY data
CREATE POLICY "Allow anonymous inserts - permissive"
  ON use_case_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all data
CREATE POLICY "Service role full access"
  ON use_case_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read all data
CREATE POLICY "Authenticated users can read all"
  ON use_case_submissions
  FOR SELECT
  TO authenticated
  USING (true);
