import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Colleges } from "@/components/sections/Colleges";

export const Route = createFileRoute("/colleges")({
  head: () => ({
    meta: [
      { title: "Medical Colleges — Fees & Cutoffs | NEET Success" },
      { name: "description", content: "Explore government, private and deemed medical colleges across India with real fees, cutoffs and category breakdowns." },
      { property: "og:title", content: "Medical Colleges — NEET Success" },
      { property: "og:description", content: "India's medical colleges with real fees and cutoffs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neetexpert.lovable.app/colleges" },
    ],
    links: [{ rel: "canonical", href: "https://neetexpert.lovable.app/colleges" }],
  }),
  component: CollegesPage,
});

function CollegesPage() {
  return (
    <PageShell
      eyebrow="College intelligence"
      title={<>Real fees. Real cutoffs. <span className="text-gradient-gold">Zero marketing.</span></>}
      subtitle="Search across government, private, and deemed colleges. Filter by type and see the numbers that actually matter to your decision."
    >
      <Colleges />
    </PageShell>
  );
}