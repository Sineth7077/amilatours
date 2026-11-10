import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/** Routes whose pages start with a full-bleed hero under the fixed header. */
const HERO_ROUTES = new Set(["/", "/about", "/tours", "/gallery", "/contact"]);

const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

const isHeroRoute = (pathname: string) => {
  const path = normalizePath(pathname);
  return HERO_ROUTES.has(path) || /^\/tours\/[^/]+$/.test(path);
};

/**
 * Resets scroll position on forward navigation. Back/forward keeps the
 * browser's restored position so history behaves as expected.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const hero = isHeroRoute(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-forest focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-brand-ivory"
      >
        Skip to content
      </a>
      <Navigation />
      <main
        id="main-content"
        tabIndex={-1}
        className={
          hero ? "flex-1 outline-none" : "flex-1 pt-16 outline-none md:pt-20"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/itineraries" element={<Navigate to="/tours" replace />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" offset={88} closeButton />
      <AppShell />
    </BrowserRouter>
  );
}
