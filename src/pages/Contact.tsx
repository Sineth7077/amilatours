import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefillTour = searchParams.get("tour") ?? undefined;

  usePageMeta({
    title: "Contact Amila Tours — Plan Your Sri Lanka Trip",
    description:
      "Contact Amila Tours, an independent Sri Lankan tour operator. Phone, WhatsApp and inquiry form for private tours, airport transfers and tailor-made itineraries.",
    image: "/Gallery/gallery-13.jpeg",
    path: "/contact",
  });

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-8 md:py-14">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#0f2b23] mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Planning a trip to Sri Lanka? Tell us your dates, group size and
              interests, and we will propose a custom itinerary. You can also
              call or WhatsApp us directly.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact details */}
              <div className="lg:col-span-4">
                <div className="rounded-lg border border-border bg-background p-6 md:p-8">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-[#0f2b23] mb-6">
                    Get in touch
                  </h2>
                  <ul className="space-y-6">
                    {siteConfig.isPlaceholderContact ? (
                      <li className="text-sm text-muted-foreground">
                        Phone and WhatsApp details are being finalised. Please use
                        the inquiry form and we will reply promptly.
                      </li>
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Phone className="w-4 h-4 text-[#173d32]" />
                          </div>
                          <div>
                            <p className="font-medium">Call us</p>
                            <a
                              href={`tel:${siteConfig.phone.tel}`}
                              className="text-sm text-[#173d32] hover:underline"
                            >
                              {siteConfig.phone.display}
                            </a>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <a
                              href={waLink(generalInquiryMessage())}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-[#173d32] hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Save our number and message us directly.
                          </p>
                        </li>
                      </>
                    )}
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {siteConfig.email ? (
                          <Mail className="w-4 h-4 text-[#173d32]" />
                        ) : null}
                      </div>
                      {siteConfig.email ? (
                        <div>
                          <p className="font-medium">Email us</p>
                          <a
                            href={`mailto:${siteConfig.email}`}
                            className="text-sm text-[#173d32] hover:underline"
                          >
                            {siteConfig.email}
                          </a>
                        </div>
                      ) : null}
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#173d32]" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {siteConfig.location}
                        </p>
                      </div>
                    </li>
                    <li className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.hours}
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 text-xs text-muted-foreground">
                    No booking is made until you confirm the itinerary and price
                    with us directly.
                  </p>
                </div>
              </div>

              {/* Inquiry form */}
              <div className="lg:col-span-8">
                <div className="rounded-lg border border-border bg-background p-6 md:p-8">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-[#0f2b23] mb-1">
                    Send an inquiry
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    We will reply by email, phone or WhatsApp as soon as
                    possible.
                  </p>
                  <InquiryForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
