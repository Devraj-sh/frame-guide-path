import { useEffect, useRef, useState } from "react";
import { HeroOverlay } from "./HeroOverlay";
import desktopVideo from "@/assets/hero-desktop.mp4.asset.json";
import mobileVideo from "@/assets/hero-mobile.mp4.asset.json";

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
    // Reset past-hero flag used by Navbar/other listeners
    document.body.dataset.pastHero = "false";
    return () => {
      document.body.dataset.pastHero = "false";
    };
  }, []);

  const src = isMobile ? mobileVideo.url : desktopVideo.url;

  return (
    <section
      aria-label="NEET Expert introduction"
      className="relative h-screen w-full overflow-hidden bg-navy-950"
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