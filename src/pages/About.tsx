import { Link } from "react-router-dom";
import { ArrowRight, Car, Heart, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteConfig, hasVerifiedContact } from "@/config/site";
import { aboutHeroImage } from "@/config/hero";
import { generalInquiryMessage, waLink } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/seo";

export default function About() {
  usePageMeta({
    title: "About Amila Tours — Sri Lanka Travel, Personally Arranged",
    description:
      "Amila Tours is a Sri Lanka travel company arranging private, driver-led journeys and tailor-made itineraries with trusted local drivers.",
    image: aboutHeroImage.src,
    imageAlt: aboutHeroImage.alt,
    path: "/about",
  });

  return (
    <div className="bg-background">
      <PageHero
        image={aboutHeroImage}
        eyebrow="About Amila Tours"
        title="A local team that knows the island — and travels it with you."
        description="We arrange private Sri Lanka journeys with dedicated drivers, island-wide transport and itineraries built around your pace."
        size="lg"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/Gallery/gallery-08.jpeg"
                  alt="Sri Lankan travel scene"
                  width={900}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Our story"
                title="Built on the road, guided by hospitality"
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Amila Tours grew out of years driving the island — through
                ancient cities, cool hill country, wildlife parks and the long
                coastlines. We saw travellers arrive with big expectations and
                leave with more than they hoped for, simply because someone
                local had read the trip well.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Today we plan and drive private journeys for couples, families
                and small groups. We handle airport pickups, daily transport,
                accommodation guidance and the small adjustments that make a
                long trip feel effortless.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We are not a booking engine. We are a team you can call, and a
                driver you will come to know.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-brand-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Everything between arrival and departure"
              description="One point of contact, one trusted driver, and a route shaped around you."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Car,
                title: "Airport & island transfers",
                text: "Private pickups from any airport and daily transport across the island.",
              },
              {
                icon: MapPin,
                title: "Tailor-made itineraries",
                text: "Routes built around your dates, interests, budget and travel style.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted local drivers",
                text: "Experienced, English-speaking drivers who know the roads and the island.",
              },
              {
                icon: Heart,
                title: "Flexible on the road",
                text: "Change a day, stay longer, skip a stop — we adapt as you travel.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-brand-sand/40 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mist text-brand-forest">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { value: "Island-wide", label: "Coverage across Sri Lanka" },
              { value: "Private", label: "Dedicated driver for every journey" },
              { value: "Flexible", label: "Itineraries that adapt as you travel" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div className="text-center">
                  <p className="font-display text-4xl text-brand-forest md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-brand-ivory md:text-5xl">
              Ready to plan your Sri Lanka journey?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ivory/75 md:text-lg">
              Share your dates and interests. We will send a personalised
              itinerary and a clear quote — no obligation.
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
