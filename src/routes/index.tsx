import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Lenis from "lenis";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useReveal } from "@/hooks/useReveal";
import { NAV_LINKS, SERVICES } from "@/data/site";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEET Expert — Premium NEET UG Counselling & Medical Admission Guidance" },
      { name: "description", content: "India's premium NEET UG counselling firm. Personal mentors, transparent choice-filling, thousands of medical seats secured. Book a free consultation today." },
      { property: "og:title", content: "NEET Expert — Premium NEET UG Counselling & Medical Admission Guidance" },
      { property: "og:description", content: "India's premium NEET UG counselling firm. Personal mentors, transparent choice-filling, thousands of medical seats secured. Book a free consultation today." },
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
          telephone: "+91-8882611683",
          sameAs: ["https://www.instagram.com/neetexpert.121"],
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
        <HeroVideo />
        <About />
        <WhyUs />
        <ExploreGrid />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}

function ExploreGrid() {
  const featured = SERVICES.slice(0, 6);
  const explore = NAV_LINKS.filter((l) => l.href !== "/about");
  return (
    <section className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Explore"
          title={<>A dedicated page for <span className="text-gradient-gold">every part of the journey.</span></>}
          subtitle="Dive deeper into the exact area you need — services, process, colleges, success stories, insights and more."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {explore.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="group reveal-up flex items-center justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">
                  {l.href.replace("/", "")}
                </div>
                <div className="mt-2 font-display text-xl font-bold text-[color:var(--navy-950)]">
                  {l.label}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[color:var(--navy-900)]/40 transition-all group-hover:translate-x-1 group-hover:text-[color:var(--gold)]" />
            </Link>
          ))}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {featured.map((s) => (
            <div key={s.title} className="reveal-up rounded-2xl border border-black/5 bg-white p-6 shadow-soft">
              <s.icon className="h-6 w-6 text-[color:var(--gold)]" />
              <h4 className="mt-4 font-display text-lg font-bold text-[color:var(--navy-950)]">{s.title}</h4>
              <p className="mt-2 text-sm text-[color:var(--navy-900)]/70">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform hover:scale-[1.03]"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
