// src/components/Education.tsx
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

const Education = () => {
  return (
    <section id="education" className="relative overflow-hidden py-20 md:py-28 bg-secondary/30">
      <SectionBackground variant="stream" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Journey"
            title={<>Education & <span className="text-gradient">background</span></>}
            subtitle="The academic path that shaped my expertise."
          />

          {/* Left-aligned timeline: the line and markers sit in the left gutter on every screen size */}
          <ol className="relative border-l-2 border-primary/25 ml-5 space-y-10">
            {education.map((item, index) => (
              <li key={item.degree} className="relative pl-10">
                <span
                  className="absolute -left-[1.3rem] top-5 grid place-items-center w-10 h-10 rounded-full bg-background border-2 border-primary text-primary"
                  aria-hidden="true"
                >
                  <GraduationCap className="w-5 h-5" />
                </span>
                <Reveal delay={index * 0.08}>
                  <div className="service-card rounded-xl p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {item.year}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{item.degree}</h3>
                    <p className="text-sm text-secondary-custom font-medium mb-3">{item.school}</p>
                    <p className="text-sm text-muted-custom leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Education;
