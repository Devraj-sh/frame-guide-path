import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Process } from "@/components/sections/Process";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our 8-Step NEET Counselling Process — NEET Success" },
      { name: "description", content: "From free discovery call to post-admission support — a transparent 8-step process that has placed thousands of students in Indian medical colleges." },
      { property: "og:title", content: "Our Counselling Process" },
      { property: "og:description", content: "The 8-step NEET Success counselling journey." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neetexpert.lovable.app/process" },
    ],
    links: [{ rel: "canonical", href: "https://neetexpert.lovable.app/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title={<>Eight steps from result day <span className="text-gradient-gold">to reporting day.</span></>}
      subtitle="No black boxes. Every step is documented, timed, and personally handled by your dedicated mentor."
    >
      <Process />
    </PageShell>
  );
}