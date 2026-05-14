import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categoryCopy } from "@/content/site";
import { isLocale, locales } from "@/lib/locales";
import type { ProjectCategory } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

function isProjectCategory(value: string): value is ProjectCategory {
  return value === "web" || value === "software" || value === "android";
}

export function generateStaticParams() {
  const categories: ProjectCategory[] = ["web", "software", "android"];

  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "ka";

  if (!isProjectCategory(category)) {
    return { title: "Category" };
  }

  return {
    title: categoryCopy[category][resolvedLocale].label,
    description: categoryCopy[category][resolvedLocale].description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  if (!isLocale(locale) || !isProjectCategory(category)) {
    notFound();
  }

  return <div className="shell pt-6" />;
}
