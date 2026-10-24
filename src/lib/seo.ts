import { useEffect } from "react";
import { siteConfig } from "@/config/site";

type MetaProps = {
  title: string;
  description?: string;
  image?: string;
  path?: string;
};

/**
 * Sets document title, meta description, Open Graph and Twitter metadata,
 * plus a canonical link when a production domain is configured
 * (VITE_SITE_URL). Call once per page, e.g. at the top of a page component.
 */
export function usePageMeta({ title, description, image, path }: MetaProps): void {
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

    if (description) setMeta("description", description);

    setMeta("og:title", title, true);
    if (description) setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    if (image) setMeta("og:image", image, true);
    if (siteConfig.siteUrl && path) {
      setMeta("og:url", `${siteConfig.siteUrl}${path}`, true);
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `${siteConfig.siteUrl}${path}`);
    }

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    if (description) setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);
  }, [title, description, image, path]);
}

