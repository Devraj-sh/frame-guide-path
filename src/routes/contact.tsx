import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Free NEET Counselling Consultation — Meet Success" },
      { name: "description", content: "Book a free 30-minute call with a senior NEET counselling mentor. Email, phone and Instagram all reach a real person, not a call centre." },
      { property: "og:title", content: "Contact Meet Success" },
      { property: "og:description", content: "Book your free NEET counselling consultation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Talk to a mentor"
      title={<>Let's map your <span className="text-gradient-gold">right path.</span></>}
      subtitle="Share a few details and a senior mentor will call you within 24 hours for a free 30-minute consultation."
    >
      <Contact />
    </PageShell>
  );
}