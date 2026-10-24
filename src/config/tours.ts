import { GalleryImage } from "@/config/gallery";

export interface TourItinerary {
  title: string;
  slug: string;
  duration: string;
  description: string;
  image: GalleryImage;
  regions: string[];
  highlights: string[];
  bestFor: string;
  season: string;
}

export const tourItineraries: TourItinerary[] = [
  {
    title: "Highlights of Sri Lanka — 7 days",
    slug: "highlights-of-sri-lanka-7-days",
    duration: "7 days / 6 nights",
    description:
      "Cultural Triangle, hill country tea estates and a south-coast beach stay, connected by a private driver.",
    image: {
      src: "/images/tour-highlights-sri-lanka.webp",
      alt: "Sigiriya Rock Fortress surrounded by dense tropical forest in Sri Lanka",
      width: 1600,
      height: 880,
    },
    regions: ["Sigiriya", "Kandy", "Ella", "Galle"],
    highlights: [
      "Climb Sigiriya and explore Polonnaruwa",
      "Tea country rail journey and factory visit",
      "Galle Fort and south-coast beaches",
    ],
    bestFor: "First-time visitors wanting a balanced overview",
    season: "Year-round (route adjusts to monsoon)",
  },
  {
    title: "Coast & Wildlife — 10 days",
    slug: "coast-and-wildlife-10-days",
    duration: "10 days / 9 nights",
    description:
      "Leopard and elephant safaris, whale watching on the south coast and relaxed beach time.",
    image: {
      src: "/images/tour-coast-wildlife.webp",
      alt: "Wild Sri Lankan elephants in a savannah landscape",
      width: 1600,
      height: 1064,
    },
    regions: ["Yala", "Mirissa", "Tangalle", "Udawalawe"],
    highlights: [
      "Leopard safari in Yala National Park",
      "Blue-whale watching off Mirissa",
      "Elephant encounters in Udawalawe",
    ],
    bestFor: "Wildlife and nature lovers",
    season: "Dec – Apr for the south coast",
  },
  {
    title: "Hill Country & Tea — 5 days",
    slug: "hill-country-and-tea-5-days",
    duration: "5 days / 4 nights",
    description:
      "Scenic train rides, tea factory visits and cool-climate hiking in the central highlands.",
    image: {
      src: "/images/tour-hill-country-tea.webp",
      alt: "Lush Sri Lankan tea plantation in sunlight",
      width: 1600,
      height: 1067,
    },
    regions: ["Nuwara Eliya", "Ella", "Haputale"],
    highlights: [
      "Scenic Kandy–Ella train ride",
      "Tea factory tour and tasting",
      "Little Adam's Peak and Nine Arch Bridge",
    ],
    bestFor: "Couples and slow-travel seekers",
    season: "Jan – Mar and Jul – Sep",
  },
  {
    title: "Grand Island Circuit — 14 days",
    slug: "grand-island-circuit-14-days",
    duration: "14 days / 13 nights",
    description:
      "A complete loop of the island: ancient cities, highlands, national parks and the coast.",
    image: {
      src: "/images/tour-grand-island-circuit.webp",
      alt: "Aerial view of Sri Lanka's coastline and green interior",
      width: 1600,
      height: 900,
    },
    regions: ["Anuradhapura", "Polonnaruwa", "Ella", "Galle", "Negombo"],
    highlights: [
      "Ancient capitals and UNESCO sites",
      "Highlands, safaris and beaches in one route",
      "Flexible pacing with a private driver throughout",
    ],
    bestFor: "Travellers with two weeks to explore",
    season: "Year-round with seasonal routing",
  },
];

export function findTourBySlug(slug: string): TourItinerary | undefined {
  return tourItineraries.find((tour) => tour.slug === slug);
}
