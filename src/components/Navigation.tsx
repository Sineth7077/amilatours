import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig, navItems, hasVerifiedContact } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 48
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isHeroRoute =
    ["/", "/about", "/tours", "/gallery", "/contact"].includes(
      location.pathname.replace(/\/+$/, "")
    ) || /^\/tours\/[^/]+\/?$/.test(location.pathname);
  const solid = !isHeroRoute || scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const button = buttonRef.current;

    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        button?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(focusable ?? []);
      if (items.length === 0) return;
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (
        menu &&
        !menu.contains(event.target as Node) &&
        !button?.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  const isActive = (to: string) =>
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(`${to}/`));

  const linkClass = (to: string) =>
    cn(
      "relative text-sm font-medium transition-colors",
      solid
        ? isActive(to)
          ? "text-brand-forest"
          : "text-brand-charcoal/75 hover:text-brand-forest"
        : isActive(to)
        ? "text-white"
        : "text-white/80 hover:text-white"
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "transition-all duration-300",
          solid
            ? "border-b border-brand-sand/40 bg-brand-ivory/95 shadow-sm backdrop-blur-md"
            : "border-b border-white/10 bg-transparent"
        )}
        aria-label="Primary"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Amila Tours — home"
          >
            <img
              src={siteConfig.logo}
              alt=""
              width={1774}
              height={887}
              className={cn(
                "h-9 w-auto transition-[filter] duration-300 md:h-10",
                !solid && "brightness-0 invert"
              )}
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={linkClass(item.to)}
                aria-current={isActive(item.to) ? "page" : undefined}
              >
                {item.label}
                {isActive(item.to) && (
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full",
                      solid ? "bg-brand-forest" : "bg-white"
                    )}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {hasVerifiedContact && (
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                  solid
                    ? "text-brand-charcoal/75 hover:text-brand-forest"
                    : "text-white/80 hover:text-white"
                )}
                aria-label="Message Amila Tours on WhatsApp"
              >
                WhatsApp
              </a>
            )}
            <Link
              to="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-all",
                solid
                  ? "bg-brand-forest text-brand-ivory hover:bg-brand-deep"
                  : "border border-white/70 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-brand-forest"
              )}
            >
              Plan Your Trip
            </Link>
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 transition-colors md:hidden",
              solid
                ? "text-brand-charcoal hover:bg-brand-sand/40"
                : "text-white hover:bg-white/10"
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close main menu" : "Open main menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn(
            "border-t border-brand-sand/40 bg-brand-ivory transition-all md:hidden",
            menuOpen
              ? "visible max-h-[80vh] opacity-100"
              : "invisible max-h-0 overflow-hidden opacity-0"
          )}
          style={{ transition: "max-height 280ms ease, opacity 200ms ease" }}
          aria-hidden={!menuOpen}
        >
          <div className="space-y-1 px-6 py-5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-3 text-base transition-colors",
                  isActive(item.to)
                    ? "bg-brand-sand/40 text-brand-forest"
                    : "text-brand-charcoal/80 hover:bg-brand-sand/20 hover:text-brand-forest"
                )}
                aria-current={isActive(item.to) ? "page" : undefined}
                tabIndex={menuOpen ? undefined : -1}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-brand-forest px-4 py-3 text-base font-medium text-brand-ivory transition-colors hover:bg-brand-deep"
                tabIndex={menuOpen ? undefined : -1}
              >
                Plan Your Trip
              </Link>
            </div>
            {!hasVerifiedContact && (
              <p className="pt-3 text-center text-xs text-brand-charcoal/60">
                Phone and WhatsApp details are being finalised — use the inquiry
                form and we will reply.
              </p>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
