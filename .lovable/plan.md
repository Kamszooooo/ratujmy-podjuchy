## Cel

Zachować obecny układ (2 karty pobrania + szeroka karta petycji + szeroka karta ankiety), tylko ujednolicić rytm wizualny i poprawić logikę hierarchii w `src/components/StepsSection.tsx`.

## Zmiany

1. **Wspólny język liczb** — wszystkie cztery statystyki (734, 247, 1971, 99%) dostają ten sam styl: `font-extrabold tracking-tight text-primary`, ten sam wzór "duża liczba + drobna etykieta pod nią". Dziś każda wygląda inaczej.

2. **Karty pobrania (734 / 247)** — przestawiam wewnętrzną kolejność na bardziej logiczną:
   - na górze duża liczba + etykieta "złożonych uwag" (dziś jest na dole, schowana pod przyciskiem),
   - w środku tytuł terenu + krótki opis,
   - na dole przycisk "Pobierz szkic" jako jasna akcja.
   
   Dzięki temu każda karta opowiada: "tyle już złożyliśmy → o co chodzi → dołóż swoje".

3. **Karta petycji (1971)** — zostaje pełna szerokość i obecny gradient. Powiększam liczbę, dorzucam małą etykietę "Petycja mieszkańców" nad nią dla kontekstu. Ikona ludzi zostaje.

4. **Karta ankiety (99%)** — zostaje pełna szerokość i kółko postępu. Wyrównuję wielkość liczby do karty petycji, lekko stonowuję tło (`bg-muted/40`), żeby petycja pozostała wizualnym akcentem, a ankieta wyglądała jak jej spokojniejsze uzupełnienie.

5. **Rytm** — ujednolicam `gap-4` między wszystkimi blokami, takie same zaokrąglenia `rounded-2xl`, jednolite obramowania `border-border` (poza kartą petycji, która zostaje akcentowa).

## Czego nie ruszam

- Palety (forest-green tokeny z `index.css`).
- Nagłówka "Złożyliśmy około tysiąca uwag…".
- Liczby i kolejności bloków.
- Tekstów PL i linków do PDF.
- Innych sekcji strony.
