
CREATE POLICY "Public read fb post images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'fb-post-images');
CREATE POLICY "Admins upload fb post images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'fb-post-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update fb post images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'fb-post-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete fb post images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'fb-post-images' AND has_role(auth.uid(), 'admin'::app_role));
