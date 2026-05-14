"use client";

import { useRouter, usePathname } from "next/navigation";

type BackButtonProps = {
  locale: string;
};

export function BackButton({ locale }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isLocaleRoot = pathname === `/${locale}`;
  const backLabel = locale === "ka" ? "უკან" : "Back";

  if (isLocaleRoot) {
    return null;
  }

  return (
    <div className="shell pt-2">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
            return;
          }

          router.push(`/${locale}`);
        }}
        className="font-display inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label={backLabel}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" />
        </svg>
        {backLabel}
      </button>
    </div>
  );
}
