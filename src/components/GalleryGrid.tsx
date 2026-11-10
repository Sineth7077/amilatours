import { Maximize2 } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
  onSelect?: (image: GalleryImage) => void;
  columns?: "2" | "3" | "4";
}

const COLUMN_CLASSES: Record<string, string> = {
  "2": "columns-1 sm:columns-2",
  "3": "columns-1 sm:columns-2 lg:columns-3",
  "4": "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
};

export const GalleryGrid = ({
  images,
  onSelect,
  columns = "3",
}: GalleryGridProps) => (
  <section className="bg-background py-16 md:py-20" aria-label="Photo gallery">
    <div className="mx-auto max-w-7xl px-6">
      <div className={[COLUMN_CLASSES[columns], "gap-4 space-y-4"].join(" ")}>
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onSelect?.(image)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2"
            aria-label={`Open larger photo: ${image.alt}`}
            aria-haspopup="dialog"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-forest opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default GalleryGrid;
