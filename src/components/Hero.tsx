// src/components/Hero.tsx
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Download, Github, GraduationCap, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { user } from "@/data/user";

const Hero = () => {
  const { toast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      toast({ title: "Email copied to clipboard", description: user.email });
    } catch {
      // Clipboard can be blocked (insecure context, permissions): fall back to the mail app
      window.location.href = `mailto:${user.email}`;
    }
  };

  const socialClass =
    "grid place-items-center w-11 h-11 rounded-lg border border-border bg-card/60 text-secondary-custom transition-smooth hover:text-primary hover:border-primary/60 hover:-translate-y-0.5";

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center hero-gradient overflow-hidden pt-24 pb-20"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-github-success/30 bg-github-success/10 px-3 py-1 text-xs font-medium text-github-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-github-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-github-success" />
                </span>
                {user.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-custom">
                <MapPin className="w-3.5 h-3.5" />
                {user.location}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient">{user.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-custom font-medium mb-5 font-display">
              {user.title}
            </p>

            <ul className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6" aria-label="Specialties">
              {user.specialties.map((s) => (
                <li
                  key={s}
                  className="px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-medium text-secondary-custom"
                >
                  {s}
                </li>
              ))}
            </ul>

            <p className="text-base md:text-lg text-muted-custom max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {user.about.short}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Button asChild variant="hero" size="lg" className="text-base">
                <Link to={{ pathname: "/", hash: "#portfolio" }}>
                  View my work
                  <ArrowRight />
                </Link>
              </Button>
              {user.resume ? (
                <Button asChild variant="github" size="lg" className="text-base">
                  <a href={user.resume} download>
                    <Download />
                    Download resume
                  </a>
                </Button>
              ) : (
                <Button asChild variant="github" size="lg" className="text-base">
                  <Link to={{ pathname: "/", hash: "#contact" }}>Get in touch</Link>
                </Button>
              )}
            </div>

            <div className="flex justify-center lg:justify-start gap-3">
              <a
                href={user.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className={socialClass}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={user.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className={socialClass}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={`Copy email address ${user.email}`}
                title="Copy email"
                className={socialClass}
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 flex justify-center animate-in fade-in-0 zoom-in-95 duration-700">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[2rem] gradient-primary opacity-30 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative rounded-[2rem] p-[3px] gradient-primary">
                <img
                  src={user.about.image}
                  alt={`Portrait of ${user.name}`}
                  width={640}
                  height={640}
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[22rem] lg:h-[22rem] rounded-[calc(2rem-3px)] object-cover"
                />
              </div>
              <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-3 rounded-xl border border-border bg-card/90 backdrop-blur px-4 py-3 shadow-xl">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground leading-tight">Master's degree</p>
                  <p className="text-xs text-muted-custom">AI & Data Science</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to={{ pathname: "/", hash: "#about" }}
        aria-label="Scroll to About section"
        className="hidden md:grid absolute bottom-6 left-1/2 -translate-x-1/2 place-items-center w-10 h-10 rounded-full text-muted-custom hover:text-primary transition-smooth animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </Link>
    </section>
  );
};

export default Hero;
