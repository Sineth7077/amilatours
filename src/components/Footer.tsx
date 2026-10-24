import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { siteConfig, navItems } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <img
                src={siteConfig.logo}
                alt="Amila Tours — Sri Lanka"
                width={1774}
                height={887}
                className="h-8 w-auto block"
                loading="eager"
                decoding="async"
              />
              <span className="font-display font-semibold text-brand-charcoal tracking-tight">
                Amila Tours
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Independent Sri Lankan tour operator planning private tours,
              island-wide transport and flexible itineraries with trusted local
              drivers.
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Get in touch
            </h2>
            <ul className="space-y-4 text-sm">
              {siteConfig.isPlaceholderContact ? (
                <li className="text-sm text-muted-foreground">
                  Contact details are being finalised. Please use the inquiry
                  form in the meantime.
                </li>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <a
                        href={`tel:${siteConfig.phone.tel}`}
                        className="text-foreground hover:underline"
                      >
                        {siteConfig.phone.display}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Island-wide pickups
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <a
                      href={waLink(generalInquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      WhatsApp
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Messages answered daily
                    </p>
                  </li>
                </>
              )}
              <li className="text-xs text-muted-foreground">
                {siteConfig.hours}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Website
            </h2>
            <ul className="space-y-4 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Amila Tours. All rights reserved.
          </p>
          <p className="hidden lg:block">
            Photographs from the Amila Tours gallery.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
