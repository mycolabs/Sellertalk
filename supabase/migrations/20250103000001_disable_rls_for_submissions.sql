-- Disable RLS for use_case_submissions table to allow anonymous form submissions
-- This is safe for a public form submission table

-- First, drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON use_case_submissions;
DROP POLICY IF EXISTS "Service role can read all" ON use_case_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to read all" ON use_case_submissions;

-- Disable RLS entirely for this table
-- This allows anonymous users to insert data without authentication
ALTER TABLE use_case_submissions DISABLE ROW LEVEL SECURITY;

-- Verify the change
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'use_case_submissions';
