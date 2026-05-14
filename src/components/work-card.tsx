"use client";

import { useState } from "react";
import Image from "next/image";

import { ActionButtons } from "@/components/action-buttons";
import type { Locale, PortfolioItem } from "@/lib/types";

type WorkCardProps = {
  item: PortfolioItem;
  locale: Locale;
  labels: {
    demo: string;
    download: string;
    readMore: string;
    viewDetails: string;
    featured: string;
  };
};

export function WorkCard({ item, locale, labels }: WorkCardProps) {
  const translation = item.translations[locale];
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const summary = translation.summary.trim();
  const hasSummary =
    summary.length > 0 &&
    summary !== "აღწერა დამატდება მალე." &&
    summary !== "Description will be added soon.";

  return (
    <article className="panel hover-rise group flex h-full flex-col overflow-hidden">
      <div className="relative block aspect-[16/10] overflow-hidden">
        <Image
          fill
          alt={translation.title}
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={item.cover}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,14,0.08)_0%,rgba(10,11,14,0.84)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-5 py-4">
          {item.featured ? (
            <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {labels.featured}
            </span>
          ) : null}
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-[var(--text-main)]">
              {translation.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-3">
        <div className="flex justify-center">
          <ActionButtons
            actions={item.actions}
            compact
            labels={{ demo: labels.demo, download: labels.download }}
            readMoreLabel={labels.readMore}
            onReadMore={hasSummary ? () => setIsDescriptionOpen(true) : undefined}
          />
        </div>
        <div className="mt-auto flex flex-wrap justify-center gap-2">
          {item.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
      {hasSummary && isDescriptionOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsDescriptionOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#070a11] p-6 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDescriptionOpen(false)}
              className="ml-auto block text-xl leading-none text-[var(--text-muted)] transition hover:text-[var(--text-main)]"
              aria-label="Close"
            >
              ×
            </button>
            <p className="text-base leading-8 text-[var(--text-main)]">
              {translation.summary}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
