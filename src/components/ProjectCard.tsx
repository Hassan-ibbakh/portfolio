// src/components/ProjectCard.tsx
// Shared by the home page (featured projects) and the /projects page.
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Project } from "@/data/projects";
import Tilt from "@/components/Tilt";

const MAX_TAGS = 4;

const TechTag = ({ children }: { children: string }) => (
  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
    {children}
  </span>
);

const ProjectLinks = ({ project }: { project: Project }) => (
  <>
    {project.github && (
      <Button asChild variant="outline" size="sm">
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          <Github />
          Code
        </a>
      </Button>
    )}
    {project.demo && (
      <Button asChild variant="outline" size="sm">
        <a href={project.demo} target="_blank" rel="noopener noreferrer">
          <ExternalLink />
          Live demo
        </a>
      </Button>
    )}
  </>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const extraTags = project.tech.length - MAX_TAGS;

  return (
    <Dialog>
      <Tilt max={6} className="h-full rounded-lg">
      <Card className="service-card card-interactive group overflow-hidden flex flex-col h-full">
        <DialogTrigger asChild>
          <button
            type="button"
            className="relative block overflow-hidden aspect-[3/2] bg-secondary text-left"
            aria-label={`Open details for ${project.title}`}
          >
            <img
              src={project.image}
              alt=""
              width={1280}
              height={853}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            {project.metric && (
              <span className="absolute left-3 bottom-3 px-2.5 py-1 rounded-md bg-background/85 backdrop-blur text-xs font-semibold text-github-success border border-border">
                {project.metric}
              </span>
            )}
          </button>
        </DialogTrigger>

        <CardContent className="p-6 flex flex-col flex-grow">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-custom mb-2">
            {project.category}
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-secondary-custom text-sm leading-relaxed mb-5 line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, MAX_TAGS).map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
            {extraTags > 0 && (
              <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                +{extraTags}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            <DialogTrigger asChild>
              <Button size="sm" className="group/btn">
                View details
                <ArrowUpRight className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </DialogTrigger>
            <ProjectLinks project={project} />
          </div>
        </CardContent>
      </Card>
      </Tilt>

      <DialogContent className="bg-card border-border text-foreground sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          width={1280}
          height={853}
          className="w-full aspect-[3/2] object-cover sm:rounded-t-lg"
        />
        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-2 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {project.category}
              {project.metric && <span className="text-github-success"> · {project.metric}</span>}
            </p>
            <DialogTitle className="text-2xl font-display leading-tight pr-6">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-secondary-custom leading-relaxed text-sm md:text-base">
              {project.fullDescription}
            </DialogDescription>
          </DialogHeader>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
          </div>
          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-2 pt-1">
              <ProjectLinks project={project} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
