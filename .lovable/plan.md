# Mapa: ukośny ruch też przesuwa suwak

## Zmiana
W `src/components/MapComparisonSection.tsx` odwrócić logikę decyzji w `handlePointerMove` dla dotyku:

- **Teraz:** suwak włącza się tylko, gdy ruch poziomy dominuje (`absX ≥ absY × 1.05`). Każdy ukośny gest „wygrywa” pionowo i przewija stronę.
- **Po zmianie:** strona przewija się tylko wtedy, gdy ruch jest praktycznie czysto pionowy (odchylenie poziome ≤ 5% pionowego, czyli `absX ≤ absY × 0.05`). W każdym innym przypadku — w tym przy gestach ukośnych — chwytamy suwak i aktualizujemy pozycję.

Próg ruchu (`MOVE_THRESHOLD = 8 px`), zachowanie myszy/pena oraz obsługa tapnięcia bez zmian.

## Plik
- `src/components/MapComparisonSection.tsx` — zamienić warunek `absX >= absY * H_DOMINANCE` na `absX > absY * 0.05` (lub równoważnie `absY * V_DOMINANCE` ze stałą `0.05`) i odwrócić gałęzie tak, by „cancelled” było tylko dla niemal czystego scrolla.

## Weryfikacja
Mobile preview: czysty swipe góra/dół scrolluje; każdy wyraźnie ukośny ruch przesuwa suwak; tap nadal ustawia suwak; desktop bez regresji.
