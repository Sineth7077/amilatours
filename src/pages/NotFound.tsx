import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.26em] text-brand-sage">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-brand-charcoal md:text-6xl">
          This page wandered off the map.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has moved. Let us guide
          you back to the journey.
        </p>
        <div className="mt-9 flex justify-center">
          <Button asChild className="bg-brand-forest text-brand-ivory hover:bg-brand-deep">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
