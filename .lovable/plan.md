Remove the "Plakaty do pobrania" (Posters) section from the landing page.

Steps:
1. Edit `src/pages/Index.tsx` — remove the `PostersSection` import and remove the `<PostersSection />` JSX element from the page layout.
2. Delete the now-unused file `src/components/PostersSection.tsx`.

No other changes to layout, styling, or remaining sections.