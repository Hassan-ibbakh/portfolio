// src/components/Tilt.tsx
// 3D tilt that follows the mouse, with a soft light reflection.
// Only active with a precise pointer (mouse/trackpad) and when reduced motion is not requested.
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  glare?: boolean;
}

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Tilt = ({ children, className, max = 8, glare = true }: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !canTilt()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale3d(1.015,1.015,1.015)`;
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);
    el.style.setProperty("--glare-o", "1");
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--glare-o", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("relative transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--glare-o, 0)",
            background:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.10), transparent 55%)",
          }}
        />
      )}
    </div>
  );
};

export default Tilt;
