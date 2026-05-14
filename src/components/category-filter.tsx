import Link from "next/link";

import { categoryCopy } from "@/content/site";
import type { Locale, ProjectCategory } from "@/lib/types";

type CategoryFilterProps = {
  locale: Locale;
  selectedCategory: ProjectCategory | "all";
  counts: Record<ProjectCategory, number>;
  allLabel: string;
};

export function CategoryFilter({
  locale,
  selectedCategory,
  counts,
  allLabel,
}: CategoryFilterProps) {
  const filters: Array<{
    key: ProjectCategory | "all";
    label: string;
    href: string;
    count: number;
  }> = [
    {
      key: "all",
      label: allLabel,
      href: `/${locale}/work`,
      count: counts.web + counts.software + counts.android,
    },
    ...(["web", "software", "android"] as ProjectCategory[]).map((key) => ({
      key,
      label: categoryCopy[key][locale].label,
      href: `/${locale}/work?category=${key}`,
      count: counts[key],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = selectedCategory === filter.key;

        return (
          <Link
            key={filter.key}
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-[var(--accent)] bg-[rgba(93,242,255,0.12)] text-[var(--text-main)]"
                : "border-[var(--line)] bg-[rgba(10,16,30,0.55)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text-main)]"
            }`}
            href={filter.href}
          >
            <span>{filter.label}</span>
            <span className="rounded-full border border-[var(--line)] px-2 py-0.5 font-code text-xs text-[var(--text-dim)]">
              {filter.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

