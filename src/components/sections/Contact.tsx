import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Mail, Phone, Instagram, MessageCircle, Send, Sparkles } from "lucide-react";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { CONTACT } from "@/data/site";
import logoAsset from "@/assets/logo.png.asset.json";

export function Contact() {
  const submit = useServerFn(submitEnquiry);
  const [loading, setLoading] = useState(false);
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const scoreRaw = String(fd.get("neet_score") ?? "").trim();
      const res = await submit({
        data: {
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          state: String(fd.get("state") ?? "").trim(),
          neet_score: scoreRaw ? Number(scoreRaw) : undefined,
          preferred_college: String(fd.get("preferred_college") ?? "").trim(),
          message: String(fd.get("message") ?? "").trim(),
          source: "contact_form",
          honeypot: String(fd.get("company") ?? ""),
          startedAt: startedAt.current,
        },
      });
      if (res.ok) {
        toast.success("Consultation request received! We'll call you within 24 hours.");
        (e.currentTarget as HTMLFormElement).reset();
        startedAt.current = Date.now();
      } else {
        toast.error(res.error ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-[2rem] border border-black/5 shadow-elevated lg:grid-cols-5">
          {/* Left panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-navy p-10 text-white lg:col-span-2 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--gold)]/25 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--gold)]">
                <Sparkles className="h-3 w-3" />
                Book a free call
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Let's map your <span className="text-gradient-gold">right path.</span>
              </h2>
              <p className="mt-4 max-w-sm text-white/70">
                Share a few details. A senior mentor will call you within 24 hours for a free 30-minute consultation.
              </p>
            </div>

            <div className="relative mt-12 space-y-5">
              <a href={`mailto:${CONTACT.email}`} className="group flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[color:var(--gold)]"><Mail className="h-4 w-4" /></span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Email</span>
                  <span className="block text-sm font-medium group-hover:text-[color:var(--gold)] break-all">{CONTACT.email}</span>
                </span>
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="group flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[color:var(--gold)]"><Phone className="h-4 w-4" /></span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Phone</span>
                  <span className="block text-sm font-medium group-hover:text-[color:var(--gold)]">{CONTACT.phone}</span>
                </span>
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="group flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[color:var(--gold)]"><MessageCircle className="h-4 w-4" /></span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">WhatsApp</span>
                  <span className="block text-sm font-medium group-hover:text-[color:var(--gold)]">{CONTACT.whatsappLabel}</span>
                </span>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="group flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[color:var(--gold)]"><Instagram className="h-4 w-4" /></span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Instagram</span>
                  <span className="block text-sm font-medium group-hover:text-[color:var(--gold)]">{CONTACT.instagramHandle}</span>
                </span>
              </a>
            </div>

            <div className="relative mt-12 flex items-center gap-3">
              <img src={logoAsset.url} alt="" className="h-10 w-auto" />
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">{CONTACT.tagline}</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="grid gap-4 bg-white p-10 lg:col-span-3 lg:p-12">
            <input tabIndex={-1} autoComplete="off" name="company" className="hidden" aria-hidden />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" name="name" required placeholder="e.g. Ananya Sharma" />
              <Field label="Phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
              <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
              <Field label="State" name="state" placeholder="e.g. Maharashtra" />
              <Field label="NEET Score / Expected" name="neet_score" type="number" placeholder="e.g. 620" />
              <Field label="Preferred college / stream" name="preferred_college" placeholder="e.g. MBBS at MAMC" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--navy-900)]/60">How can we help?</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your rank, category, and what you're aiming for…"
                className="rounded-xl border border-black/10 bg-[color:var(--muted)] p-4 text-sm text-[color:var(--navy-950)] outline-none transition-all focus:border-[color:var(--gold)] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-semibold text-[color:var(--navy-950)] shadow-gold-glow transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Book Free Consultation <Send className="h-4 w-4" /></>}
            </button>
            <p className="text-center text-xs text-[color:var(--navy-900)]/50">
              By submitting, you agree to be contacted about your NEET counselling enquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--navy-900)]/60">{label}</label>
      <input
        {...rest}
        className="rounded-xl border border-black/10 bg-[color:var(--muted)] p-3.5 text-sm text-[color:var(--navy-950)] outline-none transition-all focus:border-[color:var(--gold)] focus:bg-white"
      />
    </div>
  );
}