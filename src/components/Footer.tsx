import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, navItems, hasVerifiedContact } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";

const Footer = () => {
  return (
    <footer className="bg-brand-deep text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3" aria-label="Amila Tours homepage">
              <img
                src={siteConfig.logo}
                alt=""
                width={1774}
                height={887}
                className="h-9 w-auto brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
              <span className="font-display text-xl font-semibold tracking-tight">
                Amila Tours
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-ivory/75">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brand-sand/80">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sand/80">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-brand-ivory/75 transition-colors hover:text-brand-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sand/80">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              {hasVerifiedContact ? (
                <>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-sand" aria-hidden="true" />
                    <div>
                      <a
                        href={`tel:${siteConfig.phone.tel}`}
                        className="text-brand-ivory transition-colors hover:text-brand-sand"
                      >
                        {siteConfig.phone.display}
                      </a>
                      <p className="mt-1 text-xs text-brand-ivory/60">
                        Island-wide pickups
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-sand" aria-hidden="true" />
                    <a
                      href={waLink(generalInquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-ivory transition-colors hover:text-brand-sand"
                    >
                      WhatsApp
                    </a>
                  </li>
                </>
              ) : (
                <li className="text-sm text-brand-ivory/70">
                  Phone and WhatsApp details are being finalised. Please use the
                  inquiry form and we will reply promptly.
                </li>
              )}
              {siteConfig.email && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-sand" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-ivory transition-colors hover:text-brand-sand"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-sand" aria-hidden="true" />
                <span className="text-brand-ivory/75">{siteConfig.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-sand" aria-hidden="true" />
                <span className="text-brand-ivory/75">{siteConfig.hours}</span>
              </li>
            </ul>

            {siteConfig.socials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-ivory/75 transition-colors hover:text-brand-ivory"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-ivory/15 pt-8 text-xs text-brand-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Amila Tours. All rights reserved.</p>
          <p>Photographs from the Amila Tours gallery.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
