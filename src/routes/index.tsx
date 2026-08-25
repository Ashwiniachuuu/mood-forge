import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOD — Cinematic 3D Burger Ordering" },
      {
        name: "description",
        content:
          "Order flame-grilled burgers from an immersive 3D experience. Spin the stack, customise every layer, and get it delivered in minutes.",
      },
      { property: "og:title", content: "MOOD — Cinematic 3D Burger Ordering" },
      {
        property: "og:description",
        content:
          "An immersive 3D food ordering experience: rotate the burger, customise layers, order in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Hero />
    </main>
  );
}
