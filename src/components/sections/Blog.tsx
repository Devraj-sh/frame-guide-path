import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { BLOG_POSTS } from "@/data/site";

export function Blog() {
  return (
    <section id="blog" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Insights"
          title={<>Straight-talk articles on <span className="text-gradient-gold">NEET counselling.</span></>}
          subtitle="Frameworks, cutoff analysis and honest breakdowns — written by mentors who work in the trenches."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p, i) => (
            <article key={p.title} className="reveal-up group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="relative h-44 overflow-hidden bg-gradient-navy">
                <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(120% 120% at ${20 + i * 15}% ${30 + i * 10}%, rgba(212,175,55,0.4), transparent 60%)` }} />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                    {p.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--navy-900)]/50">{p.date}</div>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[color:var(--navy-950)] transition-colors group-hover:text-[color:var(--secondary)]">{p.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--navy-900)]/65">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--navy-950)]">
                  Read article <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}