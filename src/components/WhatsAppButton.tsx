import { MessageCircle } from "lucide-react";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import { generalInquiryMessage, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp button for quick contact access.
 * Positioned at bottom-right corner with subtle animations.
 */
export default function WhatsAppButton() {
  if (!hasVerifiedContact) return null;

  return (
    <a
      href={waLink(generalInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "flex items-center justify-center",
        "w-14 h-14 md:w-16 md:h-16",
        "rounded-full",
        "bg-[#25D366]",
        "text-white",
        "shadow-lg",
        "transition-all duration-300",
        "hover:scale-110 hover:shadow-xl",
        "hover:bg-[#128C7E]",
        "animate-fade-in-up",
        "group"
      )}
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-brand-deep text-brand-ivory text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden md:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
