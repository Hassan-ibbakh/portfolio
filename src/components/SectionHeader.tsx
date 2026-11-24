// src/components/SectionHeader.tsx
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  /** Use "h1" when the header is the main title of the page. */
  as?: "h1" | "h2";
}

const SectionHeader = ({ eyebrow, title, subtitle, as: Heading = "h2" }: SectionHeaderProps) => (
  <Reveal className="text-center mb-14 md:mb-16">
    <p className="eyebrow mb-4">
      <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
      {eyebrow}
      <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
    </p>
    <Heading className="text-3xl md:text-5xl font-bold mb-4 text-foreground">{title}</Heading>
    {subtitle && (
      <p className="text-base md:text-lg text-muted-custom max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
