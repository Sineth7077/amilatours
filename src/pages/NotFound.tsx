import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found — Amila Tours",
    description: "The page you are looking for does not exist. Return to the Amila Tours homepage.",
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <main className="text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#0f2b23] mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          We could not find the page you are looking for.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-[#173d32] font-medium hover:underline">
          Return to homepage <span aria-hidden="true">&rarr;</span>
        </Link>
      </main>
    </div>
  );
};
