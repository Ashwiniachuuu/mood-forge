import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — MOOD" },
      { name: "description", content: "Menu at MOOD, the cinematic 3D burger house." },
      { property: "og:title", content: "Menu — MOOD" },
      { property: "og:description", content: "Menu at MOOD, the cinematic 3D burger house." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 pt-32">
      <h1 className="font-display text-4xl font-extrabold">Menu</h1>
    </main>
  );
}
