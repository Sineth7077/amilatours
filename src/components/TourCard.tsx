import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourItinerary } from "@/config/tours";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import { tourInquiryMessage, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: TourItinerary;
  className?: string;
}

export const TourCard = ({ tour, className }: TourCardProps) => {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-sand/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link
          to={`/tours/${tour.slug}`}
          className="block h-full w-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={tour.image.src}
            alt={tour.image.alt}
            width={tour.image.width}
            height={tour.image.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-brand-ivory">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Clock className="h-3.5 w-3.5" />
            {tour.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-tight text-brand-charcoal md:text-2xl">
          <Link
            to={`/tours/${tour.slug}`}
            className="transition-colors hover:text-brand-forest"
          >
            {tour.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tour.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tour.regions.map((region) => (
            <span
              key={region}
              className="inline-flex items-center gap-1 rounded-full bg-brand-mist px-3 py-1 text-xs text-brand-forest"
            >
              <MapPin className="h-3 w-3" />
              {region}
            </span>
          ))}
        </div>

        {tour.highlights.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm text-brand-charcoal/80">
            {tour.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sage" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-brand-charcoal">Best for:</span>{" "}
            {tour.bestFor}
          </p>
          <p>
            <span className="font-medium text-brand-charcoal">Season:</span>{" "}
            {tour.season}
          </p>
        </div>

        <Link
          to={`/tours/${tour.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-forest transition-colors hover:text-brand-deep"
        >
          View full itinerary
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1 bg-brand-forest text-brand-ivory hover:bg-brand-deep">
            <Link to={`/contact?tour=${encodeURIComponent(tour.slug)}`}>
              Enquire <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          {hasVerifiedContact && (
            <a
              href={waLink(tourInquiryMessage(tour.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-brand-sand px-4 py-2 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-mist"
              aria-label={`Message Amila Tours about ${tour.title} on WhatsApp`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TourCard;
