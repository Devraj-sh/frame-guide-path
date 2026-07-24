import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Faq } from "@/components/sections/Faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "NEET Counselling FAQs — NEET Success" },
      { name: "description", content: "Answers to the most common questions about NEET UG counselling, fees, mentorship, seat guarantees, MBBS abroad and more." },
      { property: "og:title", content: "NEET Success FAQs" },
      { property: "og:description", content: "Common NEET counselling questions, answered." },
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