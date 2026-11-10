import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { findTourBySlug, tourItineraries } from "@/config/tours";
import { hasVerifiedContact } from "@/config/site";
import { tourInquiryMessage, waLink } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function TourDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tour = slug ? findTourBySlug(slug) : undefined;

  usePageMeta({
    title: tour ? `${tour.title} — Amila Tours` : "Itinerary not found — Amila Tours",
    description: tour?.description,
    image: tour?.image.src,
    imageAlt: tour?.image.alt,
    path: tour ? `/tours/${tour.slug}` : "/tours",
  });

  if (!tour) return <NotFound />;

  const related = tourItineraries
    .filter((item) => item.slug !== tour.slug)
    .slice(0, 3);

  return (
    <div className="bg-background">
      <PageHero
        image={tour.image}
        eyebrow="Sample itinerary"
        title={tour.title}
        description={tour.description}
        size="md"
        backLink={{ to: "/tours", label: "All tours" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {tour.duration}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {tour.regions.join(" · ")}
        </span>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-sage">
                  Sample itinerary
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-brand-charcoal md:text-4xl">
                  The shape of the journey
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  This route is a starting point. We adjust the length, pace,
                  hotels and stops to match your dates and interests — nothing
                  here is fixed.
                </p>

                <ul className="mt-8 space-y-4">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand-forest">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-brand-charcoal/85 md:text-base">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-brand-sand/40 bg-white p-5">
                    <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-sage">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Best for
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-brand-charcoal/85">
                      {tour.bestFor}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-brand-sand/40 bg-white p-5">
                    <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-sage">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      Best season
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-brand-charcoal/85">
                      {tour.season}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="rounded-2xl border border-brand-sand/50 bg-brand-ivory p-7 lg:sticky lg:top-28">
                  <h2 className="font-display text-2xl text-brand-charcoal">
                    Make this journey yours
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Tell us your dates and group size. We will send a tailored
                    itinerary and a clear quote — no obligation and no payment
                    online.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="bg-brand-forest text-brand-ivory hover:bg-brand-deep"
                    >
                      <Link to={`/contact?tour=${encodeURIComponent(tour.slug)}`}>
                        Enquire about this tour
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    {hasVerifiedContact && (
                      <a
                        href={waLink(tourInquiryMessage(tour.title))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-forest/30 bg-white px-5 py-3 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-mist"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Message on WhatsApp
                      </a>
                    )}
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Private driver, flexible routing and airport transfers can be
                    included in every itinerary.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-brand-ivory py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-sage">
                    Keep exploring
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-brand-charcoal md:text-4xl">
                    Other journeys
                  </h2>
                </div>
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest transition-colors hover:text-brand-deep"
                >
                  View all tours
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <TourCard tour={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
