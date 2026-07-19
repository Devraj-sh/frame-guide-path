import { Instagram, Mail, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import { CONTACT, NAV_LINKS, SERVICES } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative bg-gradient-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="NEET Expert" className="h-12 w-auto" />
            <div>
              <div className="font-display text-xl font-bold">
                NEET <span className="text-[color:var(--gold)]">Expert</span>
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">{CONTACT.tagline}</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            India's premium NEET UG counselling firm. Personal mentors, transparent
            fees, and data-driven choice-filling — for students who deserve better.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-950)]"><Instagram className="h-4 w-4" /></a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-950)]"><Mail className="h-4 w-4" /></a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} aria-label="Phone" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-950)]"><Phone className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">Explore</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {NAV_LINKS.map((l) => <li key={l.href}><Link to={l.href} className="hover:text-white">{l.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">Services</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {SERVICES.slice(0, 6).map((s) => <li key={s.title}><Link to="/services" className="hover:text-white">{s.title}</Link></li>)}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">Reach us</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" /> <a href={`mailto:${CONTACT.email}`} className="hover:text-white break-all">{CONTACT.email}</a></li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" /> <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-white">{CONTACT.phone}</a></li>
            <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" /> <a href={CONTACT.instagram} className="hover:text-white" target="_blank" rel="noreferrer">@neet.expert</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} NEET Expert. All rights reserved.</p>
          <p>Crafted with care for future doctors.</p>
        </div>
      </div>
    </footer>
  );
}