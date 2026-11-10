/** GALLERY IMAGE MANIFEST — AMILA TOURS */
export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** All photographs from the approved /public/Gallery directory */
export const galleryImages: GalleryImage[] = [
  { src: "/Gallery/gallery-01.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 900, height: 1600 },
  { src: "/Gallery/gallery-02.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 972, height: 1296 },
  { src: "/Gallery/gallery-03.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 972, height: 1296 },
  { src: "/Gallery/gallery-04.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 972, height: 1296 },
  { src: "/Gallery/gallery-05.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 900, height: 1600 },
  { src: "/Gallery/gallery-06.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1200, height: 1600 },
  { src: "/Gallery/gallery-07.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1288, height: 966 },
  { src: "/Gallery/gallery-08.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 966, height: 1288 },
  { src: "/Gallery/gallery-09.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 966, height: 1288 },
  { src: "/Gallery/gallery-10.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-12.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1280, height: 960 },
  { src: "/Gallery/gallery-13.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-14.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-15.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-16.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-17.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1600, height: 1200 },
  { src: "/Gallery/gallery-18.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 1200, height: 1600 },
  { src: "/Gallery/gallery-19.jpeg", alt: "Sri Lanka photograph from the Amila Tours gallery", width: 2048, height: 1536 },
];

/** Photographs chosen for the curated homepage preview live in `config/hero.ts`. */
