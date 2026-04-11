import { Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import authorPhoto from "@/assets/author.png";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring-2 ring-border overflow-hidden shadow-lg">
              <img src={authorPhoto} alt="Kamil Szostak" className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.05]" />
            </div>
            </Avatar>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Autor uwagi</span>
          </div>
          {/* Content */}

          {/* Content */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Kamil Szostak</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
              Dzieciństwo spędziłem w&nbsp;Podjuchach i&nbsp;już od najmłodszych lat pamiętam oburzenie społeczne, jakie wywoływał plan budowy osiedla TBS. Z&nbsp;wykształcenia jestem prawnikiem oraz informatykiem. Obecnie mieszkam w&nbsp;Holandii, gdzie robię doktorat w&nbsp;Law and Tech Lab na Maastricht University.
            </p>

            {/* Social links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href="mailto:kamszo@proton.me"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kamil-krzysztof-szostak/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/KKSzostak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/kamil.krzysztof.szostak/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
