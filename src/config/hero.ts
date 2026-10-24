import { GalleryImage } from "@/config/gallery";
import { galleryImages } from "@/config/gallery";

/** Homepage photography — curated preview and wide hero */
export const homePreviewImages: GalleryImage[] = [
  galleryImages[0],
  galleryImages[6],
  galleryImages[9],
  galleryImages[12],
  galleryImages[14],
  galleryImages[17],
];

export const heroImage: GalleryImage = {
  src: "/images/home-hero.webp",
  alt: "Aerial view of Sigiriya Rock Fortress rising above the lush tropical forest in Sri Lanka",
  width: 1920,
  height: 1440,
};

export const aboutHeroImage: GalleryImage = {
  src: "/images/about-hero.webp",
  alt: "Travelers with a tuk-tuk on a countryside road in Sri Lanka",
  width: 1920,
  height: 1273,
};

export const toursHeroImage: GalleryImage = {
  src: "/images/tours-hero.webp",
  alt: "Aerial view of the Nine Arches Bridge in Ella, Sri Lanka, with a train crossing",
  width: 1920,
  height: 1080,
};

/** Experience cards shown in the Experiences section */
export const experienceTypes = [
  {
    key: "beaches",
    title: "Beaches",
    description: "Crystal-clear waters and golden sands — from north-eastern coves to the southern surf.",
    image: {
      src: "/Gallery/gallery-02.jpeg",
      alt: "Sri Lanka beach",
      width: 972,
      height: 1296,
    },
  },
  {
    key: "culture",
    title: "Culture & Heritage",
    description: "Temple towns, cave sanctuaries and ancient cities that stretch back over two thousand years.",
    image: {
      src: "/Gallery/gallery-05.jpeg",
      alt: "Sri Lanka temple",
      width: 900,
      height: 1600,
    },
  },
  {
    key: "wildlife",
    title: "Wildlife",
    description: "Leopards, elephants and blue whales — a private safari, a coastal boat trip and much more.",
    image: {
      src: "/Gallery/gallery-10.jpeg",
      alt: "Sri Lanka wildlife",
      width: 1600,
      height: 1200,
    },
  },
];

/** Trust indicators for the homepage */
export const trustItems = [
  {
    title: "Private, driver-led journeys",
    description: "A dedicated local driver every day, with full flexibility to change the plan as you go.",
  },
  {
    title: "Tailor-made itineraries",
    description: "Every trip is planned around your dates, budget and interests — no cookie-cutter packages.",
  },
  {
    title: "Built-in flexibility",
    description: "Add, drop or reorder experiences. We keep things moving at your pace, wherever you are.",
  },
];
