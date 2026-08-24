import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/store";
import { menu } from "@/lib/menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/orders", label: "Orders" },
] as const;

export function Nav() {
  const { count, bump, setCartOpen, favorites, openDetail } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = q.trim()
    ? menu.filter((m) => m.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5)
    : [];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
        <motion.nav
          animate={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.035)",
          }}
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 shadow-[var(--shadow-float)] sm:px-6"
        >
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
            MO<span className="ember-text">OD</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground bg-white/8" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
            >
              <Search className="size-4.5" />
            </button>
            <Link
              to="/orders"
              aria-label="Favorites"
              className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
            >
              <Heart className="size-4.5" />
              {favorites.length > 0 && (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
              )}
            </Link>
            <motion.button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              key={bump}
              animate={{ scale: [1, 1.28, 0.95, 1] }}
              transition={{ duration: 0.45 }}
              className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-white/8"
            >
              <ShoppingBag className="size-4.5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </motion.button>
            <button
              aria-label="Profile"
              className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
            >
              <User className="size-4.5" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="glass-strong fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-full px-2 py-2 shadow-[var(--shadow-float)] lg:hidden">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{ className: "text-foreground bg-white/10" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="rounded-full px-3 py-2 text-xs font-medium"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-start justify-center bg-background/70 px-4 pt-28 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-xl rounded-3xl p-3 shadow-[var(--shadow-float)]"
            >
              <div className="flex items-center gap-3 px-3">
                <Search className="size-4.5 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search burgers, fries, drinks…"
                  className="w-full bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground"
                />
                <button aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="size-4.5 text-muted-foreground" />
                </button>
              </div>
              {results.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => {
                          openDetail(r.id);
                          setSearchOpen(false);
                          setQ("");
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-white/8"
                      >
                        <img src={r.image} alt="" className="size-10 object-contain" />
                        <span className="flex-1 text-sm">{r.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${r.price.toFixed(2)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
