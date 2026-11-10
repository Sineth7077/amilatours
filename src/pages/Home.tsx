import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Car, Map, Phone, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { Reveal } from "@/components/Reveal";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import {
  heroImage,
  homePreviewImages,
  experienceTypes,
  trustItems,
} from "@/config/hero";
import { tourItineraries } from "@/config/tours";
import { generalInquiryMessage, waLink } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";

const trustIcons = {
  car: Car,
  map: Map,
  sliders: SlidersHorizontal,
};

export default function Home() {
  usePageMeta({
    title: "Amila Tours — Private Sri Lanka Tours & Tailored Itineraries",
    description:
      "Amila Tours arranges private Sri Lanka tours with island-wide transport, airport transfers and flexible tailor-made itineraries with trusted local drivers.",
    image: heroImage.src,
    imageAlt: heroImage.alt,
    path: "/",
  });

  return (
    <div className="bg-background">
      <section className="relative min-h-[78vh] overflow-hidden md:min-h-[90vh]">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/45 via-brand-deep/15 to-brand-deep/80" />
        {/* Dedicated scrim behind the fixed navigation for reliable contrast. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-deep/75 via-brand-deep/30 to-transparent md:h-32"
        />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:min-h-[90vh] md:pb-24">
          <Reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.26em] text-brand-sand">
              Discover Sri Lanka
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-brand-ivory md:text-6xl lg:text-7xl">
              Sri Lanka, arranged around the way you travel.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ivory/85 md:text-lg">
              Private journeys with a dedicated local driver, planned around your
              dates, interests and pace — from ancient cities and tea country to
              wildlife and the coast.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-ivory text-brand-deep hover:bg-brand-sand"
              >
                <Link to="/contact">Plan Your Journey</Link>
              </Button>
              <Link
                to="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-ivory/40 bg-brand-ivory/10 px-8 py-3 text-sm font-medium text-brand-ivory backdrop-blur transition-colors hover:bg-brand-ivory/20"
              >
                Explore Our Tours <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <a
            href="#experiences"
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-ivory/70 transition-colors hover:text-brand-ivory md:flex"
            aria-label="Scroll to experiences"
          >
            Scroll <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="experiences" className="bg-brand-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Experiences"
              title="Journeys shaped by landscape, not by template"
              description="Choose a starting point — wildlife, tea country, coast, heritage, or a fully personalised route — and we will build the days around it."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((experience, index) => (
              <Reveal key={experience.key} delay={index * 70}>
                <Link
                  to={experience.to}
                  className="group relative block overflow-hidden rounded-2xl bg-brand-deep"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={experience.image.src}
                      alt={experience.image.alt}
                      width={experience.image.width}
                      height={experience.image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-brand-ivory">
                    <h3 className="font-display text-xl leading-tight md:text-2xl">
                      {experience.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ivory/80">
                      {experience.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Featured itineraries"
                title="Sample routes to inspire your journey"
                description="Every itinerary is adapted to your dates, group size and interests. These are starting points, not fixed packages."
              />
            </Reveal>
            <Reveal>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest transition-colors hover:text-brand-deep"
              >
                View all tours <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
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
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/images/about-hero.webp"
                  alt="Travelers with a tuk-tuk on a Sri Lankan countryside road"
                  width={1920}
                  height={1273}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Why Amila Tours"
                title="Local planning, personal attention, room to change your mind"
              />
              <div className="mt-8 grid gap-6">
                {trustItems.map((item) => {
                  const Icon = trustIcons[item.icon as keyof typeof trustIcons];
                  return (
                    <div key={item.title} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-forest">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-brand-charcoal">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/Gallery/gallery-13.jpeg"
                  alt="Aerial view of Sri Lankan coastline"
                  width={900}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <SectionHeading
                eyebrow="A small island, fully explored"
                title="From highland mist to warm coastlines in a single day"
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Sri Lanka fits in a day and fills a month. Ancient cities and
                cave temples in the centre, cool tea country in the hills, and
                wildlife and coastline on every edge. We arrange the thread
                between them — the right road, the right pace, the right pause.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Travel with a dedicated driver-guide who knows the island and
                reads your energy. Change a day on the way. Stay longer where
                you fall in love. Skip what you do not.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-forest transition-colors hover:text-brand-deep"
              >
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-brand-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Gallery"
              title="A glimpse of the island"
              description="Moments from journeys across Sri Lanka — wildlife, tea country, coast and ancient cities."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {homePreviewImages.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 60}
                className={index === 0 ? "col-span-2 row-span-2" : ""}
              >
                <Link
                  to="/gallery"
                  className="group block overflow-hidden rounded-xl"
                >
                  <div className={index === 0 ? "aspect-square" : "aspect-[4/5]"}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest transition-colors hover:text-brand-deep"
            >
              See the full gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-brand-sand">
              Start planning
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-brand-ivory md:text-5xl">
              Tell us how you want to travel. We will build the route.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ivory/75 md:text-lg">
              Share your dates, interests and travel style. A personalised
              itinerary lands in your inbox — no obligation, no pressure.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-ivory text-brand-deep hover:bg-brand-sand"
              >
                <Link to="/contact">Plan Your Journey</Link>
              </Button>
              {hasVerifiedContact && (
                <a
                  href={waLink(generalInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-ivory/40 bg-brand-ivory/10 px-8 py-3 text-sm font-medium text-brand-ivory backdrop-blur transition-colors hover:bg-brand-ivory/20"
                >
                  <Phone className="h-4 w-4" />
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
