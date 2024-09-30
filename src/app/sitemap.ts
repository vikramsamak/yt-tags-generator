import { APP_URL } from "@/constants/Constants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date().toISOString(), 
      changeFrequency: "weekly", 
      priority: 1.0, 
    },
  ];
}
