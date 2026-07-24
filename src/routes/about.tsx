import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NEET Success — Senior Mentors, Not a Call Centre" },
      { name: "description", content: "Meet the boutique NEET counselling team behind thousands of medical seats — mission, vision, and the mentors who guide every student personally." },
      { property: "og:title", content: "About NEET Success" },
      { property: "og:description", content: "Senior NEET counselling mentors — mission, vision and outcomes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neetexpert.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://neetexpert.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="Who we are"
      title={<>Counselling built by mentors who <span className="text-gradient-gold">actually care.</span></>}
      subtitle="NEET Success is a boutique counselling firm run by senior mentors who have personally guided thousands of students into India's most competitive medical seats."
    >
      <About />
      <WhyUs />
    </PageShell>
  );
}