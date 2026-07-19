import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { STATS } from "@/data/site";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Who we are"
          title={<>Counselling that treats your future <span className="text-gradient-gold">like our own.</span></>}
          subtitle="NEET Expert is a boutique counselling firm run by senior mentors who have personally guided thousands of students into India's most competitive medical seats. No call-centres, no upsells — just the right advice, at the right moment."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="reveal-up rounded-3xl border border-black/5 bg-white p-10 shadow-soft">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">Our Mission</div>
            <h3 className="mb-4 font-display text-2xl font-bold text-[color:var(--navy-950)]">Every deserving student finds their right medical seat.</h3>
            <p className="text-[color:var(--navy-900)]/70">
              We turn the chaos of NEET counselling into a clear, data-backed roadmap.
              We believe personalised guidance — not luck — should decide where you study medicine.
            </p>
          </div>
          <div className="reveal-up rounded-3xl bg-gradient-navy p-10 text-white shadow-elevated">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">Our Vision</div>
            <h3 className="mb-4 font-display text-2xl font-bold">India's most trusted counselling brand for future doctors.</h3>
            <p className="text-white/75">
              Built on transparency, real mentorship and outcomes. Backed by a proprietary
              rank-mapping tool and a community of alumni now practising across India.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-black/5 bg-white p-8 shadow-soft md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="reveal-up text-center">
              <div className="font-display text-4xl font-extrabold text-[color:var(--navy-950)] md:text-5xl">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-[color:var(--navy-900)]/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}