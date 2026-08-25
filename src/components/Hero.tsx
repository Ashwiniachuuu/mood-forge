import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BurgerStack } from "@/components/BurgerStack";
import { GlassButton } from "@/components/GlassButton";
import { Spotlight, Particles, Steam } from "@/components/Atmosphere";

/** Fullscreen cinematic hero with an interactive, draggable 3D burger. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 8, y: -14 });
  const [exploded, setExploded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ px: number; py: number; tx: number; ty: number } | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stackY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  // Idle sway when the user is not interacting.
  useEffect(() => {
    if (dragging) return;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const e = (t - start) / 1000;
      setTilt({ x: 8 + Math.sin(e * 0.6) * 4, y: -14 + Math.sin(e * 0.4) * 12 });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dragging]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as Element).setPointerCapture?.(e.pointerId);
      dragRef.current = { px: e.clientX, py: e.clientY, tx: tilt.x, ty: tilt.y };
      setDragging(true);
    },
    [tilt],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setTilt({
      x: Math.max(-40, Math.min(40, d.tx - (e.clientY - d.py) * 0.35)),
      y: d.ty + (e.clientX - d.px) * 0.55,
    });
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDragging(false);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0">
        <div className="spotlight absolute inset-0" />
        <Spotlight />
        <Particles count={26} />
        <Steam />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-4">
        <motion.div
          style={{ y: copyY }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="glass ember-ring inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Flame-grilled nightly
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold leading-[0.95]">
            Taste the
            <br />
            <span className="ember-text">Future</span> of
            <br />
            Fast Food
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            Layer by layer, built in front of you. Drag the stack to spin it, tap to blow it
            apart, then order it exactly your way.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <GlassButton onClick={() => setExploded((v) => !v)}>
              {exploded ? "Rebuild stack" : "Deconstruct"}
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() =>
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore menu
            </GlassButton>
          </div>

          <dl className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
            {[
              ["4.9", "Avg rating"],
              ["12 min", "Avg delivery"],
              ["68k", "Orders served"],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="font-display text-xl font-bold">{v}</dt>
                <dd className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {k}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          style={{ y: stackY, scale: stackScale }}
          className="order-1 mx-auto w-full max-w-[26rem] lg:order-2"
        >
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={dragging ? "cursor-grabbing touch-none" : "cursor-grab touch-none"}
          >
            <BurgerStack
              exploded={exploded}
              tiltX={tilt.x}
              tiltY={tilt.y}
              scale={exploded ? 0.9 : 1}
              onClick={() => setExploded((v) => !v)}
            />
          </div>
          <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Drag to rotate · tap to deconstruct
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center text-muted-foreground"
        aria-hidden
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
