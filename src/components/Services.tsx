// src/components/Services.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28 bg-background">
      <SectionBackground variant="circuit" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What I do"
            title={<>How I can <span className="text-gradient">help</span></>}
            subtitle="Bridging cutting-edge AI and practical, real-world applications."
          />

          {/* Flex + basis so the 5th card is centered instead of left alone */}
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Reveal
                  key={service.title}
                  delay={(index % 3) * 0.08}
                  className="w-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
                >
                  <div className="service-card rounded-xl p-6 h-full">
                    <div className="w-12 h-12 gradient-primary rounded-lg grid place-items-center mb-5">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-sm text-secondary-custom leading-relaxed">{service.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              to={{ pathname: "/", hash: "#contact" }}
              className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth font-medium text-lg"
            >
              Let's discuss your project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
