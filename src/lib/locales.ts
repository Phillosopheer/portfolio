import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["ka", "en"];

export const defaultLocale: Locale = "ka";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

