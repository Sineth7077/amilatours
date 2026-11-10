/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional POST endpoint (Formspree, Basin, serverless function…). */
  readonly VITE_INQUIRY_ENDPOINT?: string;
  /** Production origin used for canonical and Open Graph URLs. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
