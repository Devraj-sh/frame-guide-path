import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, X, ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "@/data/site";

const FIRST_DELAY = 25_000;
const REPEAT_DELAY = 90_000;

export function ConsultationPopup() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname === "/contact") return;
    let timer: number;
    const schedule = (ms: number) => {
      timer = window.setTimeout(() => setOpen(true), ms);
    };
    schedule(FIRST_DELAY);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (open || pathname === "/contact") return;
    const t = window.setTimeout(() => setOpen(true), REPEAT_DELAY);
    return () => window.clearTimeout(t);
  }, [open, pathname]);

  if (pathname === "/contact") return null;

  return (
    <div
      data-open={open}
      className="pointer-events-none fixed bottom-4 right-4 z-[70] w-[calc(100%-2rem)] max-w-sm translate-y-4 opacity-0 transition-all duration-500 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100 sm:bottom-6 sm:right-6"
      role="dialog"
      aria-hidden={!open}
      aria-label="Book a free consultation"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-5 text-white shadow-elevated ring-1 ring-white/10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--gold)]/25 blur-3xl" />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <Sparkles className="h-3 w-3" />
            Free consultation
          </div>
          <h3 className="mt-3 font-display text-xl font-bold leading-tight">
            Talk to a senior <span className="text-gradient-gold">NEET mentor</span> — free 30 min call.
          </h3>
          <p className="mt-1.5 text-sm text-white/70">
            Get a personal roadmap for your rank, category, and dream colleges.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-4 py-2.5 text-xs font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform hover:scale-[1.03]"
            >
              Book Free Call
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-3.5 w-3.5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}