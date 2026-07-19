import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { STORIES } from "@/data/site";

export function Success() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % STORIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="success" className="relative overflow-hidden bg-[color:var(--muted)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Success Stories"
          title={<>Real students. Real seats. <span className="text-gradient-gold">Real journeys.</span></>}
        />

        <div className="reveal-up mt-16 rounded-3xl bg-gradient-navy p-10 text-white shadow-elevated md:p-16">
          <Quote className="h-10 w-10 text-[color:var(--gold)]/70" />
          <blockquote className="mt-6 font-display text-2xl font-medium leading-relaxed text-balance md:text-3xl">
            "{STORIES[i].quote}"
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="font-display text-xl font-bold">{STORIES[i].name}</div>
              <div className="mt-1 text-sm text-white/70">{STORIES[i].rank} · {STORIES[i].college}</div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <button
              aria-label="Previous"
              onClick={() => setI((v) => (v - 1 + STORIES.length) % STORIES.length)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next"
              onClick={() => setI((v) => (v + 1) % STORIES.length)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-auto flex gap-1.5">
              {STORIES.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Go to story ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${i === k ? "w-8 bg-[color:var(--gold)]" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}