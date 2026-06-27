# Feed z Facebooka — bez wtyczki Meta, przyjazny prywatności

Pobieramy posty oficjalnym Graph API po stronie serwera (Lovable Cloud), cache'ujemy je w bazie i serwujemy z naszego backendu. U czytelnika **żadnych skryptów ani ciasteczek Facebooka** — tylko nasze HTML/obrazy.

## Co dostanie czytelnik

Nowa sekcja **„Aktualności z Facebooka"** umieszczona między `WhatNextSection` a `PhotosSection` w `src/pages/Index.tsx`:

- Nagłówek + krótki opis + link do profilu.
- Siatka 9 najnowszych postów (3 kolumny na desktopie, 1 na mobile):
  - data (formatowana po polsku, „2 dni temu"),
  - tekst posta (skrócony do ~280 znaków z „czytaj dalej" → link do FB),
  - miniatura zdjęcia jeśli post je ma,
  - link „Zobacz na Facebooku".
- Spójna stylistyka z resztą strony (te same tokeny kolorów, zaokrąglenia, cienie co `MeetingSection`/karty).
- Stan ładowania (skeleton) i czytelny fallback gdy backend nie zwróci postów („Zobacz najnowsze posty na profilu →").

## Jak to działa pod spodem (część techniczna)

1. **Lovable Cloud** zostaje włączony (potrzebny do edge functions + bazy + sekretów).
2. **Sekret** `FACEBOOK_PAGE_ACCESS_TOKEN` — długoterminowy Page Access Token dla strony „Ratujmy Podjuchy". Instrukcję krok-po-kroku jak go wygenerować (Meta for Developers → aplikacja typu „Business" → Graph API Explorer → wymiana na long-lived token ~60 dni → ewentualnie never-expiring page token) dostaniesz w czacie zanim poproszę o wklejenie wartości przez bezpieczny formularz.
3. **Tabela cache** `fb_posts` (publiczny SELECT dla `anon`, INSERT/UPDATE tylko dla `service_role`):
   - `id` (FB post id, PK), `message` (text), `created_time` (timestamptz), `permalink_url`, `image_url`, `fetched_at`.
4. **Edge function `refresh-fb-feed`** (chroniona — wywoływana z cronu / ręcznie):
   - GET `https://graph.facebook.com/v21.0/me/posts?fields=id,message,created_time,permalink_url,full_picture&limit=15&access_token=…`
   - upsert do `fb_posts`, usuwa rekordy starsze niż 30 pozycji.
5. **Edge function `get-fb-feed`** (publiczna, `verify_jwt=false`): zwraca 9 najnowszych z tabeli. Frontend pobiera tylko stąd — Facebook nigdy nie jest wywoływany z przeglądarki czytelnika.
6. **Cron** w Supabase (`pg_cron`) wywołuje `refresh-fb-feed` co 30 minut. Token długoterminowy odświeżany ręcznie raz na ~60 dni (powiadomienie w README + komentarz w funkcji).
7. **Nowy komponent** `src/components/FacebookFeedSection.tsx` z fetchem do `get-fb-feed`, skeletonami i fallbackiem.

## Prywatność

- Zero skryptów Meta, zero iframe'ów `facebook.com`, zero ciasteczek third-party.
- Obrazy: domyślnie linkujemy bezpośrednio do `fbcdn.net` (lekki hit prywatności — FB widzi IP gdy obraz się ładuje). Jeśli wolisz pełną izolację, mogę dodać proxy obrazów przez edge function (cache w Supabase Storage) — daj znać.

## Pliki do zmiany / utworzenia

- `src/pages/Index.tsx` — dodanie `<FacebookFeedSection />` między `WhatNextSection` a `PhotosSection`.
- `src/components/FacebookFeedSection.tsx` — nowy.
- `supabase/functions/refresh-fb-feed/index.ts` — nowy.
- `supabase/functions/get-fb-feed/index.ts` — nowy.
- Migracja: tabela `fb_posts` + GRANTy + RLS + cron.

## Czego potrzebuję od Ciebie po zatwierdzeniu planu

1. Zgoda na włączenie Lovable Cloud (jeśli jeszcze nie jest aktywne).
2. Po moich instrukcjach — wklejenie `FACEBOOK_PAGE_ACCESS_TOKEN` w bezpieczny formularz (nie w czacie).
3. Decyzja czy proxy'ujemy obrazy przez nasz backend (pełna prywatność, większe zużycie storage), czy linkujemy bezpośrednio do CDN Facebooka (prościej, drobny ślad prywatności).
