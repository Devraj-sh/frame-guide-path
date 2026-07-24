import { useEffect, useRef, useState } from "react";
import { HeroOverlay } from "./HeroOverlay";
import heroVideo from "@/assets/hero-advertisement.mp4.asset.json";

export function HeroVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    document.body.dataset.pastHero = "false";
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.3;
      const val = String(past);
      if (document.body.dataset.pastHero !== val) {
        document.body.dataset.pastHero = val;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.dataset.pastHero = "false";
    };
  }, []);

  const src = heroVideo.url;

  return (
    <section
      aria-label="NEET Success introduction"
      className="hero-scope relative h-screen w-full overflow-hidden bg-navy-950"
    >
      <video
        key={src}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero-fade)" }}
      />
      <HeroOverlay />
    </section>
  );
}