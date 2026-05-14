import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActionButtons } from "@/components/action-buttons";
import { SectionHeading } from "@/components/section-heading";
import { WorkCard } from "@/components/work-card";
import { categoryCopy, getDictionary } from "@/content/site";
import { isLocale, locales } from "@/lib/locales";
import { getAllPortfolioItems, getPortfolioItem } from "@/lib/portfolio";

type WorkDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const items = await getAllPortfolioItems();
  return locales.flatMap((locale) => items.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "ka";
  const item = await getPortfolioItem(slug);

  if (!item) {
    return {
      title: "Case study",
    };
  }

  return {
    title: item.translations[resolvedLocale].title,
    description: item.translations[resolvedLocale].summary,
  };
}

export default async function WorkDetailPage({
  params,
}: WorkDetailPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const item = await getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  const translation = item.translations[locale];
  const summary = translation.summary.trim();
  const intro = translation.intro.trim();
  const hasVisibleSummary =
    summary.length > 0 &&
    summary !== "აღწერა დამატდება მალე." &&
    summary !== "Description will be added soon.";
  const hasVisibleIntro =
    intro.length > 0 &&
    intro !== "აღწერა დამატდება მალე." &&
    intro !== "Description will be added soon.";
  const allItems = await getAllPortfolioItems();
  const relatedItems = allItems
    .filter(
      (candidate) =>
        candidate.slug !== item.slug && candidate.category === item.category,
    )
    .slice(0, 2);
  const hasActions = Boolean(item.actions?.live || item.actions?.download);

  return (
    <div className="shell space-y-10 pt-6">
      <Link
        className="font-display inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        href={`/${locale}/work`}
      >
        {dictionary.common.backToWork}
      </Link>

      <section className="panel overflow-hidden">
        <div className="grid xl:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-[16/11] overflow-hidden border-b border-[var(--line)] xl:border-b-0 xl:border-r">
            <Image
              fill
              alt={translation.title}
              className="object-cover"
              priority
              sizes="(min-width: 1280px) 55vw, 100vw"
              src={item.cover}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,24,0.08)_0%,rgba(6,12,24,0.75)_100%)]" />
          </div>
          <div className="space-y-6 px-6 py-7 sm:px-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-[var(--text-dim)]">
              <span>{categoryCopy[item.category][locale].label}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{item.year}</span>
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-tight text-[var(--text-main)] sm:text-5xl">
                {translation.title}
              </h1>
              <p className="text-lg text-[var(--accent-strong)]">
                {translation.tagline}
              </p>
              {hasVisibleSummary ? (
                <p className="text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                  {translation.summary}
                </p>
              ) : null}
              {hasVisibleIntro ? (
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  {translation.intro}
                </p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4">
                <p className="eyebrow">{dictionary.common.role}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {translation.role}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4">
                <p className="eyebrow">{dictionary.common.year}</p>
                <p className="mt-3 font-display text-3xl text-[var(--text-main)]">
                  {item.year}
                </p>
              </div>
            </div>
            {hasActions ? (
              <div className="space-y-4">
                <p className="text-sm leading-7 text-[var(--text-muted)]">
                  {dictionary.common.actionIntro}
                </p>
                <ActionButtons
                  actions={item.actions}
                  labels={{
                    demo: dictionary.common.demo,
                    download: dictionary.common.download,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="panel px-6 py-7 sm:px-8">
          <p className="eyebrow">{dictionary.common.stack}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {item.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            {translation.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4 text-sm leading-7 text-[var(--text-muted)]"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {[
            translation.sections.challenge,
            translation.sections.solution,
            translation.sections.result,
            translation.sections.extra,
          ]
            .filter(Boolean)
            .map((section) => (
              <article key={section?.title} className="panel px-6 py-7 sm:px-8">
                <p className="eyebrow">{section?.title}</p>
                <p className="mt-4 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                  {section?.body}
                </p>
              </article>
            ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          body={translation.intro}
          eyebrow="Gallery / Preview"
          title={dictionary.common.gallery}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {item.gallery.map((image, index) => (
            <div key={`${image}-${index}`} className="panel overflow-hidden p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                <Image
                  fill
                  alt={`${translation.title} preview ${index + 1}`}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={image}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {relatedItems.length ? (
        <section className="space-y-6">
          <SectionHeading
            body={categoryCopy[item.category][locale].description}
            eyebrow="Related / Track"
            title={dictionary.common.related}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {relatedItems.map((relatedItem) => (
              <WorkCard
                key={relatedItem.slug}
                item={relatedItem}
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
        </section>
      ) : null}
    </div>
  );
}

