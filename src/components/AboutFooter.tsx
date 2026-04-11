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
    <footer className="py-10 px-4 border-t border-border bg-card">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Photo */}
        <div className="w-14 h-14 rounded-full ring-1 ring-border overflow-hidden shadow shrink-0">
          <img
            src={authorPhoto}
            alt="Kamil Szostak"
            className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.05]"
          />
        </div>

        {/* Info */}
        <div className="text-center sm:text-left flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Kamil Szostak</span>
            <span className="mx-1.5 text-border">·</span>
            <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground/60">Autor uwagi</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Dzieciństwo spędziłem w&nbsp;Podjuchach i&nbsp;już od najmłodszych lat pamiętam oburzenie społeczne, jakie wywoływał plan budowy osiedla TBS. Z&nbsp;wykształcenia jestem prawnikiem, a także informatykiem. Obecnie mieszkam w&nbsp;Holandii, gdzie robię doktorat w&nbsp;Law and Tech Lab na Maastricht University.
          </p>
        </div>

        {/* Social */}
        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, icon: Icon, title }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
              title={title}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
