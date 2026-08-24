import { motion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ember" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

/** Magnetic glass button with orange glow. */
export function GlassButton({
  children,
  onClick,
  variant = "ember",
  className = "",
  type = "button",
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
    });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-shadow ${
        variant === "ember"
          ? "glass-strong ember-ring text-foreground hover:shadow-[var(--shadow-ember)]"
          : "glass text-muted-foreground hover:text-foreground"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}
