import { useState } from "react";
import { usePageMeta } from "@/lib/seo";
import { galleryImages } from "@/config/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export default function Gallery() {
  usePageMeta({
    title: "Image Gallery — Photographs of Sri Lanka by Amila Tours",
    description:
      "A gallery of real photographs from Sri Lanka, taken across the island by Amila Tours. View the full collection and get in touch to plan your visit.",
    image: galleryImages[12].src,
    path: "/gallery",
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-8 md:py-14">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#0f2b23] mb-3">
              Image Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-10">
              All photographs below are from the Amila Tours gallery — real
              images from Sri Lanka. Click a photograph to view it larger.
            </p>
            <GalleryGrid
              images={galleryImages}
              columns="4"
              onSelect={(image) => {
                setLightboxIndex(galleryImages.findIndex((i) => i.src === image.src));
                setLightboxOpen(true);
              }}
            />
          </div>
        </section>
      </main>

      <GalleryLightbox
        open={lightboxOpen}
        images={galleryImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
