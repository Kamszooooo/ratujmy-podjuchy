import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ArgumentsInfographic from "./ArgumentsInfographic";

const ArgumentsSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-12 pt-2 px-4">
      <Collapsible open={open} onOpenChange={setOpen}>
          <ArgumentsInfographic />
          <div className="max-w-xl mx-auto flex justify-center">
            <CollapsibleTrigger className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-base md:text-lg font-semibold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all group">
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
              Przeczytaj pełne uzasadnienie uwag
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-5 md:p-6 text-sm md:text-base text-muted-foreground leading-relaxed space-y-3">
              {/* Wstęp */}
              <p>
                Niniejsza uwaga dotyczy terenu oznaczonego w&nbsp;projekcie planu symbolem 1386SW „strefa wielofunkcyjna z&nbsp;zabudową mieszkaniową wielorodzinną". Teren ten z&nbsp;trzech stron, tj.&nbsp;od strony ul.&nbsp;Sąsiedzkiej, Olkuskiej i&nbsp;Wschodniej, graniczy ze strefą zabudowy jednorodzinnej 872SJ, natomiast od strony autostrady A6 graniczy z&nbsp;położoną wzdłuż niej strefą zieleni i&nbsp;rekreacji (401SN). Przedmiotowy teren przecina ul.&nbsp;Ukośna, oddzielając:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>grunty, na których Szczecińskie TBS zamierza wybudować osiedle bloków mieszkalnych liczące 560 mieszkań (między ul.&nbsp;Ukośną a&nbsp;autostradą), oraz</li>
                <li>grunty, których właścicielem jest bezpośrednio Gmina Miasto Szczecin i&nbsp;obecnie nie są wobec nich znane żadne plany inwestycyjne (między ul.&nbsp;Ukośną a&nbsp;ul.&nbsp;Olkuską).</li>
              </ul>
              <p>
                Na całym obszarze strefy 1386SW projekt planu ustala współczynnik intensywności zabudowy na&nbsp;1.6, natomiast minimalny udział powierzchni biologicznie czynnej na&nbsp;30%.
              </p>

              <p className="font-semibold text-foreground">Postulowane rozwiązania przewidują:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  ograniczenie obszaru, na którym dopuszczona będzie zabudowa wielorodzinna, do działek 13/1 i&nbsp;14 (ob.&nbsp;128) położonych w&nbsp;północnej części obszaru (Sąsiedzka 17, Sąsiedzka 18), a&nbsp;także przeznaczenie pozostałej części przedmiotowego terenu pod:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>zabudowę mieszkaniową jednorodzinną – teren wzdłuż ul.&nbsp;Wschodniej i&nbsp;południowo-zachodniej części ul.&nbsp;Ukośnej oraz teren wzdłuż południowo-wschodniej części ul.&nbsp;Sąsiedzkiej;</li>
                    <li>zieleni i&nbsp;rekreacji – teren obejmujący strome wzgórza oraz teren lasów (zwłaszcza między ul.&nbsp;Ukośną a&nbsp;ul.&nbsp;Olkuską);</li>
                  </ul>
                </li>
                <li>wyłączenie całego przedmiotowego terenu ze strefy uzupełnienia zabudowy.</li>
              </ul>

              <p>
                Za proponowanymi rozwiązaniami przemawiają między innymi: wymagania ładu przestrzennego, uwarunkowania przyrodnicze oraz ograniczenia infrastrukturalne.
              </p>

              {/* Sekcja 1 */}
              <p className="text-sm md:text-base font-semibold text-foreground/80 pt-1 uppercase tracking-wide">1. Wymagania ładu przestrzennego</p>
              <p>
                Zasadniczym aspektem, który należy brać pod uwagę w&nbsp;planowaniu przestrzennym są wymagania ładu przestrzennego oraz walory architektoniczne i&nbsp;krajobrazowe (art.&nbsp;1 ust.&nbsp;2 pkt&nbsp;1 i&nbsp;2 ustawy o&nbsp;planowaniu i&nbsp;zagospodarowaniu przestrzennym). Nowa zabudowa powinna zasadniczo kontynuować funkcję i&nbsp;formę zabudowy sąsiedniej. Przedmiotowy teren z&nbsp;trzech stron otoczony jest strefą zabudowy jednorodzinnej 872SJ. W&nbsp;jego bezpośredniej bliskości, po przeciwległych stronach ul.&nbsp;Wschodniej, Olkuskiej i&nbsp;Sąsiedzkiej usytuowana jest zwarta zabudowa jednorodzinna. Patrząc szerzej, charakter jednorodzinny ma większa część terenów górnej części Podjuch.
              </p>
              <p>
                Wymogi ładu przestrzennego nakazują dostosowanie skali nowej zabudowy do skali zabudowy istniejącej w&nbsp;sąsiedztwie. Postulowane rozwiązania przewidują przeznaczenie pod zabudowę wielorodzinną tylko niewielką część strefy 1386SW, tj.&nbsp;działki 13/1 i&nbsp;14 zabudowane dwoma przedwojennymi domami (przy ul.&nbsp;Sąsiedzkiej 17 i&nbsp;18), które pomimo swej willowej formy mają charakter wielorodzinny.
              </p>
              <p>
                Wprowadzenie zabudowy jednorodzinnej na przedmiotowym terenie zgodne jest z&nbsp;oczekiwaniami społecznymi. Badanie ankietowe przeprowadzone przez Radę Osiedla Podjuchy na grupie 474 mieszkańców Podjuch wskazało, że prawie 99% z&nbsp;nich (469 z&nbsp;474) preferuje na tym obszarze zabudowę jednorodzinną. Takie stanowisko zajęła też Rada Osiedla Podjuchy w&nbsp;uchwale 194/19 z&nbsp;dnia 3&nbsp;kwietnia 2019&nbsp;r.
              </p>

              {/* Sekcja 2 */}
              <p className="text-sm md:text-base font-semibold text-foreground/80 pt-1 uppercase tracking-wide">2. Uwarunkowania przyrodnicze</p>
              <p>
                Znaczna część przedmiotowego terenu zajmują wzgórza oraz lasy. Ochrona środowiska, obejmująca także ochronę istniejącej rzeźby terenu i&nbsp;roślinności, powinna być zasadniczym aspektem branym pod uwagę podczas planowania przestrzennego (art.&nbsp;1 ust.&nbsp;2 pkt&nbsp;3 ustawy o&nbsp;planowaniu przestrzennym oraz art.&nbsp;8 ustawy – Prawo ochrony środowiska).
              </p>
              <p>
                Na przedmiotowym terenie znajduje się kilka szczytów wzgórz o&nbsp;walorach widokowych. Niniejsza uwaga obejmuje wszystkie obszary pokryte stromymi zboczami, a&nbsp;także obszary z&nbsp;obecnością lasów. W&nbsp;szczególności wyłącza spod zabudowy znaczną część obszaru między ul.&nbsp;Ukośną a&nbsp;ul.&nbsp;Olkuską, na którym istnieje duży, zwarty obszar zalesiony oraz przepływa strumień.
              </p>
              <p>
                Obszar objęty niniejszą uwagą położony jest w&nbsp;otulinie Szczecińskiego Parku Krajobrazowego „Puszcza Bukowa". Plan ochrony Parku stanowi, iż w&nbsp;celu eliminacji zagrożeń zewnętrznych w&nbsp;zakresie gospodarki przestrzennej należy ograniczyć lokalizowanie nowej zabudowy „pogarszającej walory krajobrazowe i&nbsp;przyrodnicze parku". W&nbsp;szczególności dotyczy to zabudowy na „zboczach o&nbsp;nachyleniu powyżej 20%" oraz na „terenach i&nbsp;punktach widokowych eksponowanych w&nbsp;krajobrazie".
              </p>

              {/* Sekcja 3 */}
              <p className="text-sm md:text-base font-semibold text-foreground/80 pt-1 uppercase tracking-wide">3. Ograniczenia infrastrukturalne</p>
              <p>
                Przeznaczenie całości przedmiotowego terenu pod zabudowę wielorodzinną spowodowałoby komunikacyjny paraliż tej części miasta. Szczecińskie TBS planuje budowę osiedla na 560 mieszkań. Obsługę komunikacyjną wzmożonego ruchu samochodowego miałyby zapewniać ul.&nbsp;Sąsiedzka, ul.&nbsp;Wschodnia oraz ul.&nbsp;Żeliwna – lokalne ulice osiedlowe. Wtłoczenie do nich wzmożonego ruchu (zwłaszcza w&nbsp;godzinach szczytu) prowadziłoby do zatorów drogowych.
              </p>
              <p>
                Położenie terenu w&nbsp;górnej części Podjuch sprawia, że jest on słabo skomunikowany z&nbsp;centrum miasta komunikacją publiczną. Dojście ze stacji SKM Podjuchy zajmuje ok.&nbsp;25 minut, natomiast z&nbsp;przystanku Szlamowa ok.&nbsp;21 minut. W&nbsp;pobliżu kursuje autobus 904, jednak ma on charakter transportu „na żądanie".
              </p>
              <p>
                Wątpliwości budzi też gotowość infrastruktury przesyłowej do przyjęcia presji ze strony dużej liczby nowych mieszkańców. W&nbsp;szczególności dotyczy to infrastruktury wodociągowej i&nbsp;kanalizacyjnej Podjuch, która w&nbsp;dużej części pochodzi z&nbsp;połowy ubiegłego stulecia.
              </p>

              {/* Sekcja 4 */}
              <p className="text-sm md:text-base font-semibold text-foreground/80 pt-1 uppercase tracking-wide">4. Podsumowanie</p>
              <p>
                Przedstawione wyżej względy ładu przestrzennego, ochrony środowiska, a&nbsp;także ograniczenia infrastrukturalne i&nbsp;oczekiwania społeczne przemawiają za wprowadzeniem wnioskowanych zmian w&nbsp;projekcie planu, tj.&nbsp;wyłączeniem znacznej większości strefy 1386SW spod zabudowy wielorodzinnej.
              </p>
              <p>
                Zakres terenów, które powinny być przyłączone do sąsiedniej strefy zabudowy jednorodzinnej (872SJ) oraz do sąsiedniej strefy zieleni i&nbsp;rekreacji (401SN) przedstawiono graficznie w&nbsp;załączniku nr&nbsp;2.
              </p>
              <p>
                Przed rozpoczęciem wszelkich inwestycji powinno nastąpić przyjęcie miejscowego planu zagospodarowania przestrzennego, aby zapewnić najwyższe standardy urbanistyczne. Dlatego też niniejsza uwaga postuluje wyłączenie całego przedmiotowego obszaru ze strefy uzupełnienia zabudowy.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
    </section>
  );
};

export default ArgumentsSection;
