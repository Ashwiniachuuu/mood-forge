import cheeseburger from "@/assets/food-cheeseburger.png";
import spicyChicken from "@/assets/food-spicy-chicken.png";
import doubleBeef from "@/assets/food-double-beef.png";
import crispyChicken from "@/assets/food-crispy-chicken.png";
import loadedFries from "@/assets/food-loaded-fries.png";
import combo from "@/assets/combo.png";

export type Category =
  | "Burgers"
  | "Pizza"
  | "Chicken"
  | "Fries"
  | "Drinks"
  | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  category: Category;
  image: string;
};

export const categories: { name: Category; icon: string }[] = [
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Chicken", icon: "🍗" },
  { name: "Fries", icon: "🍟" },
  { name: "Drinks", icon: "🥤" },
  { name: "Desserts", icon: "🍰" },
];

export const menu: MenuItem[] = [
  {
    id: "cheese-burger",
    name: "Cheese Burger",
    price: 5.49,
    rating: 4.7,
    reviews: 214,
    description: "Flame-grilled beef, double cheddar melt and house pickles.",
    category: "Burgers",
    image: cheeseburger,
  },
  {
    id: "spicy-chicken-burger",
    name: "Spicy Chicken Burger",
    price: 6.49,
    rating: 4.8,
    reviews: 120,
    description:
      "Crispy spicy chicken patty with fresh lettuce, tomato, onion and our special sauce.",
    category: "Burgers",
    image: spicyChicken,
  },
  {
    id: "double-beef-burger",
    name: "Double Beef Burger",
    price: 8.99,
    rating: 4.9,
    reviews: 341,
    description: "Two smash patties, aged cheddar and smoked ember sauce.",
    category: "Burgers",
    image: doubleBeef,
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    price: 7.25,
    rating: 4.6,
    reviews: 187,
    description: "Buttermilk brined bites with a shattering golden crust.",
    category: "Chicken",
    image: crispyChicken,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    price: 4.75,
    rating: 4.5,
    reviews: 96,
    description: "Skin-on fries drowned in molten cheese and herbs.",
    category: "Fries",
    image: loadedFries,
  },
  {
    id: "spicy-burger-combo",
    name: "Spicy Burger Combo",
    price: 9.99,
    rating: 4.9,
    reviews: 402,
    description: "Spicy burger, seasoned fries and an ice-cold drink.",
    category: "Burgers",
    image: combo,
  },
  {
    id: "ember-cola",
    name: "Ember Cola",
    price: 2.25,
    rating: 4.4,
    reviews: 61,
    description: "Ice-packed cola with a citrus finish.",
    category: "Drinks",
    image: combo,
  },
  {
    id: "molten-brownie",
    name: "Molten Brownie",
    price: 3.95,
    rating: 4.8,
    reviews: 143,
    description: "Warm dark chocolate centre with salted caramel.",
    category: "Desserts",
    image: loadedFries,
  },
  {
    id: "ember-pizza",
    name: "Ember Pizza Slice",
    price: 4.5,
    rating: 4.3,
    reviews: 74,
    description: "Stone-baked slice with charred pepperoni.",
    category: "Pizza",
    image: cheeseburger,
  },
];

export const popular = menu.slice(0, 5);
export const comboImage = combo;

export const sizeMultiplier: Record<string, number> = {
  Regular: 1,
  Large: 1.35,
  "X Large": 1.7,
};

export const extrasPrice = {
  cheese: 0.9,
  patty: 2.2,
  bacon: 1.5,
};
