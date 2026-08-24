import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { customLabel, useShop } from "@/lib/store";
import { GlassButton } from "./GlassButton";

export function CartPanel() {
  const { cartOpen, setCartOpen, lines, setQty, remove, total } = useShop();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-60 bg-background/60 backdrop-blur-md"
          />
          <motion.aside
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 130, damping: 20 }}
            className="glass-strong fixed inset-y-3 right-3 z-70 flex w-[min(26rem,calc(100vw-1.5rem))] flex-col rounded-3xl p-6 shadow-[var(--shadow-float)]"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your Bag</h2>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
              {lines.length === 0 && (
                <div className="mt-20 text-center text-sm text-muted-foreground">
                  <ShoppingBag className="mx-auto mb-3 size-8 opacity-40" />
                  Your bag is still empty.
                </div>
              )}
              {lines.map((l) => (
                <motion.div
                  key={l.key}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="glass flex gap-3 rounded-2xl p-3"
                >
                  <img src={l.item.image} alt="" className="size-16 object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {customLabel(l.custom)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        className="grid size-7 place-items-center rounded-full glass"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        className="grid size-7 place-items-center rounded-full glass"
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        aria-label="Remove item"
                        onClick={() => remove(l.key)}
                        className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold">
                    ${(l.unitPrice * l.qty).toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <motion.span
                  key={total}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-display text-3xl font-bold"
                >
                  ${total.toFixed(2)}
                </motion.span>
              </div>
              <GlassButton className="mt-4 w-full">Checkout</GlassButton>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
