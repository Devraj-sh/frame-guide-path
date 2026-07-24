import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "NEET Counselling Services — AIQ, State, Deemed & MBBS Abroad" },
      { name: "description", content: "End-to-end NEET UG counselling: AIQ, state quota, deemed, private, AYUSH, nursing, and MBBS abroad — mapped to your rank and budget." },
      { property: "og:title", content: "NEET Success Services" },
      { property: "og:description", content: "Full-spectrum NEET counselling services from senior mentors." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell
      eyebrow="What we do"
      title={<>Every counselling round, <span className="text-gradient-gold">covered end-to-end.</span></>}
      subtitle="From MCC registration to reporting day — one mentor, one plan, every round of every quota."
      ctaLabel="Talk to a mentor"
      ctaTo="/contact"
    >
      <Services />
      <WhyUs />
    </PageShell>
  );
}