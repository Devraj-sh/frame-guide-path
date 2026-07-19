import { SectionHeader } from "./SectionHeader";
import { PROCESS } from "@/data/site";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-gradient-navy py-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 40% at 30% 20%, rgba(212,175,55,0.15), transparent 60%)" }} />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="reveal-up mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--gold)]">
            <span className="h-1 w-6 bg-gradient-gold" />
            Our Process
          </div>
          <h2 className="reveal-up font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl text-balance">
            Eight steps from result day to <span className="text-gradient-gold">reporting day.</span>
          </h2>
          <p className="reveal-up mx-auto mt-5 max-w-2xl text-white/70">
            A structured, calm process at the moment your family needs it most.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[color:var(--gold)]/60 via-white/20 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <ol className="space-y-10">
            {PROCESS.map((step, i) => (
              <li
                key={step.step}
                className={`reveal-up relative flex flex-col gap-4 pl-16 md:flex-row md:pl-0 md:gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold font-display text-sm font-bold text-[color:var(--navy-950)] shadow-gold-glow md:static md:mx-auto">
                  {step.step}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:w-[calc(50%-2.5rem)]">
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}