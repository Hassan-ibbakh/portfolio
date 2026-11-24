import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash, key } = useLocation();

  // React Router does not scroll to "#section" by itself: handle links like "/#contact",
  // including when they come from another page (e.g. /projects).
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, key]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
