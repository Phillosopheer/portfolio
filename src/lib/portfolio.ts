import { getCmsData } from "@/lib/cms-store";
import type { PortfolioItem, ProjectCategory } from "@/lib/types";

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const data = await getCmsData();
  return [...data.works].sort((left, right) => left.order - right.order);
}

export async function getFeaturedPortfolioItems(limit = 3): Promise<PortfolioItem[]> {
  const items = await getAllPortfolioItems();
  return items.filter((item) => item.featured).slice(0, limit);
}

export async function getPortfolioItem(slug: string): Promise<PortfolioItem | undefined> {
  const items = await getAllPortfolioItems();
  return items.find((item) => item.slug === slug);
}

export async function getPortfolioItemsByCategory(
  category?: ProjectCategory,
): Promise<PortfolioItem[]> {
  const items = await getAllPortfolioItems();

  if (!category) {
    return items;
  }

  return items.filter((item) => item.category === category);
}

export async function getCategoryCounts(): Promise<Record<ProjectCategory, number>> {
  const items = await getAllPortfolioItems();
  return items.reduce(
    (counts, item) => {
      counts[item.category] += 1;
      return counts;
    },
    {
      web: 0,
      software: 0,
      android: 0,
    } satisfies Record<ProjectCategory, number>,
  );
}

