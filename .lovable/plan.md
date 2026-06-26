## Kontekst

Rada Miasta przyjęła plan ogólny. Strona w obecnej formie jest „przedwyborcza" — mówi o nadchodzącej sesji (24 czerwca), wzywa Radę do skierowania planu do dalszych prac, pokazuje uwagi miasta jako zapowiedź. To wszystko jest już nieaktualne. Trzeba przestawić narrację z „zatrzymajmy to" na „nie odpuszczamy — walka trwa".

## Co zmieniam

### 1. `CityResponseSection.tsx` — z „zignorują" na „zignorowali"
- Czerwony badge „Już w środę, 24 czerwca" → **„Plan ogólny przyjęty"** (lub data sesji, jeśli ją znamy — domyślnie zostawiam ogólny komunikat).
- Nagłówek: „Władze miasta **planują całkowicie zignorować**…" → **„Prezydent i radni całkowicie zignorowali głos mieszkańców** w sprawie TBS-ów."
- Pod cytatem z projektu uchwały dodaję krótki akapit: uwagi nieuwzględnione, strefa 1386SW utrzymana, obniżenie wskaźnika z 1,6 do 1,2 bez znaczenia (oryginalny projekt TBS i tak ma niższą intensywność).
- Dolny czerwony pasek „Wzywamy Radę Miasta…" zmieniam na **„Nie odpuszczamy. Kontynuujemy sprzeciw — bloki na górkach jeszcze nie są przesądzone."** + krótkie wyjaśnienie, że plan dopuszcza zabudowę wielorodzinną, ale jej nie nakazuje (możliwa też zabudowa jednorodzinna / zieleń).

### 2. Nowa sekcja „Co dalej?" (między `CityResponseSection` a `PhotosSection`)
Trzy bloki:
- **Trzymamy polityków za słowo** — przypominamy publiczne deklaracje (ograniczenie skali osiedla TBS nawet o połowę, zachowanie korytarza ekologicznego Ukośna–Olkuska).
- **Plan dopuszcza, nie nakazuje** — strefa 1386SW pozwala też na zabudowę jednorodzinną i tereny zieleni; o tym, co powstanie, zdecyduje plan miejscowy i nasz nacisk.
- **Drobny sukces za autostradą** — 247 uwag dało efekt: wykreślono składy i magazyny. Dalej walczymy o strefę zieleni z usługami sportu i rekreacji zamiast strefy usługowej.

### 3. `FloatingCityReplyBanner.tsx`
Tekst „Wzywamy Radę Miasta…" → **„Plan ogólny przyjęty. Nie odpuszczamy — czytaj, co dalej."** Klik dalej scrolluje do `#city-reply`.

### 4. `ThreatSection.tsx` — drobna aktualizacja czasu
„W konsultacjach społecznych… złożyliśmy prawie tysiąc uwag. Możemy jeszcze uratować Podjuchy!" → przeformułowanie tak, by nie sugerowało, że konsultacje trwają: „Złożyliśmy prawie tysiąc uwag — miasto je zignorowało, ale walka o Podjuchy się nie kończy."

### 5. `StepsSection.tsx` — tytuł
„Złożyliśmy około **tysiąca** uwag do planu ogólnego!" zostawiam — liczby (734, 247, 1971, 99%) są nadal aktualne i mocne. Bez zmian poza ewentualną drobną korektą podtytułu, jeśli będzie potrzebna po zmianach w sekcji powyżej.

## Czego NIE ruszam

- Hero, mapa, argumenty, zdjęcia, stopka — bez zmian.
- Liczby, linki do PDF-ów, petycji, ankiety.
- Tokenów kolorów / typografii.

## Pytanie do Ciebie

Czy chcesz, żebym **usunął przyciski „Pobierz szkic uwagi"** z `StepsSection` (konsultacje się skończyły, więc szkice nie służą już do składania), czy **zostawić je jako archiwum / dowód tego, co złożyliśmy**? Domyślnie zostawiam — pokazują skalę akcji.
