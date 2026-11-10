import { useState } from "react";
import { Camera } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { galleryImages } from "@/config/gallery";
import { galleryHeroImage } from "@/config/hero";
import { usePageMeta } from "@/lib/seo";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  usePageMeta({
    title: "Sri Lanka Travel Gallery — Amila Tours",
    description:
      "A curated collection of photographs from Sri Lanka — wildlife, tea country, coast, ancient cities and everyday island life.",
    image: galleryHeroImage.src,
    imageAlt: galleryHeroImage.alt,
    path: "/gallery",
  });

  const handleSelect = (image: (typeof galleryImages)[number]) => {
    const index = galleryImages.findIndex((item) => item.src === image.src);
    setInitialIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-background">
      <PageHero
        image={galleryHeroImage}
        eyebrow="Gallery"
        title="Sri Lanka in photographs"
        description="Moments captured on real journeys — wildlife, tea country, coastlines, ancient cities and everyday island life. Select any photo to explore it full screen."
        size="md"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur">
          <Camera className="h-4 w-4" aria-hidden="true" />
          {galleryImages.length} photographs
        </span>
      </PageHero>

      <GalleryGrid images={galleryImages} columns="3" onSelect={handleSelect} />

      <GalleryLightbox
        open={lightboxOpen}
        images={galleryImages}
        initialIndex={initialIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
