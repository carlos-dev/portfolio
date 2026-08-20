import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

// Página única — as seções são âncoras, não URLs próprias.
// `lastModified` é carimbado no build, junto com o resto do site estático.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
