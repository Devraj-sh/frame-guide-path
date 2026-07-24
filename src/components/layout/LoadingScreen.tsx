import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setGone(true), 400);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  const circ = 2 * Math.PI * 46;
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-navy transition-opacity duration-500"
      style={{ opacity: progress >= 1 ? 0 : 1, pointerEvents: progress >= 1 ? "none" : "auto" }}
      aria-hidden={progress >= 1}
    >
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="url(#g)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.15 85)" />
              <stop offset="100%" stopColor="oklch(0.88 0.11 88)" />
            </linearGradient>
          </defs>
        </svg>
        <img src={logoAsset.url} alt="NEET Success" className="absolute inset-4 h-24 w-24 object-contain" />
      </div>
      <p className="mt-8 font-display text-2xl font-bold text-white">NEET Success</p>
      <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/60">Right path changes everything</p>
    </div>
  );
}