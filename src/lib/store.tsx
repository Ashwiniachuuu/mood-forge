import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "./menu";

export type Customization = {
  size: "Regular" | "Large" | "X Large";
  cheese: boolean;
  patty: boolean;
  bacon: boolean;
};

export type CartLine = {
  key: string;
  item: MenuItem;
  qty: number;
  unitPrice: number;
  custom: Customization;
};

type ShopState = {
  lines: CartLine[];
  favorites: string[];
  cartOpen: boolean;
  bump: number;
  detailId: string | null;
  add: (item: MenuItem, custom: Customization, unitPrice: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  toggleFavorite: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  openDetail: (id: string | null) => void;
  total: number;
  count: number;
};

export const defaultCustom: Customization = {
  size: "Regular",
  cheese: false,
  patty: false,
  bacon: false,
};

export const customLabel = (c: Customization) =>
  [
    c.size,
    c.cheese ? "Extra cheese" : null,
    c.patty ? "Extra patty" : null,
    c.bacon ? "Bacon" : null,
  ]
    .filter(Boolean)
    .join(" · ");

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);

  const add = useCallback(
    (item: MenuItem, custom: Customization, unitPrice: number) => {
      const key = `${item.id}-${custom.size}-${custom.cheese}-${custom.patty}-${custom.bacon}`;
      setLines((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) {
          return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
        }
        return [...prev, { key, item, qty: 1, unitPrice, custom }];
      });
      setBump((b) => b + 1);
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }, []);

  const openDetail = useCallback((id: string | null) => setDetailId(id), []);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [lines],
  );
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value: ShopState = {
    lines,
    favorites,
    cartOpen,
    bump,
    detailId,
    add,
    setQty,
    remove,
    toggleFavorite,
    setCartOpen,
    openDetail,
    total,
    count,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
