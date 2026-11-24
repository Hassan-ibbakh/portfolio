// src/components/Typewriter.tsx
// Types and erases each word in turn. Screen readers get the full list once;
// users who prefer reduced motion see the words as a static list.
import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
}

const Typewriter = ({ words, className }: TypewriterProps) => {
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1600; // pause on the full word
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduceMotion]);

  if (reduceMotion) return <span className={className}>{words.join(" · ")}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[2px] h-[1em] align-[-0.12em] bg-primary animate-caret" />
      </span>
    </span>
  );
};

export default Typewriter;
