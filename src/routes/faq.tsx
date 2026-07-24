import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Faq } from "@/components/sections/Faq";
import { FAQS } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "NEET Counselling FAQs — NEET Success" },
      { name: "description", content: "Answers to the most common questions about NEET UG counselling, fees, mentorship, seat guarantees, MBBS abroad and more." },
      { property: "og:title", content: "NEET Success FAQs" },
      { property: "og:description", content: "Common NEET counselling questions, answered." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neetexpert.lovable.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://neetexpert.lovable.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageShell
      eyebrow="Questions & answers"
      title={<>Everything parents and students <span className="text-gradient-gold">actually ask us.</span></>}
      subtitle="Straight answers to the questions that come up in every discovery call."
    >
      <Faq />
    </PageShell>
  );
}