import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroFramesDesktop, HERO_FRAME_COUNT } from "@/data/heroFrames";
import { HeroOverlay } from "./HeroOverlay";

gsap.registerPlugin(ScrollTrigger);

type Props = { onReady?: (progress: number) => void };

export function HeroSequence({ onReady }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    let isMobile = mq.matches;
    // Use the high-resolution desktop frames on every viewport — the mobile
    // 850px WebPs looked blurry on high-DPR phone screens. Desktop frames
    // (1500px) stay crisp when scaled down and only add a few hundred KB.
    const list = heroFramesDesktop;
    // Mobile only uses the first 72 frames (drop the doctor-with-stethoscope
    // segment, originally desktop_0140+). Desktop keeps the full sequence.
    const MOBILE_FRAME_COUNT = 72;
    const frameCount = isMobile ? Math.min(MOBILE_FRAME_COUNT, list.length) : HERO_FRAME_COUNT;
    const imgs: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    framesRef.current = imgs;

    let readyCount = 0;
    const eager = 20;
    const loadFrame = (i: number, onLoad?: () => void) => {
      const img = new Image();
      img.decoding = "async";
      img.src = list[i];
      img.onload = () => {
        imgs[i] = img;
        readyCount++;
        if (readyCount === eager) onReady?.(1);
        if (i === 0) draw();
        onLoad?.();
      };
    };

    // eager load first N in parallel
    for (let i = 0; i < Math.min(eager, frameCount); i++) loadFrame(i);

    // stream the rest sequentially with a small pool
    let next = eager;
    const POOL = 6;
    const streamOne = () => {
      if (next >= frameCount) return;
      const idx = next++;
      loadFrame(idx, streamOne);
    };
    for (let p = 0; p < POOL; p++) streamOne();

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let cw = 0, ch = 0, iw = 0, ih = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      draw();
    };

    const draw = () => {
      const target = currentIndexRef.current;
      // find nearest loaded ≤ target, then ≥ target as fallback
      let img: HTMLImageElement | null = null;
      for (let d = 0; d <= frameCount; d++) {
        if (imgs[target - d]) { img = imgs[target - d]!; break; }
        if (imgs[target + d]) { img = imgs[target + d]!; break; }
      }
      if (!img) return;
      iw = img.naturalWidth; ih = img.naturalHeight;
      if (!iw || !ih) return;
      const cW = canvas.width, cH = canvas.height;
      // Cover-fit on all viewports (matches earlier behaviour).
      const s = Math.max(cW / iw, cH / ih);
      const w = iw * s, h = ih * s;
      const x = (cW - w) / 2;
      const y = (cH - h) / 2;
      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, x, y, w, h);
    };

    resize();
    window.addEventListener("resize", resize);
    const onMqChange = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
      draw();
    };
    mq.addEventListener?.("change", onMqChange);

    // ScrollTrigger pin + scrub
    const section = sectionRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${isMobile ? Math.max(1200, frameCount * 10) : Math.max(2400, frameCount * 10)}`,
      pin: true,
      pinSpacing: true,
      scrub: reduce ? true : 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const target = Math.min(frameCount - 1, Math.round(p * (frameCount - 1)));
        if (target !== currentIndexRef.current) {
          currentIndexRef.current = target;
          draw();
        }
        document.documentElement.style.setProperty("--hero-progress", p.toFixed(4));
        const past = p >= 0.28;
        if (document.body.dataset.pastHero !== String(past)) {
          document.body.dataset.pastHero = String(past);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      mq.removeEventListener?.("change", onMqChange);
      st.kill();
      document.body.dataset.pastHero = "false";
      document.documentElement.style.setProperty("--hero-progress", "0");
    };
  }, [onReady]);

  return (
    <section
      ref={sectionRef}
      aria-label="NEET Success introduction"
      className="relative h-screen w-full overflow-hidden bg-navy-950"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero-fade)" }}
      />
      <HeroOverlay />
    </section>
  );
}