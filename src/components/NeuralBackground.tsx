// src/components/NeuralBackground.tsx
// Animated 3D neural network drawn on a 2D canvas (no 3D library needed):
// layers of neurons rotate in 3D, signals propagate layer by layer like a forward pass,
// and the network tilts toward the mouse. Pauses when off-screen or when the tab is hidden,
// and renders a single still frame for users who prefer reduced motion.
import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };
type Neuron = Vec3 & { layer: number; activation: number; out: number[] };
type Edge = { from: number; to: number };
type Pulse = { edge: number; t: number; speed: number };

const BLUE = [59, 130, 246];
const PURPLE = [168, 85, 247];
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const mix = (t: number) => BLUE.map((c, i) => Math.round(c + (PURPLE[i] - c) * t));
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function buildNetwork(layerSizes: number[]) {
  const neurons: Neuron[] = [];
  const edges: Edge[] = [];
  const spacing = 170;
  const radius = 150;
  const layerStart: number[] = [];

  layerSizes.forEach((n, layer) => {
    layerStart.push(neurons.length);
    const x = (layer - (layerSizes.length - 1) / 2) * spacing;
    // Sunflower distribution: evenly spread neurons on a disc
    for (let k = 0; k < n; k++) {
      const r = radius * Math.sqrt((k + 0.5) / n) * (n <= 4 ? 0.7 : 1);
      const a = k * GOLDEN_ANGLE + layer;
      neurons.push({ x, y: r * Math.cos(a), z: r * Math.sin(a), layer, activation: 0, out: [] });
    }
  });

  // Fully connect consecutive layers
  for (let layer = 0; layer < layerSizes.length - 1; layer++) {
    for (let i = 0; i < layerSizes[layer]; i++) {
      for (let j = 0; j < layerSizes[layer + 1]; j++) {
        const from = layerStart[layer] + i;
        neurons[from].out.push(edges.length);
        edges.push({ from, to: layerStart[layer + 1] + j });
      }
    }
  }
  return { neurons, edges, inputCount: layerSizes[0] };
}

const NeuralBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let isSmall = false;
    let net = buildNetwork([5, 8, 8, 8, 4]);
    let pulses: Pulse[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = width < 768;
      if (small !== isSmall) {
        isSmall = small;
        net = buildNetwork(small ? [4, 6, 6, 3] : [5, 8, 8, 8, 4]);
        pulses = [];
      }
      if (reduceMotion) draw(0);
    };

    // Mouse tilt (smoothed)
    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const spawnInputPulse = () => {
      const start = Math.floor(Math.random() * net.inputCount);
      const outs = net.neurons[start].out;
      net.neurons[start].activation = 1;
      pulses.push({ edge: outs[Math.floor(Math.random() * outs.length)], t: 0, speed: 0.6 + Math.random() * 0.5 });
    };

    const projected: { sx: number; sy: number; scale: number; depth: number }[] = [];

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);

      // Swing around a three-quarter view (a full spin would hide the layers when seen end-on)
      const rotY = 0.35 + 0.5 * Math.sin(time * 0.00018) + tilt.x * 0.35;
      const rotX = -0.2 + 0.08 * Math.sin(time * 0.00011) + tilt.y * 0.2;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // Network centered behind the portrait on large screens, centered on small ones
      const cx = width >= 1024 ? width * 0.68 : width * 0.5;
      const cy = height * (width >= 1024 ? 0.52 : 0.3);
      const worldSize = isSmall ? 560 : 900;
      const fit = Math.min(width / worldSize, height / 520) * (isSmall ? 1.1 : 1.0);
      const camera = 1400; // far camera = gentle perspective, cleaner shapes

      // Project neurons
      net.neurons.forEach((n, i) => {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;
        const p = camera / (camera + z2);
        projected[i] = { sx: cx + x1 * p * fit, sy: cy + y1 * p * fit, scale: p, depth: z2 };
      });

      const layers = Math.max(...net.neurons.map((n) => n.layer));
      const depthAlpha = (z: number) => Math.max(0.15, Math.min(1, 0.75 - z / 500));

      // Synapses
      ctx.lineWidth = 1;
      net.edges.forEach((e) => {
        const a = projected[e.from], b = projected[e.to];
        const color = mix(net.neurons[e.from].layer / layers);
        ctx.strokeStyle = rgba(color, 0.16 * depthAlpha((a.depth + b.depth) / 2));
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      });

      // Signals travelling along synapses
      pulses.forEach((p) => {
        const e = net.edges[p.edge];
        const a = projected[e.from], b = projected[e.to];
        const x = a.sx + (b.sx - a.sx) * p.t;
        const y = a.sy + (b.sy - a.sy) * p.t;
        const color = mix((net.neurons[e.from].layer + p.t) / layers);
        // lit segment behind the signal
        ctx.strokeStyle = rgba(color, 0.7);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.sx + (b.sx - a.sx) * Math.max(0, p.t - 0.25), a.sy + (b.sy - a.sy) * Math.max(0, p.t - 0.25));
        ctx.lineTo(x, y);
        ctx.stroke();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, rgba(color, 0.9));
        glow.addColorStop(1, rgba(color, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Neurons, back to front
      const order = net.neurons.map((_, i) => i).sort((i, j) => projected[j].depth - projected[i].depth);
      order.forEach((i) => {
        const n = net.neurons[i];
        const p = projected[i];
        const color = mix(n.layer / layers);
        const r = (3 + n.activation * 3) * p.scale * (isSmall ? 0.9 : 1.1);
        const alpha = depthAlpha(p.depth);
        if (n.activation > 0.05) {
          const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 6);
          halo.addColorStop(0, rgba(color, 0.45 * n.activation));
          halo.addColorStop(1, rgba(color, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(color, Math.min(1, 0.6 * alpha + n.activation * 0.5));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let raf = 0;
    let last = 0;
    let spawnClock = 0;
    let running = false;

    const step = (time: number) => {
      const dt = Math.min(0.05, (time - (last || time)) / 1000);
      last = time;

      tilt.x += (mouse.x - tilt.x) * 0.04;
      tilt.y += (mouse.y - tilt.y) * 0.04;

      spawnClock += dt;
      if (spawnClock > 0.35 && pulses.length < 45) {
        spawnClock = 0;
        spawnInputPulse();
      }

      // Advance signals; when one reaches a neuron, it fires forward (forward pass)
      const next: Pulse[] = [];
      pulses.forEach((p) => {
        p.t += p.speed * dt;
        if (p.t < 1) {
          next.push(p);
          return;
        }
        const target = net.neurons[net.edges[p.edge].to];
        target.activation = 1;
        const fanOut = target.out.length ? (Math.random() < 0.55 ? 2 : 1) : 0;
        for (let k = 0; k < fanOut && next.length < 60; k++) {
          next.push({ edge: target.out[Math.floor(Math.random() * target.out.length)], t: 0, speed: 0.6 + Math.random() * 0.5 });
        }
      });
      pulses = next;
      net.neurons.forEach((n) => (n.activation *= 0.94));

      draw(time);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduceMotion || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (reduceMotion) {
      // Still frame with a few lit neurons
      net.neurons.forEach((n, i) => (n.activation = i % 5 === 0 ? 0.8 : 0));
      draw(0);
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default NeuralBackground;
