// src/components/SectionBackground.tsx
// Decorative, AI-themed section backgrounds sharing one visual language:
// faint technical patterns + soft blue/purple glows, faded at the edges.
// Place it as the first child of a `relative overflow-hidden` section.
import ParticleNetwork from "@/components/ParticleNetwork";
import { cn } from "@/lib/utils";

export type SectionBackgroundVariant = "dots" | "grid" | "particles" | "stream" | "circuit" | "waves";

const fadeEdges = "[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]";

// Printed-circuit tile (traces + pads), tinted with the primary blue
const circuitTile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
    <g fill="none" stroke="#3b82f6" stroke-width="1" stroke-linecap="round">
      <path d="M12 12h36v24h52"/><path d="M100 36v44h48"/><path d="M12 76h28v48h60"/>
      <path d="M76 0v20"/><path d="M128 104v56"/><path d="M40 124v36"/><path d="M148 12h12"/>
    </g>
    <g fill="#3b82f6">
      <circle cx="12" cy="12" r="3"/><circle cx="100" cy="36" r="3"/><circle cx="148" cy="80" r="3"/>
      <circle cx="12" cy="76" r="3"/><circle cx="100" cy="124" r="3"/><circle cx="128" cy="104" r="3"/>
    </g>
  </svg>`
);

// Seamless sine wave: 4 periods over 2400 units, translated by -50% in a loop
const wavePath = (amp: number, mid: number) => {
  let d = `M0 ${mid}`;
  for (let x = 0; x <= 2400; x += 20) d += ` L${x} ${(mid + amp * Math.sin((x / 600) * Math.PI * 2)).toFixed(1)}`;
  return d;
};

const Glow = ({ className }: { className: string }) => (
  <div className={cn("absolute rounded-full blur-3xl motion-safe:animate-aurora", className)} />
);

const streams = [
  { left: "6%", dur: "7s", delay: "0s" },
  { left: "17%", dur: "9s", delay: "2s" },
  { left: "29%", dur: "6s", delay: "4s" },
  { left: "71%", dur: "8s", delay: "1s" },
  { left: "83%", dur: "6.5s", delay: "3s" },
  { left: "94%", dur: "9.5s", delay: "5s" },
];

const SectionBackground = ({ variant }: { variant: SectionBackgroundVariant }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {variant === "dots" && (
      <>
        <div
          className={cn("absolute inset-0 opacity-[0.22]", fadeEdges)}
          style={{
            backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <Glow className="-top-24 -left-24 w-[28rem] h-[28rem] bg-primary/10" />
      </>
    )}

    {variant === "grid" && (
      <>
        <div
          className={cn("absolute inset-0 opacity-[0.11]", fadeEdges)}
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Glow className="top-10 -left-32 w-[32rem] h-[32rem] bg-blue-500/10" />
        <Glow className="bottom-0 -right-32 w-[30rem] h-[30rem] bg-purple-500/10 [animation-delay:-6s]" />
      </>
    )}

    {variant === "particles" && (
      <>
        <ParticleNetwork className={cn("absolute inset-0 w-full h-full", fadeEdges)} />
        <Glow className="top-1/3 left-[calc(50%-18rem)] w-[36rem] h-[20rem] bg-primary/[0.07]" />
      </>
    )}

    {variant === "stream" && (
      <>
        {streams.map((s) => (
          <div key={s.left} className="absolute inset-y-0 w-px bg-primary/[0.07]" style={{ left: s.left }}>
            <div
              className="absolute left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/70 to-transparent motion-safe:animate-stream"
              style={{ animationDuration: s.dur, animationDelay: s.delay }}
            />
          </div>
        ))}
        <Glow className="top-1/4 -right-24 w-[26rem] h-[26rem] bg-purple-500/10" />
      </>
    )}

    {variant === "circuit" && (
      <>
        <div
          className={cn("absolute inset-0 opacity-[0.17]", fadeEdges)}
          style={{ backgroundImage: `url("data:image/svg+xml,${circuitTile}")`, backgroundSize: "160px 160px" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[24rem] rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse" />
      </>
    )}

    {variant === "waves" && (
      <>
        <Glow className="-top-32 left-1/4 w-[34rem] h-[24rem] bg-blue-500/10" />
        <Glow className="top-1/3 -right-20 w-[26rem] h-[26rem] bg-purple-500/10 [animation-delay:-8s]" />
        <div className="absolute inset-x-0 bottom-0 h-56 [mask-image:linear-gradient(to_top,black,transparent)]">
          {[
            { amp: 28, mid: 110, color: "#3b82f6", opacity: 0.35, dur: "18s" },
            { amp: 40, mid: 120, color: "#a855f7", opacity: 0.25, dur: "26s" },
            { amp: 18, mid: 130, color: "#22d3ee", opacity: 0.2, dur: "14s" },
          ].map((w) => (
            <svg
              key={w.color}
              className="absolute bottom-0 left-0 h-full w-[200%] motion-safe:animate-wave"
              style={{ animationDuration: w.dur }}
              viewBox="0 0 2400 200"
              preserveAspectRatio="none"
            >
              <path d={wavePath(w.amp, w.mid)} fill="none" stroke={w.color} strokeOpacity={w.opacity} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          ))}
        </div>
      </>
    )}
  </div>
);

export default SectionBackground;
