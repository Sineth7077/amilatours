import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type HeroSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<HeroSize, string> = {
  sm: "min-h-[46vh] md:min-h-[54vh]",
  md: "min-h-[54vh] md:min-h-[64vh]",
  lg: "min-h-[60vh] md:min-h-[70vh]",
};

interface PageHeroProps {
  image: GalleryImage;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Controls the minimum height of the banner. */
  size?: HeroSize;
  /** Extra chips or actions rendered under the description. */
  children?: ReactNode;
  /** Optional back link shown above the eyebrow. */
  backLink?: { to: string; label: string };
}

/**
 * Shared full-bleed page banner. Sits directly under the fixed, transparent
 * navigation: a dark top scrim keeps the nav legible while the content is
 * anchored to the bottom edge so the photo stays the focal point.
 */
export const PageHero = ({
  image,
  eyebrow,
  title,
  description,
  size = "md",
  children,
  backLink,
}: PageHeroProps) => (
  <section
    className={cn(
      "relative overflow-hidden bg-brand-deep",
      SIZE_CLASSES[size]
    )}
  >
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Base tone: darkens the top and bottom of the photograph. */}
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-b from-brand-deep/55 via-brand-deep/25 to-brand-deep/90"
    />

    {/* Dedicated scrim behind the fixed navigation for reliable contrast. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-deep/75 via-brand-deep/30 to-transparent md:h-32"
    />

    <div
      className={cn(
        "relative mx-auto flex max-w-7xl flex-col justify-end px-6 pb-14 pt-28 md:pb-20",
        SIZE_CLASSES[size]
      )}
    >
      <Reveal>
        {backLink && (
          <Link
            to={backLink.to}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-ivory/70 transition-colors hover:text-brand-ivory"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {backLink.label}
          </Link>
        )}
        {eyebrow && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-brand-sand">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-4xl leading-[1.08] text-brand-ivory md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-ivory/85 md:text-lg">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-7 flex flex-wrap items-center gap-2.5 text-sm text-brand-ivory">
            {children}
          </div>
        )}
      </Reveal>
    </div>
  </section>
);

export default PageHero;
