CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

SELECT cron.schedule(
  'refresh-fb-feed-every-30-min',
  '*/30 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ssbpsmokkhhobnvderoz.supabase.co/functions/v1/refresh-fb-feed',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYnBzbW9ra2hob2JudmRlcm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODg1MTcsImV4cCI6MjA5ODE2NDUxN30.Un_ktVLyUmt6ruWno-SZPLgfeimjNMTEzQQ65pa9HeI'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);