import type { MetadataRoute } from "next";

import { getAllPortfolioItems } from "@/lib/portfolio";
import { locales } from "@/lib/locales";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = ["", "/work", "/about", "/contact"] as const;

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route, index) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: index === 0 ? "weekly" : "monthly",
      priority: index === 0 ? 1 : 0.8,
    })),
  );

  const items = await getAllPortfolioItems();
  const detailEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    items.map((item) => ({
      url: `${siteUrl}/${locale}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...detailEntries];
}
