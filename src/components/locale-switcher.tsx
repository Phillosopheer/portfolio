"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { locales } from "@/lib/locales";
import type { Locale } from "@/lib/types";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function buildHref(targetLocale: Locale) {
    const segments = pathname.split("/");

    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }

    const nextPath = segments.join("/") || `/${targetLocale}`;
    const query = searchParams.toString();

    return query ? `${nextPath}?${query}` : nextPath;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] px-2 py-1 text-[11px] uppercase tracking-[0.26em] text-[var(--text-soft)]">
      <span className="sr-only">{label}</span>
      {locales.map((targetLocale, index) => {
        const isActive = targetLocale === locale;

        return (
          <div key={targetLocale} className="flex items-center gap-2">
            <Link
              className={`rounded-full px-2.5 py-1 transition ${
                isActive
                  ? "bg-[rgba(0,229,255,0.14)] text-[var(--accent-strong)]"
                  : "text-[var(--text-soft)] hover:text-[var(--text-main)]"
              }`}
              href={buildHref(targetLocale)}
            >
              {targetLocale}
            </Link>
            {index < locales.length - 1 ? <span>/</span> : null}
          </div>
        );
      })}
    </div>
  );
}
