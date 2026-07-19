type Props = { eyebrow: string; title: React.ReactNode; subtitle?: string; align?: "left" | "center" };

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <div className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}>
      <div className="reveal-up mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--navy-900)]">
        <span className="h-1 w-6 bg-gradient-gold" />
        {eyebrow}
      </div>
      <h2 className="reveal-up font-display text-4xl font-bold leading-[1.05] text-[color:var(--navy-950)] sm:text-5xl md:text-6xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="reveal-up mt-5 text-base text-[color:var(--navy-900)]/70 md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}