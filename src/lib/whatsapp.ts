import { siteConfig } from "@/config/site";

/** Builds a WhatsApp chat link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    message
  )}`;
}

/** Pre-filled message for a specific tour's inquiry button. */
export function tourInquiryMessage(tourTitle: string): string {
  return `Hello ${siteConfig.name}! I'm interested in the "${tourTitle}" tour. Could you share details, current pricing and available dates?`;
}

/** Pre-filled message for a general trip-planning inquiry. */
export function generalInquiryMessage(): string {
  return `Hello ${siteConfig.name}! I'd like to plan a trip to Sri Lanka. Could we discuss a custom itinerary?`;
}
