import { SectionHeader } from "./SectionHeader";
import { SERVICES } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[color:var(--muted)] py-28">
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[color:var(--secondary)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What we do"
          title={<>Ten services. <span className="text-gradient-gold">One clear promise.</span></>}
          subtitle="From the first registration form to the day you walk into your medical college — we're on the call, on the tool, on your side."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const highlight = i % 5 === 0;
            return (
              <article
                key={s.title}
                className="reveal-up group relative flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${highlight ? "bg-gradient-gold text-[color:var(--navy-950)]" : "bg-[color:var(--navy-950)] text-[color:var(--gold)]"} shadow-soft`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[color:var(--navy-950)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--navy-900)]/65">{s.desc}</p>
                <div className="pointer-events-none absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-gold transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}