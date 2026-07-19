import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";
import { FAQS } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="relative bg-[color:var(--muted)] py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Questions"
          title={<>You have questions. <span className="text-gradient-gold">We have answers.</span></>}
        />

        <div className="reveal-up mt-14 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
          <Accordion type="single" collapsible className="divide-y divide-black/5">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none px-6 md:px-8">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-[color:var(--navy-950)] hover:text-[color:var(--secondary)] hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-[color:var(--navy-900)]/70 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}