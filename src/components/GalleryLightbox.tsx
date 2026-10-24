"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/config/gallery";

interface GalleryLightboxProps {
  open: boolean;
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Accessible image lightbox.
 * - Esc closes, arrow keys navigate
 * - Focus returns to the trigger when closed
 * - Clicking the backdrop closes
 * - Body scroll is locked while open
 */
export const GalleryLightbox = ({
  open,
  images,
  initialIndex,
  onClose,
}: GalleryLightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const previousFocus = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const image = images[index];
  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  useEffect(() => {
    if (!open) return;
    const active = document.activeElement as HTMLElement | null;
    previousFocus.current =
      active && active.tagName !== "BODY" ? active : null;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
  }, [open, initialIndex, images.length]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") setIndex(prevIndex);
      else if (event.key === "ArrowRight") setIndex(nextIndex);
    },
    [onClose, prevIndex, nextIndex]
  );

  const handleLoad = () => {
    imageRef.current?.focus();
  };

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col"
      aria-modal="true"
      role="dialog"
      aria-label="Image gallery lightbox"
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 bg-brand-charcoal/90 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12 min-h-[60vh]">
        <button
          onClick={() => setIndex(prevIndex)}
          aria-label="Previous image"
          disabled={images.length === 1}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative flex-grow max-w-4xl max-h-[70vh] flex items-center justify-center" onClick={onClose}>
          <img
            ref={imageRef}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            decoding="async"
            className="max-w-full max-h-[70vh] object-contain shadow-2xl"
            onLoad={handleLoad}
          />
        </div>

        <button
          onClick={() => setIndex(nextIndex)}
          aria-label="Next image"
          disabled={images.length === 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow flex items-end justify-end px-6 py-4">
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default GalleryLightbox;
