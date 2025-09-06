/*
# Create use case submissions table

1. New Tables
  - `use_case_submissions`
    - `id` (uuid, primary key)
    - `created_at` (timestamp)
    - `whatsapp_number` (text, required)
    - `domain` (text, required)
    - `platforms` (text array)
    - `primary_pain_point` (text, required)
    - `marketing_consent` (boolean, required)
    - `source` (text, defaults to landing_v1)
    - `iphash` (text, for rate limiting)

2. Security
  - Enable RLS on `use_case_submissions` table
  - Add policy for public insert access (form submissions)
  - Add policy for service role read access

3. Indexes
  - Index on `created_at` for analytics
  - Index on `iphash` for rate limiting
*/

CREATE TABLE IF NOT EXISTS use_case_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  whatsapp_number text NOT NULL,
  domain text NOT NULL,
  platforms text[] DEFAULT '{}',
  primary_pain_point text NOT NULL,
  marketing_consent boolean NOT NULL DEFAULT false,
  source text DEFAULT 'landing_v1',
  iphash text
);

ALTER TABLE use_case_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for form submissions
CREATE POLICY "Allow public inserts"
  ON use_case_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all data
CREATE POLICY "Service role can read all"
  ON use_case_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_submissions_created_at 
  ON use_case_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_submissions_iphash 
  ON use_case_submissions(iphash);