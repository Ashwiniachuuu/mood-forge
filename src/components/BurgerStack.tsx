import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bunTop from "@/assets/layer-bun-top.png";
import lettuce from "@/assets/layer-lettuce.png";
import cheese from "@/assets/layer-cheese.png";
import patty from "@/assets/layer-patty.png";
import veg from "@/assets/layer-veg.png";
import bunBottom from "@/assets/layer-bun-bottom.png";

type Props = {
  exploded?: boolean;
  extraCheese?: boolean;
  extraPatty?: boolean;
  bacon?: boolean;
  scale?: number;
  tiltX?: number;
  tiltY?: number;
  onClick?: () => void;
  className?: string;
};

type Layer = {
  key: string;
  src: string;
  y: number;
  boom: number;
  z: number;
  w: number;
  drift?: number;
};

export function BurgerStack({
  exploded = false,
  extraCheese = false,
  extraPatty = false,
  bacon = false,
  scale = 1,
  tiltX = 0,
  tiltY = 0,
  onClick,
  className = "",
}: Props) {
  const layers: Layer[] = [
    { key: "bun-top", src: bunTop, y: -132, boom: -150, z: 60, w: 96 },
    ...(extraCheese
      ? [{ key: "cheese-extra", src: cheese, y: -96, boom: -78, z: 52, w: 84 }]
      : []),
    { key: "lettuce", src: lettuce, y: -70, boom: -46, z: 44, w: 98, drift: -26 },
    { key: "cheese", src: cheese, y: -44, boom: -8, z: 36, w: 84 },
    { key: "patty", src: patty, y: -6, boom: 40, z: 28, w: 88 },
    ...(bacon
      ? [{ key: "bacon", src: veg, y: 20, boom: 76, z: 22, w: 76, drift: 24 }]
      : []),
    ...(extraPatty
      ? [{ key: "patty-extra", src: patty, y: 34, boom: 104, z: 18, w: 88 }]
      : []),
    { key: "veg", src: veg, y: 56, boom: 132, z: 12, w: 82, drift: 20 },
    { key: "bun-bottom", src: bunBottom, y: 96, boom: 168, z: 0, w: 94 },
  ];

  return (
    <motion.div
      onClick={onClick}
      className={`relative aspect-square w-full depth ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ perspective: 1400 }}
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <motion.div
        className="absolute inset-0 depth"
        animate={{ rotateX: tiltX, rotateY: tiltY }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.7 }}
      >
        {layers.map((l, i) => (
          <motion.img
            key={l.key}
            src={l.src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute left-1/2 top-1/2 select-none"
            style={{
              width: `${l.w}%`,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 40 - i,
              filter: "drop-shadow(0 26px 34px rgba(0,0,0,0.55))",
            }}
            animate={{
              y: (exploded ? l.boom : l.y) * 0.75,
              x: exploded ? (l.drift ?? 0) : 0,
              rotate: exploded ? (l.drift ?? 0) / 6 : 0,
              scale: exploded ? 1.02 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              delay: exploded ? i * 0.035 : (layers.length - i) * 0.03,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
