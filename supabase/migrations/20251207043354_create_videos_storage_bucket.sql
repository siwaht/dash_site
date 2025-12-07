/*
  # Create Videos Storage Bucket

  1. New Storage Bucket
    - `videos` bucket for storing uploaded video files
    - Public access enabled for video playback
    - Allowed MIME types: video files only
  
  2. Security
    - Enable RLS on storage.objects
    - Add policy for authenticated users to upload videos
    - Add policy for public read access to videos
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  524288000,
  ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can view videos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can update videos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'videos')
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can delete videos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');