import { Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import authorPhoto from "@/assets/author.png";

const socialLinks = [
  { href: "mailto:kamszo@proton.me", icon: Mail, title: "Email" },
  { href: "https://www.linkedin.com/in/kamil-krzysztof-szostak/", icon: Linkedin, title: "LinkedIn" },
  { href: "https://x.com/KKSzostak", icon: Twitter, title: "X (Twitter)" },
  { href: "https://www.facebook.com/kamil.krzysztof.szostak/", icon: Facebook, title: "Facebook" },
];

const AboutFooter = () => {
  return (
    <footer className="px-4 border-t border-border bg-primary/5 py-[16px]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm py-[30px]">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Photo */}
            <div className="w-20 h-20 rounded-full ring-2 ring-primary/20 overflow-hidden shadow-md shrink-0">
              <img
                src={authorPhoto}
                alt="Kamil Szostak"
                className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.05]"
              />
            </div>

            {/* Info */}
            <div className="text-justify flex-1">
              <p className="text-base text-muted-foreground leading-relaxed flex flex-wrap items-baseline gap-x-2 gap-y-0">
                <span className="text-lg font-bold text-foreground whitespace-nowrap">Kamil Szostak</span>
                <span className="text-border hidden sm:inline">·</span>
                <span className="uppercase tracking-wider font-bold text-primary text-sm whitespace-nowrap">AUTOR STRONY I UWAG DO PLANU OGÓLNEGO</span>
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
                Dzieciństwo spędziłem w&nbsp;Podjuchach i&nbsp;już od najmłodszych lat pamiętam oburzenie społeczne, jakie wywoływał plan budowy osiedla TBS. Z&nbsp;wykształcenia jestem prawnikiem, a także informatykiem. Obecnie robię doktorat w&nbsp;Law and Tech Lab na Maastricht University.
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-[hsl(220,70%,55%)]">↓ Śmiało pisz ↓</span>
              <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, title }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                  title={title}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
