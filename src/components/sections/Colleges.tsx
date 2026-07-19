import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { COLLEGES } from "@/data/site";

const TABS = ["All", "Government", "Private", "Deemed"] as const;
type Tab = typeof TABS[number];

export function Colleges() {
  const [tab, setTab] = useState<Tab>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return COLLEGES.filter((c) => {
      if (tab !== "All" && c.type !== tab) return false;
      if (q && !`${c.name} ${c.state}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [tab, q]);

  return (
    <section id="colleges" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Colleges"
          title={<>Explore <span className="text-gradient-gold">medical colleges</span> across India.</>}
          subtitle="A curated view of top government, private and deemed medical colleges we help students target every year."
        />

        <div className="reveal-up mt-12 flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all ${
                  tab === t
                    ? "bg-[color:var(--navy-950)] text-white shadow-soft"
                    : "bg-[color:var(--muted)] text-[color:var(--navy-900)]/70 hover:bg-black/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--navy-900)]/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search college or state…"
              className="w-full rounded-full border border-black/10 bg-[color:var(--muted)] py-2.5 pl-10 pr-4 text-sm text-[color:var(--navy-950)] outline-none transition-colors focus:border-[color:var(--gold)] focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article key={c.name} className="reveal-up group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">{c.type}</div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[color:var(--navy-950)]">{c.name}</h3>
                  <p className="mt-1 text-sm text-[color:var(--navy-900)]/60">{c.state}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/5 pt-4 text-sm">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[color:var(--navy-900)]/50">Fees</div>
                  <div className="mt-1 font-semibold text-[color:var(--navy-950)]">{c.fees}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[color:var(--navy-900)]/50">Cutoff</div>
                  <div className="mt-1 font-semibold text-[color:var(--navy-950)]">{c.cutoff}</div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-gold transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-[color:var(--navy-900)]/50">No colleges match your search. Try a different keyword.</p>
          )}
        </div>
      </div>
    </section>
  );
}