import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import Lenis from "lenis";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
};

export function PageShell({ eyebrow, title, subtitle, children, ctaLabel, ctaTo }: Props) {
  useReveal();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar variant="solid" />
      <main className="pt-24">
        <section className="relative overflow-hidden bg-gradient-navy text-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[color:var(--royal-500)]/25 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--gold)]">
              <Sparkles className="h-3 w-3" />
              {eyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">{subtitle}</p>
            )}
            {ctaLabel && ctaTo && (
              <div className="mt-10">
                <Link
                  to={ctaTo}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform hover:scale-[1.03]"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </section>
        {children}
        <PageCta />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}

function PageCta() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-navy p-10 text-white shadow-elevated md:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--gold)]/25 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h3 className="font-display text-3xl font-bold md:text-4xl">
                Ready to map your <span className="text-gradient-gold">right path?</span>
              </h3>
              <p className="mt-3 text-white/70">
                Book a free 30-minute consultation with a senior NEET mentor. No obligations.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform hover:scale-[1.03]"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}