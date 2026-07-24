import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Meet Success — Senior Mentors, Not a Call Centre" },
      { name: "description", content: "Meet the boutique NEET counselling team behind thousands of medical seats — mission, vision, and the mentors who guide every student personally." },
      { property: "og:title", content: "About Meet Success" },
      { property: "og:description", content: "Senior NEET counselling mentors — mission, vision and outcomes." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="Who we are"
      title={<>Counselling built by mentors who <span className="text-gradient-gold">actually care.</span></>}
      subtitle="Meet Success is a boutique counselling firm run by senior mentors who have personally guided thousands of students into India's most competitive medical seats."
    >
      <About />
      <WhyUs />
    </PageShell>
  );
}