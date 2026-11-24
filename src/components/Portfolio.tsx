// src/components/Portfolio.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

const Portfolio = () => {
  const featuredProjects = projects.filter((project) => project.isFeatured);

  return (
    <section id="portfolio" className="relative overflow-hidden py-20 md:py-28 bg-secondary/30">
      <SectionBackground variant="grid" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Selected work"
            title={<>Featured <span className="text-gradient">projects</span></>}
            subtitle="A selection of AI systems I designed, trained and shipped — from medical imaging to production RAG assistants."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/projects">
                View all {projects.length} projects
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
