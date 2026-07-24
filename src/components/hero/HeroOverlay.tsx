import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroOverlay() {
  return (
    <div className="hero-overlay-fade absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center text-white sm:px-6">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]">
        <Sparkles className="h-3 w-3 text-[color:var(--gold)] sm:h-3.5 sm:w-3.5" />
        India's Premium NEET Counselling
      </div>

      <h1 className="font-display text-balance text-[3.25rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="block">Meet</span>
        <span className="block text-gradient-gold">Success</span>
      </h1>

      <p className="mt-4 max-w-xl text-base font-medium text-white/80 sm:mt-6 sm:text-lg md:text-xl">
        Right Path Changes Everything.
      </p>
      <p className="mt-2 hidden max-w-xl text-sm text-white/60 sm:block md:text-base">
        Personalised NEET UG counselling & medical college admission guidance,
        built for students who refuse to leave their future to luck.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform duration-300 hover:scale-[1.03] sm:px-7 sm:py-3.5"
        >
          Book Free Consultation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/colleges"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:px-7 sm:py-3.5"
        >
          Explore Colleges
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:bottom-8">
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </div>
  );
}