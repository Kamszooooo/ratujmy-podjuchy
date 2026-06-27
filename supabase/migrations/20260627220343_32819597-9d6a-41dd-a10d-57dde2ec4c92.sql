
ALTER TABLE public.fb_posts ADD COLUMN IF NOT EXISTS image_urls text[] NOT NULL DEFAULT '{}';
-- backfill from existing image_url
UPDATE public.fb_posts
SET image_urls = ARRAY[image_url]
WHERE image_url IS NOT NULL AND (image_urls IS NULL OR array_length(image_urls, 1) IS NULL);
