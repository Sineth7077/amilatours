import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { heroImage, homePreviewImages, experienceTypes, trustItems } from "@/config/hero";
import { generalInquiryMessage } from "@/lib/whatsapp";
import { GalleryGrid } from "@/components/GalleryGrid";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  usePageMeta({
    title: "Amila Tours — Private Sri Lanka Tours & Tailored Itineraries",
    description:
      "Amila Tours arranges private Sri Lanka tours with island-wide transport, airport transfers and flexible tailor-made itineraries with trusted local drivers.",
    image: heroImage.src,
    path: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="overflow-hidden">
        <section className="relative min-h-[440px] md:h-[720px] w-full overflow-hidden">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173d32]/75 via-[#173d32]/30 to-transparent" />
          <div className="relative container mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 lg:pl-8">
              <h1 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mb-5">
                Discover Sri Lanka
              </h1>
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Private tours, island-wide transport and flexible itineraries planned by trusted local drivers. Tell us your dates and we will build a custom trip around you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-[#0f2b23] hover:bg-gray-100">
                    Plan Your Trip
                  </Button>
                </Link>
                <Link
                  to="/gallery"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-md border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  View Gallery <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-ivory">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0f2b23] mb-3">
                Experiences
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We arrange private, driver-led journeys across Sri Lanka — shaped around your dates, interests and pace. These are the types of experience we can help plan; contact us to build a custom itinerary.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {experienceTypes.map((exp) => (
                <div key={exp.key} className="rounded-lg border border-border bg-background p-6 hover:bg-accent transition-colors">
                  <div className="rounded-md overflow-hidden border border-border bg-muted mb-4" style={{ aspectRatio: `${exp.image.width / exp.image.height}` }}>
                    <img src={exp.image.src} alt={exp.image.alt} width={exp.image.width} height={exp.image.height} loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
                  </div>
                  <h3 className="font-semibold text-[#0f2b23] mb-2">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {trustItems.map((item) => (
                <div key={item.title}>
                  <h3 className="font-semibold text-[#0f2b23] mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-10">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0f2b23] mb-2">
                  From the gallery
                </h2>
                <p className="text-sm text-muted-foreground">
                  A selection of real photographs from Sri Lanka.
                </p>
              </div>
              <Link
                to="/gallery"
                className="text-sm font-medium text-[#173d32] hover:underline"
              >
                View full gallery <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <GalleryGrid images={homePreviewImages} columns="3" />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-lg border border-border bg-[#0f2b23] p-8 md:p-12 text-center md:text-left text-brand-ivory">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
                Ready to plan your trip to Sri Lanka?
              </h2>
              <p className="text-brand-ivory/90 mb-6 max-w-xl mx-auto md:mx-0">
                Tell us your dates, group size and interests — we will shape a custom itinerary and reply personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/contact">
                  <Button size="lg">Plan Your Trip</Button>
                </Link>
                <a
                  href={waLink(generalInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-md border border-brand-ivory/30 bg-brand-ivory/10 text-brand-ivory hover:bg-brand-ivory/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { waLink } from '@/lib/whatsapp';
