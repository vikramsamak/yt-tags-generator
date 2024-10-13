import type { MetadataRoute } from "next";

interface CustomScreenshot {
  src: string;
  type: string;
  sizes: string;
  form_factor: "narrow" | "wide";
}

interface CustomManifest extends MetadataRoute.Manifest {
  screenshots: CustomScreenshot[];
}

export default function manifest(): CustomManifest {
  return {
    name: "Rapidtags-Youtube Tag Generator",
    short_name: "RapidTags",
    description: "A app build for generating youtube tags.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "any",
    id: "/",
    icons: [
      {
        src: "/icon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/wide.png",
        type: "image/png",
        sizes: "1910x883",
        form_factor: "wide",
      },
      {
        src: "/screenshots/narrow.png",
        type: "image/png",
        sizes: "345x767",
        form_factor: "narrow",
      },
    ],
  };
}
