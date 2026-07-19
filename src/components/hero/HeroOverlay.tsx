import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroOverlay() {
  return (
    <div className="hero-overlay-fade absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
        India's Premium NEET Counselling
      </div>

      <h1 className="font-display text-balance text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="block">NEET</span>
        <span className="block text-gradient-gold">Expert</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg font-medium text-white/80 md:text-xl">
        Right Path Changes Everything.
      </p>
      <p className="mt-2 max-w-xl text-sm text-white/60 md:text-base">
        Personalised NEET UG counselling & medical college admission guidance,
        built for students who refuse to leave their future to luck.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform duration-300 hover:scale-[1.03]"
        >
          Book Free Consultation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/colleges"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Explore Colleges
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </div>
  );
}