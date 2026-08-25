import { useEffect, useMemo, useState } from "react";

/** Warm volumetric spotlight + fog behind hero objects. */
export function Spotlight({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-[90px]" />
    </div>
  );
}

/** Floating food particles / embers. */
export function Particles({ count = 22 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.5,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-secondary"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 12px currentColor",
            animation: `float-soft ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Rising steam wisps. */
export function Steam() {
  const wisps = [0, 1, 2, 3];
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto h-64 w-1/2"
      aria-hidden
    >
      {wisps.map((i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-white/25 blur-xl"
          style={{
            left: `${20 + i * 20}%`,
            width: 60,
            height: 60,
            animation: `steam-rise ${7 + i}s ease-out ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Light rays for the final CTA. */
export function LightRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 h-[130vh] w-[7vw] origin-top bg-gradient-to-b from-primary/30 to-transparent blur-2xl"
          style={{
            transform: `translate(-50%,-50%) rotate(${-54 + i * 18}deg)`,
            animation: `ray-pulse ${5 + i}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
