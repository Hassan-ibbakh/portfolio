// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { user } from "@/data/user";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // "/#id" links work from every page (including /projects), not only from the home page
  const quickLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "portfolio" },
    { name: "Skills", id: "skills" },
    { name: "Journey", id: "education" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: Github, href: user.social.github, label: "GitHub", external: true },
    { icon: Linkedin, href: user.social.linkedin, label: "LinkedIn", external: true },
    { icon: Mail, href: `mailto:${user.email}`, label: "Email", external: false },
  ];

  return (
    <footer className="bg-card border-t border-border pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                <span className="grid place-items-center w-9 h-9 rounded-lg gradient-primary text-primary-foreground text-sm font-display font-bold">
                  {user.about.initials}
                </span>
                <span className="text-lg font-display font-bold text-foreground">{user.name}</span>
              </Link>
              <p className="text-sm text-secondary-custom leading-relaxed max-w-sm">
                {user.title} — building intelligent systems in Computer Vision, NLP and Generative AI.
              </p>
            </div>

            <nav aria-label="Footer">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Navigate</h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={{ pathname: "/", hash: `#${link.id}` }}
                      className="text-sm text-secondary-custom hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Connect</h4>
              <p className="text-sm text-secondary-custom mb-4">Let's discuss your next project.</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="w-10 h-10 bg-secondary rounded-lg grid place-items-center text-secondary-custom transition-smooth hover:text-primary hover:-translate-y-0.5"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col-reverse sm:flex-row gap-4 justify-between items-center">
            <p className="text-muted-custom text-sm">
              © {currentYear} {user.name}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 text-sm text-secondary-custom hover:text-primary transition-smooth"
            >
              Back to top
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
