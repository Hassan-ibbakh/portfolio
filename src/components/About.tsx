// src/components/About.tsx
import { user } from "@/data/user";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import CountUp from "@/components/CountUp";
import SectionBackground from "@/components/SectionBackground";

const highlights = [
  { value: <CountUp value={projects.length} />, label: "AI projects built" },
  { value: <CountUp value={96.5} decimals={1} suffix="%" />, label: "Top model accuracy" },
  { value: "M.Sc.", label: "AI & Data Science" },
  { value: "Prod", label: "RAG assistant deployed" },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28 bg-background">
      <SectionBackground variant="dots" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="About" title={<>About <span className="text-gradient">me</span></>} />

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
            <Reveal className="space-y-5">
              {user.about.long.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-secondary-custom leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <Tilt key={item.label} max={10} className="rounded-xl">
                  <div className="service-card rounded-xl p-5 h-full transition-colors hover:border-primary/50">
                    <p className="font-display text-3xl font-bold text-gradient mb-1 tabular-nums">{item.value}</p>
                    <p className="text-sm text-muted-custom leading-snug">{item.label}</p>
                  </div>
                </Tilt>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
