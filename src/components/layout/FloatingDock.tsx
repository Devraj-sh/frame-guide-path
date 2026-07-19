import { Phone, Mail, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "@/data/site";

type Item = {
  label: string;
  href: string;
  icon: typeof Phone;
  external?: boolean;
  brand?: string;
};

const ITEMS: Item[] = [
  {
    label: "Call us",
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    icon: Phone,
    brand: "linear-gradient(135deg, #1E5EFF, #4A7DFF)",
  },
  {
    label: "WhatsApp",
    href: CONTACT.whatsapp,
    icon: MessageCircle,
    external: true,
    brand: "linear-gradient(135deg, #25D366, #128C7E)",
  },
  {
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
    brand: "linear-gradient(135deg, #D4AF37, #F5D97A)",
  },
  {
    label: "Instagram",
    href: CONTACT.instagram,
    icon: Instagram,
    external: true,
    brand: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)",
  },
];

export function FloatingDock() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Quick contact"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-3 rounded-full border border-white/15 bg-white/10 p-2 shadow-elevated backdrop-blur-xl">
        {ITEMS.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noreferrer" : undefined}
            aria-label={it.label}
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-soft transition-transform duration-300 hover:scale-110"
            style={{ background: it.brand }}
          >
            <it.icon className="h-4 w-4" />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[color:var(--navy-950)] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
              {it.label}
            </span>
          </a>
        ))}

        <div className="my-0.5 h-px w-6 bg-white/20" />

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          data-show={showTop}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-950)] data-[show=false]:pointer-events-none data-[show=false]:scale-75 data-[show=false]:opacity-0"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}