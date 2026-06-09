Plan: sticky CTA, SEO, optymalizacja obrazów i skan.

1. **Sticky CTA "Podpisz petycję" na wszystkich urządzeniach**
   - Nowy komponent pływającego przycisku (`FloatingCTA.tsx`), widoczny na wszystkich breakpointach (mobile, tablet, desktop).
   - Umieszczony fixed na dole ekranu, linkuje do petycjeonline.
   - Pokazuje się dopiero po przewinięciu poza hero (np. po 200px scrollu), żeby nie zasłaniał nagłówka.

2. **SEO — meta tagi i structured data**
   - Dodać `<link rel="canonical" href="https://ratujmypodjuchy.pl/" />` w `index.html`.
   - Dodać `<meta property="og:url" content="https://ratujmypodjuchy.pl/" />` w `index.html`.
   - Dodać JSON-LD `WebSite` schema (nazwa, URL, description) w `index.html`.

3. **SEO — robots.txt i sitemap.xml**
   - Stworzyć `public/robots.txt` z `Allow: /`.
   - Stworzyć `scripts/generate-sitemap.ts` z jednym entry `/`.
   - Dodać `predev` i `prebuild` do `package.json` żeby generator uruchamiał się automatycznie.

4. **Optymalizacja obrazów (WebP)**
   - Skonwertować wszystkie JPG z `public/images/` do WebP z jakością ~80%.
   - Zaktualizować ścieżki w komponentach (`HeroSection`, `MapSection`, `PhotosSection`, `index.html` preload) z `.jpg` na `.webp`.
   - Usunąć oryginalne pliki JPG po konwersji.

5. **Skan SEO**
   - Uruchomić `seo_chat--trigger_scan` po zakończeniu powyższych zmian.

**Zakładane decyzje:**
- `public/og-image.jpg` już istnieje w poprawnym rozmiarze 1200×630 — zostawiamy bez zmian.
- Wszystkie zdjęcia terenu konwertujemy do WebP dla spójności i najlepszej wydajności.