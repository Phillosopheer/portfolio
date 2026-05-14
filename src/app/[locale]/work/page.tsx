import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkCard } from "@/components/work-card";
import { getDictionary } from "@/content/site";
import { isLocale } from "@/lib/locales";
import {
  getAllPortfolioItems,
  getCategoryCounts,
  getPortfolioItemsByCategory,
} from "@/lib/portfolio";
import type { ProjectCategory } from "@/lib/types";

type WorkPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
};

function getSelectedCategory(
  value: string | string[] | undefined,
): ProjectCategory | "all" {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (rawValue === "web" || rawValue === "software" || rawValue === "android") {
    return rawValue;
  }

  return "all";
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : "ka");

  return {
    title: dictionary.nav.work,
    description: dictionary.work.description,
  };
}

export default async function WorkPage({
  params,
  searchParams,
}: WorkPageProps) {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const selectedCategory = getSelectedCategory(filters.category);
  const counts = await getCategoryCounts();
  const items =
    selectedCategory === "all"
      ? await getAllPortfolioItems()
      : await getPortfolioItemsByCategory(selectedCategory);

  return (
    <div className="shell space-y-8 pt-6">
      {items.length ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <WorkCard
              key={item.slug}
              item={item}
              labels={{
                demo: dictionary.common.demo,
                download: dictionary.common.download,
                readMore: dictionary.common.readMore,
                viewDetails: dictionary.common.viewDetails,
                featured: dictionary.common.featured,
              }}
              locale={locale}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
