import { Link, useSearchParams } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import { aboutHeroImage } from "@/config/hero";
import { findTourBySlug } from "@/config/tours";
import { generalInquiryMessage, waLink } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefillSlug = searchParams.get("tour") ?? undefined;
  const matchedTour = prefillSlug ? findTourBySlug(prefillSlug) : undefined;
  const prefillTour = matchedTour?.title ?? prefillSlug;

  const clearPrefill = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("tour");
    setSearchParams(next, { replace: true });
  };

  usePageMeta({
    title: "Contact Amila Tours — Plan Your Sri Lanka Trip",
    description:
      "Get in touch with Amila Tours to plan a private Sri Lanka journey. Share your dates and interests and receive a personalised itinerary.",
    image: aboutHeroImage.src,
    imageAlt: aboutHeroImage.alt,
    path: "/contact",
  });

  return (
    <div className="bg-background">
      <PageHero
        image={aboutHeroImage}
        eyebrow="Contact"
        title="Plan your Sri Lanka journey"
        description="Tell us how you want to travel. We will send a personalised itinerary and a clear quote — no obligation."
        size="sm"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {prefillTour && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-sand/60 bg-brand-ivory px-4 py-3">
                  <p className="text-sm text-brand-charcoal">
                    <span className="text-muted-foreground">
                      Enquiring about:
                    </span>{" "}
                    <span className="font-medium">{prefillTour}</span>
                  </p>
                  <div className="flex items-center gap-4">
                    {matchedTour && (
                      <Link
                        to={`/tours/${matchedTour.slug}`}
                        className="text-xs font-medium text-brand-forest underline-offset-4 hover:underline"
                      >
                        View itinerary
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={clearPrefill}
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-brand-charcoal"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <Reveal>
                <InquiryForm prefillTour={prefillTour} />
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="rounded-2xl border border-brand-sand/40 bg-brand-ivory p-8">
                  <h2 className="font-display text-2xl text-brand-charcoal">
                    Get in touch directly
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Prefer to talk? Reach out by phone or WhatsApp and we will
                    help you shape the trip.
                  </p>

                  <ul className="mt-6 space-y-5 text-sm">
                    {hasVerifiedContact ? (
                      <>
                        <li className="flex items-start gap-3">
                          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-forest" />
                          <div>
                            <a
                              href={`tel:${siteConfig.phone.tel}`}
                              className="font-medium text-brand-charcoal transition-colors hover:text-brand-forest"
                            >
                              {siteConfig.phone.display}
                            </a>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Island-wide pickups
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-forest" aria-hidden="true" />
                          <div>
                            <a
                              href={waLink(generalInquiryMessage())}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-brand-charcoal transition-colors hover:text-brand-forest"
                            >
                              WhatsApp
                            </a>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {siteConfig.hours}
                            </p>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li className="text-sm text-muted-foreground">
                        Phone and WhatsApp details are being finalised. Please
                        use the form and we will reply promptly.
                      </li>
                    )}
                    {siteConfig.email && (
                      <li className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-forest" />
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="font-medium text-brand-charcoal transition-colors hover:text-brand-forest"
                        >
                          {siteConfig.email}
                        </a>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-forest" />
                      <span className="text-muted-foreground">
                        {siteConfig.location}
                      </span>
                    </li>
                  </ul>

                  {hasVerifiedContact && (
                    <a
                      href={waLink(generalInquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-forest px-5 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-deep"
                    >
                      Message on WhatsApp
                    </a>
                  )}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
