// src/components/CountUp.tsx
// Counts from 0 to `value` when it scrolls into view.
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const CountUp = ({ value, decimals = 0, suffix = "", duration = 1400, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    setDisplay(0);
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setDisplay(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${value.toFixed(decimals)}${suffix}`}</span>
      <span aria-hidden="true">
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
};

export default CountUp;
