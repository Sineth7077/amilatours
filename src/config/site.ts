/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL BUSINESS CONFIGURATION — AMILA TOURS
 *  Edit this one file to update branding and contact details
 *  everywhere (navigation, footer, contact page, WhatsApp links).
 *
 *  ⚠️ PLACEHOLDER NOTICE
 *  `isPlaceholderContact: true` → phone / WhatsApp values below
 *  are development placeholders. The UI shows "To be confirmed"
 *  chips in their place and disables WhatsApp CTAs. Replace the
 *  values and flip the flag to false to activate them everywhere.
 * ─────────────────────────────────────────────────────────────
 */

export interface NavItem {
  label: string;
  to: string;
}

export const siteConfig = {
  name: "Amila Tours",
  tagline: "Discover Sri Lanka",
  description:
    "Private tours and travel across Sri Lanka — comfortable vehicles, flexible itineraries, airport transfers and personal planning with trusted local drivers.",

  /** Flip to false once real contact details are in place. */
  isPlaceholderContact: false,

  /** Approved logo (transparent PNG, stored with the gallery assets). */
  logo: "/Gallery/Amila%20Tours%20Sri%20Lanka%20Logo.png",

  phone: {
    display: "+94 77 802 3760",
    tel: "+94778023760",
  },

  whatsapp: {
    /** Digits only, including country code (used for wa.me links). */
    number: "94778023760",
    display: "+94 77 802 3760",
  },

  /** Verified email address. */
  email: "amilabalasuriya1@gmail.com",

  location: "Sri Lanka — island-wide pickups",

  hours: "Messages answered daily, 7:00 AM – 9:00 PM (GMT+5:30)",

  /** No verified profiles yet — empty list hides the icon row. */
  socials: [] as { label: string; url: string }[],

  /**
   * Production domain (set via VITE_SITE_URL environment variable).
   * Used for canonical URLs and Open Graph tags. Leave unset until the
   * real domain is configured — no fake domain is published.
   */
  siteUrl: (import.meta.env.VITE_SITE_URL || undefined) as string | undefined,
} as const;

/** True once placeholder contact details have been replaced. */
export const hasVerifiedContact =
  !siteConfig.isPlaceholderContact && siteConfig.whatsapp.number.length > 0;

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Tours", to: "/tours" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];