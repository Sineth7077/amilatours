import { useEffect } from "react";
import { siteConfig } from "@/config/site";

type MetaProps = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  path?: string;
};

/** Makes a site-relative asset URL absolute when a production origin is set. */
function absoluteUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (!siteConfig.siteUrl) return url;
  try {
    return new URL(url, siteConfig.siteUrl).toString();
  } catch {
    return url;
  }
}

/**
 * Sets document title, meta description, Open Graph and Twitter metadata,
 * plus a canonical link when a production domain is configured
 * (VITE_SITE_URL). Call once per page, e.g. at the top of a page component.
 */
export function usePageMeta({
  title,
  description,
  image,
  imageAlt,
  path,
}: MetaProps): void {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, value: string, isProperty = false): void => {
      let tag = document.querySelector(
        isProperty ? `meta[property='${name}']` : `meta[name='${name}']`
      );
      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) tag.setAttribute("property", name);
        else tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    const absoluteImage = absoluteUrl(image);

    if (description) setMeta("description", description);

    setMeta("og:site_name", siteConfig.name, true);
    setMeta("og:locale", "en_LK", true);
    setMeta("og:title", title, true);
    if (description) setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    if (absoluteImage) {
      setMeta("og:image", absoluteImage, true);
      if (imageAlt) setMeta("og:image:alt", imageAlt, true);
    }

    if (siteConfig.siteUrl && path) {
      const url = `${siteConfig.siteUrl.replace(/\/$/, "")}${path}`;
      setMeta("og:url", url, true);

      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    if (description) setMeta("twitter:description", description);
    if (absoluteImage) setMeta("twitter:image", absoluteImage);
    if (imageAlt) setMeta("twitter:image:alt", imageAlt);
  }, [title, description, image, imageAlt, path]);
}
