import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Blog } from "@/components/sections/Blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "NEET Counselling Insights & Guides — NEET Expert Blog" },
      { name: "description", content: "Choice-filling frameworks, college comparisons, state quota rules, deemed college ROI — deep-dive insights for NEET UG aspirants and parents." },
      { property: "og:title", content: "NEET Expert Insights" },
      { property: "og:description", content: "Deep-dive NEET counselling guides and strategy." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell
      eyebrow="Insights"
      title={<>Strategy and analysis <span className="text-gradient-gold">for aspirants and parents.</span></>}
      subtitle="Long-form guides on choice filling, college comparisons, and the counselling landscape — written by our senior mentors."
    >
      <Blog />
    </PageShell>
  );
}