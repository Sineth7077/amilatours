import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { aboutHeroImage } from "@/config/hero";

export default function About() {
  usePageMeta({
    title: "About Amila Tours — Independent Sri Lankan Tour Operator",
    description:
      "About Amila Tours: an independent Sri Lankan tour operator arranging private tours, island-wide transport and flexible itineraries with trusted local drivers.",
    image: aboutHeroImage.src,
    path: "/about",
  });

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative h-[420px] md:h-[520px] w-full overflow-hidden">
          <img
            src={aboutHeroImage.src}
            alt={aboutHeroImage.alt}
            width={aboutHeroImage.width}
            height={aboutHeroImage.height}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173d32]/70 via-[#173d32]/25 to-transparent" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
              About Amila Tours
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0f2b23] mb-5">
                  An independent Sri Lankan tour operator
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Amila Tours arranges private journeys across Sri Lanka for
                  travellers who want a flexible, personalised trip — without
                  fixed packages or rigid itineraries. Whether you are visiting
                  cultural sites, national parks, hill country or the coast, we
                  organise transport and a plan built around your dates and
                  interests.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every journey uses a private, air-conditioned vehicle with an
                  experienced local driver, and we offer island-wide pickups —
                  including airport transfers from Bandaranaike International
                  Airport.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are a small, direct team: you speak with us, not a
                  call centre. Messages are answered daily from 7:00 AM to
                  9:00 PM (GMT+5:30).
                </p>
              </div>

              <div className="space-y-5">
                <div className="rounded-lg border border-border bg-background p-6">
                  <h3 className="font-semibold text-[#0f2b23] mb-2">What we arrange</h3>
                  <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-5">
                    <li>Private tours with a driver-guide</li>
                    <li>Cultural and heritage visits</li>
                    <li>Nature and wildlife excursions</li>
                    <li>Scenic hill-country journeys</li>
                    <li>Beach and coastal stays</li>
                    <li>Airport transfers and point-to-point transport</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-brand-deep bg-brand-deep p-6 text-brand-ivory">
                  <h3 className="font-semibold mb-2">Get in touch</h3>
                  <p className="text-brand-ivory/90 text-sm mb-4">
                    Tell us your travel dates and group size, and we will propose
                    a custom itinerary.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/contact">
                      <Button size="sm">Plan Your Trip</Button>
                    </Link>
                    <a
                      href={waLink(generalInquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-brand-ivory/30 bg-brand-ivory/10 text-brand-ivory hover:bg-brand-ivory/20 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
