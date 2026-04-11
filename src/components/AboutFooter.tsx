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
    <footer className="py-16 px-4 bg-gradient-to-b from-card to-primary/8">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary text-center mb-6">
          O autorze uwagi
        </p>

        <div className="bg-background/80 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Photo */}
            <div className="w-24 h-24 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-background overflow-hidden shadow-lg shrink-0">
              <img
                src={authorPhoto}
                alt="Kamil Szostak"
                className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.05]"
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="text-lg font-bold text-foreground">Kamil Szostak</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Dzieciństwo spędziłem w&nbsp;Podjuchach i&nbsp;już od najmłodszych lat pamiętam oburzenie społeczne, jakie wywoływał plan budowy osiedla TBS. Z&nbsp;wykształcenia jestem prawnikiem, a także informatykiem. Obecnie mieszkam w&nbsp;Holandii, gdzie robię doktorat w&nbsp;Law and Tech Lab na Maastricht University.
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 shrink-0">
              {socialLinks.map(({ href, icon: Icon, title }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 hover:text-primary text-muted-foreground transition-colors"
                  title={title}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
