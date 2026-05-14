import Link from "next/link";
import Image from "next/image";

import { categoryCopy } from "@/content/site";
import type { Locale, ProjectCategory } from "@/lib/types";

type CategoryBentoCardProps = {
  category: ProjectCategory;
  count: number;
  locale: Locale;
  href: string;
  ctaLabel: string;
  index: string;
};

const iconMap = {
  web: "/icon/web.svg",
  software: "/icon/desktop.svg",
  android: "/icon/android.svg",
} satisfies Record<ProjectCategory, string>;

const toneMap: Record<ProjectCategory, string> = {
  web: "from-[rgba(0,229,255,0.18)] to-[rgba(124,77,255,0.08)]",
  software: "from-[rgba(124,77,255,0.18)] to-[rgba(0,229,255,0.08)]",
  android: "from-[rgba(0,229,255,0.14)] to-[rgba(130,255,199,0.08)]",
};

export function CategoryBentoCard({
  category,
  count,
  locale,
  href,
  ctaLabel,
  index,
}: CategoryBentoCardProps) {
  const iconSrc = iconMap[category];
  const copy = categoryCopy[category][locale];

  return (
    <Link
      className="panel hover-rise group block min-h-[22rem] p-6 sm:p-7"
      href={href}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[category]} opacity-80`} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[var(--accent)] shadow-[0_0_24px_rgba(0,229,255,0.14)]">
            <Image
              src={iconSrc}
              alt={`${copy.label} icon`}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
          <div className="text-right">
            <p className="font-code text-4xl font-semibold tracking-[0.18em] text-[var(--accent)]">
              {index}
            </p>
            <span className="mt-2 inline-flex rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 font-code text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
              {category}
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <p className="eyebrow">{copy.label}</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text-main)] sm:text-[2.1rem]">
            {copy.label}
          </h2>
          <p className="max-w-[26rem] text-base leading-8 text-[var(--text-muted)]">
            {copy.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-10">
          <div>
            <p className="font-display text-5xl font-bold leading-none text-[var(--text-main)]">
              {count.toString().padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm text-[var(--text-soft)]">Projects</p>
          </div>
          <span className="cta-chip">{ctaLabel}</span>
        </div>
      </div>
    </Link>
  );
}
