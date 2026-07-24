import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import { NAV_LINKS } from "@/data/site";

type Props = { variant?: "hero" | "solid" };

export function Navbar({ variant = "hero" }: Props) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true);
      return;
    }
    const check = () => setScrolled(document.body.dataset.pastHero === "true");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-past-hero"] });
    return () => obs.disconnect();
  }, [variant]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500 data-[scrolled=true]:bg-white/70 data-[scrolled=true]:shadow-soft data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:border-b data-[scrolled=true]:border-black/5"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Meet Success home">
            <span
              className={`font-display text-lg font-bold tracking-tight transition-colors duration-500 ${scrolled ? "text-[color:var(--navy-950)]" : "text-white"}`}
            >
              NEET <span className="text-[color:var(--gold)]">Expert</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                activeOptions={{ exact: true }}
                activeProps={{ "data-active": "true" } as never}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[color:var(--navy-900)]/80 hover:bg-black/5 hover:text-[color:var(--navy-950)] data-[active=true]:bg-black/5 data-[active=true]:text-[color:var(--navy-950)]"
                    : "text-white/85 hover:bg-white/10 hover:text-white data-[active=true]:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-[color:var(--navy-950)] shadow-soft transition-transform hover:scale-[1.03]"
            >
              Book Consultation
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
              scrolled ? "bg-black/5 text-[color:var(--navy-950)]" : "bg-white/10 text-white"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-gradient-navy p-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="" className="h-9 w-auto" />
              <span className="font-display text-lg font-bold">NEET <span className="text-[color:var(--gold)]">Expert</span></span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-1">
            {NAV_LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => { setOpen(false); navigate({ to: l.href }); }}
                className="rounded-2xl px-4 py-4 text-left font-display text-3xl font-bold text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                style={{ animation: `fade-in 0.5s ${i * 0.05}s both ease-out` }}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => { setOpen(false); navigate({ to: "/contact" }); }}
            className="mt-auto rounded-full bg-gradient-gold px-6 py-4 text-center text-base font-semibold text-[color:var(--navy-950)]"
          >
            Book Free Consultation
          </button>
        </div>
      )}
    </>
  );
}