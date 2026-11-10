import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { Reveal } from "@/components/Reveal";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import { toursHeroImage } from "@/config/hero";
import { tourItineraries } from "@/config/tours";
import { generalInquiryMessage, waLink } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";

export default function Tours() {
  usePageMeta({
    title: "Sri Lanka Tour Itineraries — Amila Tours",
    description:
      "Private Sri Lanka tour itineraries covering hill country, wildlife, coast and cultural heritage. Adapted to your dates and interests.",
    image: toursHeroImage.src,
    imageAlt: toursHeroImage.alt,
    path: "/tours",
  });

  return (
    <div className="bg-background">
      <PageHero
        image={toursHeroImage}
        eyebrow="Our tours"
        title="Sri Lanka itineraries built around your way of travelling"
        description="Four starting routes across hill country, wildlife, coast and heritage. Every one is adapted to your dates, group and interests."
        size="md"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Sample itineraries"
              title="Choose a starting point"
              description="These are frameworks, not fixed packages. We adjust length, pace and inclusions to suit you."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {tourItineraries.map((tour, index) => (
              <Reveal key={tour.slug} delay={index * 90}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-mist py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-brand-charcoal md:text-5xl">
              Need something different?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Tell us your dates, interests and budget. We will design a route
              from scratch — no obligation.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-forest text-brand-ivory hover:bg-brand-deep"
              >
                <Link to="/contact">Plan Your Journey</Link>
              </Button>
              {hasVerifiedContact && (
                <a
                  href={waLink("Hi Amila Tours, I would like a custom Sri Lanka itinerary.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-sand px-8 py-3 text-sm font-medium text-brand-forest transition-colors hover:bg-white"
                >
                  Message on WhatsApp
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
