// src/pages/ProjectsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects, projectCategories, ProjectCategory } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import SectionBackground from "@/components/SectionBackground";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

const ProjectsPage = () => {
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Projects — Hassan Ibbakh";
    return () => {
      document.title = "Hassan Ibbakh — AI & Machine Learning Engineer";
    };
  }, []);

  const filters: { label: Filter; count: number }[] = useMemo(
    () => [
      { label: "All", count: projects.length },
      ...projectCategories.map((c) => ({
        label: c,
        count: projects.filter((p) => p.category === c).length,
      })),
    ],
    []
  );

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="relative overflow-hidden pt-28 pb-20 md:pb-28">
        <SectionBackground variant="grid" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-secondary-custom hover:text-primary transition-smooth mb-8"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>

            <SectionHeader
              as="h1"
              eyebrow="Portfolio"
              title={<>All <span className="text-gradient">projects</span></>}
              subtitle="A complete collection of my work in AI, data and software development."
            />

            <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter projects by category">
              {filters.map(({ label, count }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilter(label)}
                  aria-pressed={filter === label}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-smooth",
                    filter === label
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-secondary-custom hover:border-primary/60 hover:text-foreground"
                  )}
                >
                  {label}
                  <span className={cn("ml-1.5 text-xs", filter === label ? "opacity-80" : "text-muted-custom")}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visible.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
