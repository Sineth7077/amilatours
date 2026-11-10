import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";

interface GalleryLightboxProps {
  open: boolean;
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Accessible image lightbox.
 * - Esc closes, arrow keys navigate, focus is trapped inside
 * - Focus returns to the trigger when closed
 * - Clicking the backdrop closes; clicking the photo does not
 * - Body scroll is locked without layout shift
 */
export const GalleryLightbox = ({
  open,
  images,
  initialIndex,
  onClose,
}: GalleryLightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const count = images.length;
  const image = images[index];
  const prevIndex = count > 0 ? (index - 1 + count) % count : 0;
  const nextIndex = count > 0 ? (index + 1) % count : 0;

  const goPrev = useCallback(() => setIndex(prevIndex), [prevIndex]);
  const goNext = useCallback(() => setIndex(nextIndex), [nextIndex]);

  // Keep the visible photo in sync with the requested starting point.
  useEffect(() => {
    if (!open) return;
    setIndex(Math.max(0, Math.min(initialIndex, Math.max(count - 1, 0))));
  }, [open, initialIndex, count]);

  // Lock background scrolling and restore focus on close.
  useEffect(() => {
    if (!open) return;

    const active = document.activeElement as HTMLElement | null;
    previousFocus.current =
      active && active.tagName !== "BODY" ? active : null;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    containerRef.current?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  // Keyboard controls + focus trap.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const items = Array.from(focusable);
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === containerRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goPrev, goNext]);

  // Warm the cache for the neighbouring photos.
  useEffect(() => {
    if (!open || count < 2) return;
    [prevIndex, nextIndex].forEach((i) => {
      const neighbour = images[i];
      if (!neighbour) return;
      const img = new Image();
      img.src = neighbour.src;
    });
  }, [open, count, prevIndex, nextIndex, images]);

  if (!open || !image) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-[80] flex flex-col outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}: ${image.alt}`}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-brand-charcoal/92 backdrop-blur-sm"
      />

      <div className="pointer-events-none relative z-10 flex flex-1 items-center justify-center p-4 sm:p-8 md:p-12">
        <button
          type="button"
          onClick={() => setIndex(prevIndex)}
          aria-label="Previous photo"
          disabled={count < 2}
          className="pointer-events-auto absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30 sm:left-4"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <figure className="pointer-events-auto flex max-h-full flex-col items-center">
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            decoding="async"
            className="max-h-[76vh] max-w-full rounded-sm object-contain shadow-2xl"
          />
        </figure>

        <button
          type="button"
          onClick={() => setIndex(nextIndex)}
          aria-label="Next photo"
          disabled={count < 2}
          className="pointer-events-auto absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30 sm:right-4"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pb-5 text-xs text-white/70 sm:px-8">
        <p aria-live="polite">
          {index + 1} / {count}
        </p>
        <p className="hidden sm:block">Use ← → to browse · Esc to close</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default GalleryLightbox;
