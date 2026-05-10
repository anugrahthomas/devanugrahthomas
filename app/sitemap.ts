import { domain } from "@/utils/data";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
    },
    // Add more pages here if you have multiple
  ];
}