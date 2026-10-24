import { GalleryImage } from "@/config/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
  onSelect?: (image: GalleryImage) => void;
  columns?: "2" | "3" | "4";
}

const COLUMN_CLASSES: Record<string, string> = {
  "2": "grid-cols-1 sm:grid-cols-2 gap-4",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
};

export const GalleryGrid = ({
  images,
  onSelect,
  columns = "3",
}: GalleryGridProps) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div
        className={[
          "grid",
          COLUMN_CLASSES[columns],
        ].join(" ")}
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="group rounded-lg overflow-hidden border border-border bg-muted"
            onClick={() => onSelect?.(image)}
            role="button"
            tabIndex={onSelect ? 0 : undefined}
            aria-label={onSelect ? `Open ${image.alt}` : undefined}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect?.(image);
              }
            }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${image.width / image.height}` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GalleryGrid;
