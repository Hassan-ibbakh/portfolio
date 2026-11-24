// src/components/About.tsx
import { user } from "@/data/user";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const highlights = [
  { value: `${projects.length}`, label: "AI projects built" },
  { value: "96.5%", label: "Top model accuracy" },
  { value: "M.Sc.", label: "AI & Data Science" },
  { value: "Prod", label: "RAG assistant deployed" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
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
                <div key={item.label} className="service-card rounded-xl p-5">
                  <p className="font-display text-3xl font-bold text-gradient mb-1">{item.value}</p>
                  <p className="text-sm text-muted-custom leading-snug">{item.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
