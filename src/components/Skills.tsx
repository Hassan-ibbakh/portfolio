// src/components/Skills.tsx
import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden py-20 md:py-28 bg-background">
      <SectionBackground variant="particles" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Skills"
            title={<>Tech <span className="text-gradient">stack</span></>}
            subtitle="The tools and technologies I use to build intelligent, production-ready solutions."
          />

          {/* Flex + basis so an incomplete last row stays centered */}
          <div className="flex flex-wrap justify-center gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Reveal
                  key={category.title}
                  delay={(index % 3) * 0.08}
                  className="w-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
                >
                  <div className="service-card rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="px-3 py-1 bg-muted text-secondary-custom rounded-full text-xs font-medium border border-border"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
