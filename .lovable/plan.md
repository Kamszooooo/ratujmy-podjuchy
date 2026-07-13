Plan: suwak na mapie sam się lekko "pokiwa" po pierwszym przewinięciu sekcji `#mapa` na widok.

## Wymagania (z potwierdzonych odpowiedzi)

- Punkt startowy: domyślna pozycja 57%.
- Sekwencja: ok. 15% w lewo (42%), potem ok. 15% w prawo (72%), potem powrót do 57%.
- To tylko wskazówka — suwak wraca na pozycję wyjściową.
- Animacja uruchamia się tylko raz, przy pierwszym wejściu sekcji w viewport.
- Cel: zwrócić uwagę użytkownika, że suwak da się przesuwać.

## Modyfikacje w `src/components/MapComparisonSection.tsx`

1. **Wykrycie widoczności sekcji**
   - Dodać `useEffect` z `IntersectionObserver` obserwującym `containerRef`.
   - Próg wejścia: np. 50% widocznej powierzchni mapy (`threshold: 0.5`).
   - Wyzwalacz: sekcja musi być widoczna, obie mapy załadowane (`allLoaded`) oraz animacja jeszcze nie była uruchomiona.

2. **Stan animacji**
   - Dodać `hasHinted` jako `useRef(false)` (nie wpływa na render, wystarczy zapobiegać powtórzeniom).
   - Dodać `isHinting` jako `useRef(false)` — blokuje nadpisywanie pozycji przez gesty użytkownika podczas animacji.
   - Dodać `useRef` dla `requestAnimationFrame` ID, aby móc przerwać animację.

3. **Logika animacji**
   - Użyć `requestAnimationFrame` + własna funkcja easing (np. ease-in-out).
   - Sekwencja kroków:
     - 57% → 42% (ok. 400 ms)
     - 42% → 72% (ok. 500 ms)
     - 72% → 57% (ok. 400 ms)
   - Aktualizacja `sliderPosition` przez `setSliderPosition` w każdej klatce.
   - Po zakończeniu: `isHinting.current = false`, pozycja wraca dokładnie do 57%.

4. **Obsługa interakcji użytkownika**
   - W `handlePointerDown` (lub przy każdym zdarzeniu wskaźnika) sprawdzić `isHinting.current`. Jeśli trwa animacja — anulować `requestAnimationFrame`, ustawić `isHinting.current = false` i przekazać kontrolę użytkownikowi (jak dotychczas).
   - Dzięki temu dotknięcie/kliknięcie suwaka natychmiast przerywa wskazówkę.

5. **Dostępność**
   - Sprawdzić `window.matchMedia('(prefers-reduced-motion: reduce)')`. Jeśli użytkownik wybrał redukcję ruchu, animacja nie startuje.

## Weryfikacja

- Po zbudowaniu przewinąć stronę do sekcji mapy — suwak powinien się "pokiwać" (lewo-prawo-powrót).
- Kliknięcie/tapnięcie w suwak podczas animacji powinno ją przerwać i umożliwić ręczne przesuwanie.
- Po ponownym wyjściu i wejściu w sekcję animacja nie powinna się powtórzyć.
