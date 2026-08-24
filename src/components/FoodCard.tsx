import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { useRef, useState } from "react";
import type { MenuItem } from "@/lib/menu";
import { defaultCustom, useShop } from "@/lib/store";

export function FoodCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { add, favorites, toggleFavorite, openDetail } = useShop();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const fav = favorites.includes(item.id);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: -((e.clientY - r.top) / r.height - 0.5) * 14,
      y: ((e.clientX - r.left) / r.width - 0.5) * 16,
    });
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{ perspective: 1000 }}
      className="group relative shrink-0 snap-center"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          boxShadow: hover
            ? "0 30px 80px -30px oklch(0.72 0.19 52 / 45%)"
            : "0 30px 70px -40px rgba(0,0,0,0.9)",
        }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="glass depth relative flex h-full w-[19rem] max-w-[80vw] flex-col rounded-3xl p-6 pt-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 ember-ring group-hover:opacity-100"
        />

        <button
          aria-label="Add to favorites"
          onClick={() => toggleFavorite(item.id)}
          className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full glass transition-transform hover:scale-110"
        >
          <Heart
            className={`size-4 ${fav ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </button>

        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onClick={() => openDetail(item.id)}
          animate={{ y: hover ? -34 : -18, scale: hover ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 15 }}
          className="mx-auto -mt-24 h-40 cursor-pointer object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]"
        />

        <button onClick={() => openDetail(item.id)} className="mt-4 text-left">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
        </button>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        <div className="mt-3 flex items-center gap-1 text-sm">
          <Star className="size-4 fill-secondary text-secondary" />
          <span className="font-medium">{item.rating}</span>
          <span className="text-muted-foreground">({item.reviews})</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl font-bold">${item.price.toFixed(2)}</span>
          <motion.button
            onClick={() => add(item, defaultCustom, item.price)}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-0 overflow-hidden rounded-full bg-[image:var(--gradient-ember)] py-3 pl-4 pr-4 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:gap-2 group-hover:pr-5"
          >
            <Plus className="size-4" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-24 group-hover:opacity-100">
              Add
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
}
