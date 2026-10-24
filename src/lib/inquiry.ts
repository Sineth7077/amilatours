/**
 * ─────────────────────────────────────────────────────────────
 *  INQUIRY SUBMISSION ADAPTER
 *
 *  ⚠️ DEMO FLOW — there is currently NO backend or email service
 *  connected, so nothing is actually sent anywhere. The form
 *  validates, simulates submission, then hands the traveller a
 *  working WhatsApp flow so the inquiry genuinely reaches the
 *  operator.
 *
 *  TO INTEGRATE A REAL BACKEND LATER:
 *    1. Uncomment the fetch() below and point it at your endpoint.
 *    2. Set `demo: false` in the result (the form already labels
 *       demo results transparently).
 *  The form component does not need to change.
 * ─────────────────────────────────────────────────────────────
 */

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
  /** True while no backend is connected. */
  demo: boolean;
  error?: string;
}

export async function submitInquiry(
  payload: InquiryPayload
): Promise<InquiryResult> {
  // Simulated latency so loading states are real and testable.
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Backend integration point (kept commented until a service exists):
  // try {
  //   const res = await fetch("/api/inquiries", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!res.ok) return { ok: false, demo: false, error: "Something went wrong. Please try WhatsApp instead." };
  //   return { ok: true, demo: false };
  // } catch {
  //   return { ok: false, demo: false, error: "Network error. Please try WhatsApp instead." };
  // }

  if (!payload.name.trim() || !payload.email.trim()) {
    return {
      ok: false,
      demo: true,
      error: "Please provide your name and email address.",
    };
  }

  return { ok: true, demo: true };
}

/** Turns the form values into the pre-filled WhatsApp message. */
export function inquiryToWhatsAppMessage(payload: InquiryPayload): string {
  const lines = [
    `Hello ${siteConfigName}! I'd like to plan a trip.`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    payload.dates && `Travel dates: ${payload.dates}`,
    payload.travellers && `Travellers: ${payload.travellers}`,
    payload.destination && `Destination of interest: ${payload.destination}`,
    payload.tour && `Itinerary: ${payload.tour}`,
    "",
    payload.message ? payload.message : "Please help me plan my journey.",
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

// Imported lazily to keep this module dependency-light.
import { siteConfig as siteConfigName_ } from "@/config/site";
const siteConfigName = siteConfigName_.name;
