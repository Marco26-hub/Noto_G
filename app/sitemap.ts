import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/db";
import { SITE } from "@/lib/site";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/vendita", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/ristrutturazioni", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/showroom", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/chi-siamo", changeFrequency: "yearly" as const, priority: 0.7 },
    { path: "/contatti", changeFrequency: "yearly" as const, priority: 0.8 },
  ].map(({ path, ...entry }) => ({ url: `${SITE.base}${path}`, ...entry }));
  const props = (await getProperties())
    .filter((p) => p.status !== "venduto")
    .map((p) => ({
      url: `${SITE.base}/vendita/${p.id}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: p.images.map((image) => (image.startsWith("http") ? image : `${SITE.base}${image}`)),
    }));
  return [...statics, ...props];
}
