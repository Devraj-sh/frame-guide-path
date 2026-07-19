import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Invalid phone"),
  email: z.string().trim().email().max(255),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  neet_score: z.union([z.number().int().min(0).max(720), z.nan()]).optional(),
  preferred_college: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.enum(["contact_form", "newsletter"]).default("contact_form"),
  honeypot: z.string().max(0).optional(),
  startedAt: z.number().optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;

const throttle = new Map<string, number>();
const THROTTLE_MS = 30_000;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => enquirySchema.parse(raw))
  .handler(async ({ data }) => {
    if (data.honeypot && data.honeypot.length > 0) {
      return { ok: true as const };
    }
    if (data.startedAt && Date.now() - data.startedAt < 1500) {
      return { ok: false as const, error: "Please take a moment before submitting." };
    }

    const key = `${data.email.toLowerCase()}::${data.source}`;
    const last = throttle.get(key) ?? 0;
    if (Date.now() - last < THROTTLE_MS) {
      return { ok: false as const, error: "Please wait a moment before trying again." };
    }
    throttle.set(key, Date.now());

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const insert = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      state: data.state || null,
      neet_score:
        typeof data.neet_score === "number" && !Number.isNaN(data.neet_score)
          ? data.neet_score
          : null,
      preferred_college: data.preferred_college || null,
      message: data.message || null,
      source: data.source,
    });

    if (insert.error) {
      console.error("[enquiry] insert failed", insert.error);
      return { ok: false as const, error: "Could not save your enquiry. Please try again." };
    }

    // Fire-and-forget email notification via Resend (owner test address).
    try {
      const gwKey = process.env.LOVABLE_API_KEY;
      const resendKey = process.env.RESEND_API_KEY;
      if (gwKey && resendKey) {
        const html = `
          <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;padding:24px;background:#0b1a3a;color:#f8fafc;border-radius:16px">
            <h2 style="margin:0 0 12px;color:#e8c56a">New NEET Expert Enquiry</h2>
            <p style="margin:0 0 16px;color:#cbd5e1">Source: ${data.source}</p>
            <table style="width:100%;border-collapse:collapse;color:#f8fafc">
              <tr><td style="padding:6px 0;color:#94a3b8">Name</td><td>${escape(data.name)}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Phone</td><td>${escape(data.phone)}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Email</td><td>${escape(data.email)}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">State</td><td>${escape(data.state || "-")}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">NEET score</td><td>${data.neet_score ?? "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Preferred college</td><td>${escape(data.preferred_college || "-")}</td></tr>
            </table>
            <p style="margin-top:16px;padding:12px;background:#152246;border-radius:8px;color:#e2e8f0;white-space:pre-wrap">${escape(data.message || "")}</p>
          </div>`;
        const resp = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gwKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: "NEET Expert <onboarding@resend.dev>",
            to: ["expertneet121@gmail.com"],
            subject: `New enquiry — ${data.name}`,
            html,
            reply_to: data.email,
          }),
        });
        if (!resp.ok) console.error("[enquiry] email failed", resp.status, await resp.text());
      }
    } catch (e) {
      console.error("[enquiry] email exception", e);
    }

    return { ok: true as const };
  });

function escape(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}