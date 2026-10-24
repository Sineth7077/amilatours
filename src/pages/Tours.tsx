import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toursHeroImage } from "@/config/hero";
import { siteConfig } from "@/config/site";
import { tourItineraries } from "@/config/tours";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";

export default function Tours() {
  usePageMeta({
    title: "Tours & Itineraries — Amila Tours Sri Lanka",
    description:
      "Tailor-made Sri Lanka tour itineraries planned around your dates, interests and budget, with a private driver and flexible routing.",
    image: toursHeroImage.src,
    path: "/tours",
  });

  const heroImage = toursHeroImage;

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative h-[360px] md:h-[460px] w-full overflow-hidden">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173d32]/75 via-[#173d32]/30 to-transparent" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
              <ol className="flex items-center gap-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">
                  Tours
                </li>
              </ol>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
              Tours &amp; itineraries
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
              Every trip is planned around your dates, group size and interests.
              Below are sample routes to inspire your journey — we tailor each one
              to you, with a private driver and flexible stops.
            </p>
          </div>
        </section>


        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {tourItineraries.length === 0 ? (
              <div className="rounded-lg border border-border bg-muted/40 p-8 text-center text-muted-foreground">
                Itineraries are being prepared. Please{" "}
                <Link to="/contact" className="text-[#173d32] hover:underline">
                  get in touch
                </Link>{" "}
                and we will design a route for you.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tourItineraries.map((itinerary) => (
                  <article
                    key={itinerary.slug}
                    className="rounded-xl border border-border bg-background overflow-hidden shadow-sm flex flex-col"
                  >
                    <figure className="relative">
                      <img
                        src={itinerary.image.src}
                        alt={itinerary.image.alt}
                        width={itinerary.image.width}
                        height={itinerary.image.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-56 object-cover object-center"
                      />
                      <figcaption className="sr-only">
                        {itinerary.image.alt}
                      </figcaption>
                      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[#173d32] px-3 py-1 text-xs font-medium text-white shadow">
                        {itinerary.duration}
                      </span>
                    </figure>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-[#0f2b23] mb-2">
                        {itinerary.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {itinerary.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-xs font-medium text-foreground mb-2">
                          Regions
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {itinerary.regions.map((region) => (
                            <li
                              key={region}
                              className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                            >
                              {region}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-5">
                        <p className="text-xs font-medium text-foreground mb-2">
                          Highlights
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                          {itinerary.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-5 text-xs text-muted-foreground space-y-1">
                        <p>
                          <span className="font-medium text-foreground">
                            Best for:
                          </span>{" "}
                          {itinerary.bestFor}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Best season:
                          </span>{" "}
                          {itinerary.season}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <Link
                          to={`/contact?tour=${encodeURIComponent(itinerary.title)}`}
                          aria-label={`Inquire about ${itinerary.title}`}
                        >
                          <Button size="sm" className="gap-2 w-full sm:w-auto">
                            Inquire about this itinerary{" "}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0f2b23] mb-3">
              How planning works
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
              We keep it simple and personal — no fixed packages, no call centres.
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="rounded-lg border border-border bg-background p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#173d32] text-white text-sm font-semibold mb-3">
                  1
                </span>
                <h3 className="font-semibold text-[#0f2b23] mb-2">
                  Share your dates
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tell us when you are travelling, your group size and what you
                  want to see.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-background p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#173d32] text-white text-sm font-semibold mb-3">
                  2
                </span>
                <h3 className="font-semibold text-[#0f2b23] mb-2">
                  Receive a draft route
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We propose a day-by-day route with estimated driving times and
                  costs.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-background p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#173d32] text-white text-sm font-semibold mb-3">
                  3
                </span>
                <h3 className="font-semibold text-[#0f2b23] mb-2">
                  Refine and confirm
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Adjust stops, pace and budget until it fits — then we lock it in.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-lg border border-border bg-muted/40 p-6 md:p-8 text-center">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-[#0f2b23] mb-2">
                Prefer something bespoke?
              </h2>
              <p className="text-muted-foreground mb-5 max-w-xl mx-auto">
                Tell us your dates, group size and interests and we will design a
                route from scratch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact">
                  <Button size="lg">Plan your trip</Button>
                </Link>
                {!siteConfig.isPlaceholderContact ? (
                  <a
                    href={waLink(generalInquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                    aria-label="Message Amila Tours on WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp us
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-md">
                    WhatsApp: to be confirmed
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

