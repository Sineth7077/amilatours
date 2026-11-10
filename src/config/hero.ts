import { galleryImages, type GalleryImage } from "@/config/gallery";

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

export const galleryHeroImage: GalleryImage = {
  src: "/Gallery/gallery-13.jpeg",
  alt: "Aerial view of the Sri Lankan coastline",
  width: 1600,
  height: 1200,
};

export const experienceTypes = [
  {
    key: "wildlife",
    title: "Wildlife & safaris",
    description: "Leopards, elephants and blue whales, with private vehicles and unhurried time in the parks.",
    image: {
      src: "/images/tour-coast-wildlife.webp",
      alt: "Wild Sri Lankan elephants in a savannah landscape",
      width: 1600,
      height: 1064,
    },
    to: "/tours",
  },
  {
    key: "hill-country",
    title: "Hill country & tea",
    description: "Cool-climate estates, scenic rail journeys and walks above the clouds.",
    image: {
      src: "/images/tour-hill-country-tea.webp",
      alt: "Lush Sri Lankan tea plantation in sunlight",
      width: 1600,
      height: 1067,
    },
    to: "/tours",
  },
  {
    key: "beaches",
    title: "Beaches & coast",
    description: "From quiet southern coves to the surf and sunsets of the east coast.",
    image: {
      src: "/Gallery/gallery-02.jpeg",
      alt: "Sri Lankan coastline and ocean",
      width: 972,
      height: 1296,
    },
    to: "/tours",
  },
  {
    key: "culture",
    title: "Cultural heritage",
    description: "Ancient cities, cave temples and living traditions spanning two millennia.",
    image: {
      src: "/Gallery/gallery-05.jpeg",
      alt: "Historic Sri Lankan architecture",
      width: 900,
      height: 1600,
    },
    to: "/tours",
  },
  {
    key: "road-trips",
    title: "Scenic road trips",
    description: "Winding highland roads, tea slopes and coastal drives at your own pace.",
    image: {
      src: "/images/about-hero.webp",
      alt: "Travelers on a Sri Lankan countryside road",
      width: 1920,
      height: 1273,
    },
    to: "/tours",
  },
  {
    key: "tailor-made",
    title: "Personalized island tours",
    description: "A route shaped around your dates, interests and the way you like to travel.",
    image: {
      src: "/images/tours-hero.webp",
      alt: "Aerial view of the Nine Arches Bridge in Ella, Sri Lanka",
      width: 1920,
      height: 1080,
    },
    to: "/contact",
  },
];

export const trustItems = [
  {
    title: "Private, driver-led journeys",
    description: "A dedicated local driver every day, with full flexibility to change the plan as you go.",
    icon: "car",
  },
  {
    title: "Tailor-made itineraries",
    description: "Every trip is planned around your dates, budget and interests — no cookie-cutter packages.",
    icon: "map",
  },
  {
    title: "Built-in flexibility",
    description: "Add, drop or reorder experiences. We keep things moving at your pace, wherever you are.",
    icon: "sliders",
  },
];
