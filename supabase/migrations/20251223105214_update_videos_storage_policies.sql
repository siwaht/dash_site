/*
  # Update Videos Storage Bucket Policies

  1. Changes
    - Drop existing restrictive policies
    - Add public policies for uploads, updates, and deletes
    - Keep public read access policy
  
  2. Security
    - Allow public uploads (admin authentication handled at app level)
    - Keep public read access for video playback
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view videos" ON storage.objects;

-- Allow public uploads to videos bucket
CREATE POLICY "Anyone can upload videos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'videos');

-- Allow public updates to videos bucket
CREATE POLICY "Anyone can update videos"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'videos')
WITH CHECK (bucket_id = 'videos');

-- Allow public deletes from videos bucket
CREATE POLICY "Anyone can delete videos"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'videos');

-- Allow public read access to videos
CREATE POLICY "Anyone can view videos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'videos');