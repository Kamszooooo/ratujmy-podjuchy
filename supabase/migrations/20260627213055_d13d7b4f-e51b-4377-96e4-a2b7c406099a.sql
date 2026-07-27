CREATE TABLE public.fb_posts (
  id TEXT PRIMARY KEY,
  message TEXT,
  created_time TIMESTAMPTZ NOT NULL,
  permalink_url TEXT,
  image_url TEXT,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.fb_posts TO anon, authenticated;
GRANT ALL ON public.fb_posts TO service_role;

ALTER TABLE public.fb_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fb posts"
  ON public.fb_posts FOR SELECT
  USING (true);

CREATE INDEX fb_posts_created_time_idx ON public.fb_posts (created_time DESC);