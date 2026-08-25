import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers — MOOD" },
      { name: "description", content: "Offers at MOOD, the cinematic 3D burger house." },
      { property: "og:title", content: "Offers — MOOD" },
      { property: "og:description", content: "Offers at MOOD, the cinematic 3D burger house." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 pt-32">
      <h1 className="font-display text-4xl font-extrabold">Offers</h1>
    </main>
  );
}
