import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Lenis from "lenis";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Colleges } from "@/components/sections/Colleges";
import { Success } from "@/components/sections/Success";
import { Blog } from "@/components/sections/Blog";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { useReveal } from "@/hooks/useReveal";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEET Expert — Premium NEET UG Counselling & Medical Admission Guidance" },
      { name: "description", content: "India's premium NEET UG counselling firm. Personal mentors, transparent choice-filling, thousands of medical seats secured. Book a free consultation today." },
      { property: "og:title", content: "NEET Expert — Right Path Changes Everything" },
      { property: "og:description", content: "Premium NEET UG counselling & medical admission guidance from senior mentors who care about outcomes." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: logoAsset.url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "NEET Expert",
          description: "Premium NEET UG counselling and medical college admission guidance across India.",
          email: "expertneet121@gmail.com",
          telephone: "+91-98765-43210",
          sameAs: ["https://instagram.com/neet.expert"],
          slogan: "Right Path Changes Everything",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
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
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSequence />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Colleges />
        <Success />
        <Blog />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}
