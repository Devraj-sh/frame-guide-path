import { Check, X } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { WHY_US, COMPARISON } from "@/data/site";

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Meet Success"
          title={<>Every family deserves <span className="text-gradient-gold">boutique attention.</span></>}
          subtitle="Most counselling brands are call-centres. We are a small team of senior mentors — and it shows in every conversation."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((w, i) => (
            <div key={w.title} className="reveal-up relative overflow-hidden rounded-2xl bg-gradient-navy p-8 text-white shadow-elevated">
              <div className="font-display text-6xl font-black text-[color:var(--gold)]/25">0{i + 1}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-white/70">{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal-up mt-16 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
          <div className="grid grid-cols-3 gap-4 border-b border-black/5 bg-[color:var(--muted)] px-6 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--navy-900)]/60 md:px-10">
            <div>Feature</div>
            <div className="text-center">Meet Success</div>
            <div className="text-center">Others</div>
          </div>
          {COMPARISON.map((row) => (
            <div key={row.feature} className="grid grid-cols-3 items-center gap-4 border-b border-black/5 px-6 py-5 text-sm last:border-b-0 md:px-10">
              <div className="font-medium text-[color:var(--navy-950)]">{row.feature}</div>
              <div className="flex justify-center">
                {row.us ? <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--emerald)]/15 text-[color:var(--emerald)]"><Check className="h-4 w-4" /></span>
                  : <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[color:var(--navy-900)]/40"><X className="h-4 w-4" /></span>}
              </div>
              <div className="flex justify-center">
                {row.them ? <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--emerald)]/15 text-[color:var(--emerald)]"><Check className="h-4 w-4" /></span>
                  : <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[color:var(--navy-900)]/40"><X className="h-4 w-4" /></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}