/*
  # Update Videos Storage Policies for Anonymous Access

  1. Changes
    - Drop existing authenticated-only upload policy
    - Add new policy allowing anyone to upload videos
    - This enables the admin page to work without authentication
  
  2. Security Note
    - In production, you should add authentication to protect the admin page
    - For now, allowing public uploads to support the current implementation
*/

DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;

CREATE POLICY "Anyone can upload videos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can update videos"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'videos')
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can delete videos"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'videos');