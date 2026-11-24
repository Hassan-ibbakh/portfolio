// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { user } from "@/data/user";

const navLinks = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Journey" },
  { id: "services", label: "Services" },
];

const Navbar = () => {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Solid background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only)
  useEffect(() => {
    if (!isHome) {
      setActive(pathname === "/projects" ? "portfolio" : "");
      return;
    }
    const ids = [...navLinks.map((l) => l.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Close the mobile menu on navigation or Escape
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollTopIfHome = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-smooth",
        open
          ? "bg-background border-b border-border shadow-md"
          : scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border shadow-md"
            : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="container mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          onClick={scrollTopIfHome}
          className="flex items-center gap-2.5 font-display font-bold text-foreground"
          aria-label={`${user.name} — home`}
        >
          <span className="grid place-items-center w-9 h-9 rounded-lg gradient-primary text-primary-foreground text-sm">
            {user.about.initials}
          </span>
          <span className="hidden sm:inline">{user.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={{ pathname: "/", hash: `#${link.id}` }}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                  active === link.id
                    ? "text-primary bg-primary/10"
                    : "text-secondary-custom hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          {user.resume && (
            <Button asChild variant="outline" size="sm">
              <a href={user.resume} download>
                <Download />
                Resume
              </a>
            </Button>
          )}
          <Button asChild size="sm">
            <Link to={{ pathname: "/", hash: "#contact" }}>Contact me</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden grid place-items-center w-10 h-10 rounded-md text-foreground hover:bg-secondary transition-smooth"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border animate-in fade-in-0 slide-in-from-top-2">
          <ul className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={{ pathname: "/", hash: `#${link.id}` }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-medium",
                    active === link.id
                      ? "text-primary bg-primary/10"
                      : "text-secondary-custom hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 flex flex-col gap-2">
              {user.resume && (
                <Button asChild variant="outline">
                  <a href={user.resume} download>
                    <Download />
                    Download resume
                  </a>
                </Button>
              )}
              <Button asChild>
                <Link to={{ pathname: "/", hash: "#contact" }} onClick={() => setOpen(false)}>
                  Contact me
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
