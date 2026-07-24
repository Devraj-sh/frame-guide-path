import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Success } from "@/components/sections/Success";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Student Success Stories — Meet Success" },
      { name: "description", content: "Real students, real ranks, real seats. Stories from students placed in AIIMS, MAMC, Grant, KMC Manipal and more via Meet Success counselling." },
      { property: "og:title", content: "Meet Success Stories" },
      { property: "og:description", content: "Real students placed in India's top medical colleges." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <PageShell
      eyebrow="Outcomes"
      title={<>Thousands of doctors, <span className="text-gradient-gold">one right path each.</span></>}
      subtitle="These are students who trusted us with the biggest decision of their lives — and are now practising medicine across India."
    >
      <Success />
      <About />
    </PageShell>
  );
}