/**
 * ─────────────────────────────────────────────────────────────
 *  INQUIRY SUBMISSION ADAPTER
 *
 *  The site has no backend by default. If `VITE_INQUIRY_ENDPOINT`
 *  is set (Formspree, Basin, a serverless function, …) the payload
 *  is POSTed there and `delivered` is true. Otherwise the form
 *  validates the details and hands them to the traveller as a
 *  ready-to-send WhatsApp / email message, so enquiries are never
 *  silently discarded.
 * ─────────────────────────────────────────────────────────────
 */

import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  dates: string;
  travellers: string;
  destination: string;
  tour: string;
  message: string;
}

export interface InquiryResult {
  ok: boolean;
  /** True only when a configured endpoint accepted the inquiry. */
  delivered: boolean;
  error?: string;
}

const ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT?.trim();
const REQUEST_TIMEOUT_MS = 10_000;

/** True when a real submission endpoint is configured for this build. */
export const hasInquiryEndpoint = Boolean(ENDPOINT);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitInquiry(
  payload: InquiryPayload
): Promise<InquiryResult> {
  if (
    !payload.name.trim() ||
    (!payload.email.trim() && !payload.phone.trim())
  ) {
    return {
      ok: false,
      delivered: false,
      error:
        "Please provide your name and either an email address or a phone number.",
    };
  }

  // No endpoint configured: validate locally and let the UI hand the
  // details over to WhatsApp / email / clipboard.
  if (!ENDPOINT) {
    await delay(400);
    return { ok: true, delivered: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        delivered: false,
        error:
          "We could not send your inquiry just now. Please try again, or contact us directly.",
      };
    }

    return { ok: true, delivered: true };
  } catch {
    return {
      ok: false,
      delivered: false,
      error:
        "A network problem stopped your inquiry from sending. Please try again, or contact us directly.",
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Plain-text summary of an inquiry, used for WhatsApp, email and copy. */
export function inquiryMessage(payload: InquiryPayload): string {
  const lines = [
    `Hello ${siteConfig.name}! I'd like to plan a trip to Sri Lanka.`,
    "",
    `Name: ${payload.name}`,
    payload.email && `Email: ${payload.email}`,
    payload.phone && `Phone / WhatsApp: ${payload.phone}`,
    payload.dates && `Travel dates: ${payload.dates}`,
    payload.travellers && `Travellers: ${payload.travellers}`,
    payload.tour && `Itinerary of interest: ${payload.tour}`,
    "",
    payload.message || "Please help me plan my journey.",
  ];

  return lines.filter((line): line is string => Boolean(line)).join("\n");
}

/** Pre-filled WhatsApp link for a completed inquiry. */
export function inquiryWhatsAppLink(payload: InquiryPayload): string {
  return waLink(inquiryMessage(payload));
}

/** Pre-filled mailto link, or null when no email address is configured. */
export function inquiryMailtoLink(payload: InquiryPayload): string | null {
  if (!siteConfig.email) return null;
  const subject = `Trip inquiry — ${payload.name}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(inquiryMessage(payload))}`;
}
