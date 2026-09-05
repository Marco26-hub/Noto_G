import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/db";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/vendita", "/ristrutturazioni", "/showroom", "/chi-siamo", "/contatti"].map((path) => ({
    url: `${SITE.base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const props = getProperties().map((p) => ({
    url: `${SITE.base}/vendita/${p.id}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...statics, ...props];
}
