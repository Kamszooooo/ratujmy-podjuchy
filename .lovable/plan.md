# Mapa-porównywarka: nie blokuj pionowego scrollowania na mobile

## Problem
Komponent `MapComparisonSection` ma `touch-none` i od razu przejmuje gest dotyku (`setPointerCapture` w `pointerdown`). Każde dotknięcie mapy blokuje scroll strony, nawet jeśli użytkownik chciał tylko przesunąć ekran w pionie.

## Rozwiązanie
Zmiana wyłącznie w `src/components/MapComparisonSection.tsx` — logika gestów dotyku, bez ruszania wyglądu ani innej logiki.

1. **CSS**: zamienić `touch-none` na `touch-pan-y`. Dzięki temu przeglądarka domyślnie pozwala na pionowy scroll, a my zatrzymujemy tylko poziome gesty (przesuwanie suwaka).

2. **Logika pointerów**:
   - Dla `pointerType === "mouse"` / `"pen"` — zachowanie bez zmian (od razu chwytamy suwak i pozwalamy klikać).
   - Dla `pointerType === "touch"` — wprowadzić stan „pending”:
     - W `pointerdown` zapisujemy `startX`, `startY`, `startPos = sliderPosition`, NIE robimy `setPointerCapture`, NIE zmieniamy pozycji suwaka.
     - W `pointermove` liczymy `dx = clientX − startX`, `dy = clientY − startY`. Dopóki ruch jest mniejszy niż ~8 px w dowolną stronę — czekamy.
     - Po przekroczeniu progu decydujemy:
       - jeżeli `|dx| > |dy|` z tolerancją 5% (tzn. `|dx| ≥ |dy| × 1.05`) → użytkownik przesuwa suwak: `setPointerCapture`, ustawiamy `isDragging`, aktualizujemy pozycję od tego momentu.
       - w przeciwnym razie → gest pionowy, ustawiamy flagę „cancelled” i ignorujemy resztę zdarzeń aż do `pointerup`. Strona scrolluje się normalnie (bo `touch-pan-y` na to pozwala i nie wywołujemy `preventDefault`).
   - `pointerup` / `pointercancel` resetuje wszystkie flagi.

3. **Tap (klik bez ruchu)**: jeśli użytkownik tylko stuknie w mapę (brak ruchu powyżej progu do `pointerup`), traktujemy to jak na desktopie i ustawiamy suwak w miejscu kliknięcia — żeby mapa nadal odczuwalnie reagowała na dotyk.

## Pliki
- `src/components/MapComparisonSection.tsx` — przepisać handlery `handlePointerDown/Move/Up` zgodnie z powyższym; dodać `pointercancel`; zamienić klasę `touch-none` → `touch-pan-y`.

## Weryfikacja
- Mobile (390×844) w preview: pionowy swipe rozpoczęty na mapie scrolluje stronę; poziomy swipe przesuwa suwak; tap przeskakuje suwak; obrazki nadal się ładują i pozycja startowa 80% zostaje.
- Desktop: bez regresji — przeciąganie myszą działa jak wcześniej.
