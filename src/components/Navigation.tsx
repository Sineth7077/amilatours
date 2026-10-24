import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, navItems } from "@/config/site";
import { waLink, generalInquiryMessage } from "@/lib/whatsapp";

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const button = buttonRef.current;
    const menu = menuRef.current;
    button?.setAttribute("aria-expanded", "true");
    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a, button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        button?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(focusable ?? []);
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index === 0) {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      }
    };
    menu?.addEventListener("keydown", onKey);
    return () => {
      button?.setAttribute("aria-expanded", "false");
      menu?.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => closeMenu(), [location]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        closeMenu();
      }
    },
    [menuOpen]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const isActive = (to: string) =>
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(`${to}/`));

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Amila Tours homepage"
          >
            <img
              src={siteConfig.logo}
              alt="Amila Tours — Sri Lanka"
              width={1774}
              height={887}
              className="h-10 w-auto block"
              loading="eager"
              decoding="async"
            />
            <span className="font-display font-semibold text-[#0f2b23] tracking-tight">
              Amila Tours
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors",
                  isActive(item.to)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-4 py-2 text-[#0f2b23] border border-[#173d32] rounded-md hover:bg-[#173d32] hover:text-white transition-colors font-medium"
              onClick={closeMenu}
            >
              Plan Your Trip
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!siteConfig.isPlaceholderContact ? (
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                aria-label="Message Amila Tours on WhatsApp"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border border-border rounded-md">
                WhatsApp: to be confirmed
              </span>
            )}
            <button
              ref={buttonRef}
              onClick={openMenu}
              className="md:hidden inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/80 z-40 md:hidden",
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none transition-all duration-300 ease-out"
        )}
        role="menu"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "block px-4 py-3 text-base rounded-lg transition-colors",
                isActive(item.to)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <Link
              to="/contact"
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors",
                isActive("/contact")
                  ? "bg-[#173d32] text-white"
                  : "text-[#173d32] border border-[#173d32] hover:bg-[#173d32] hover:text-white"
              )}
              onClick={closeMenu}
            >
              Plan Your Trip
            </Link>
            {!siteConfig.isPlaceholderContact ? (
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Message Amila Tours on WhatsApp"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            ) : (
              <span className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base rounded-lg border border-border bg-background text-muted-foreground">
                WhatsApp: to be confirmed
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
