import { Download, FileText, Send } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Pobierz szkic uwagi",
    description: "Przeczytaj go uważnie. Załącznik nr 4 (strony 7-8 w pliku) przedstawia szczegółową argumentację.",
    icon: Download,
    hasDownload: true,
  },
  {
    number: 2,
    title: "Wypełnij formularz",
    description: "Pamietaj o uzupełnieniu pkt 4 formularza swoimi danymi. Jeśli chcesz, możesz też dostosować uwagę do swoich preferencji.",
    icon: FileText,
    hasDownload: false,
  },
  {
    number: 3,
    title: "Złóż wniosek",
    description: "Prześlij uwagę do Biura Planowania Przestrzennego Miasta. Możesz to zrobić:\n- mailowo (bppm@um.szczecin.pl);\n- przez system e-Doręczeń; albo\n- w formie papierowej (Biuro Planowania Przestrzennego Miasta, ul. Karola Szymanowskiego 2, 71-416 Szczecin).\n\nJeśli składasz na papierze, pamiętaj o podpisie w pkt 10 formularza.",
    icon: Send,
    hasDownload: false,
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Zadziałaj!
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Złóż uwagę do planu ogólnego w&nbsp;trzech prostych krokach
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-start mb-16 last:mb-0">
              {/* Circle on timeline */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
              </div>

              {/* Content card */}
              <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground font-sans">Krok {step.number}: {step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{step.description}</p>

                  {step.hasDownload && (
                    <a href="/files/Szkic_uwagi.docx" download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform hover:scale-105">
                      <Download className="w-5 h-5" />
                      Pobierz szkic uwagi (DOCX)
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
