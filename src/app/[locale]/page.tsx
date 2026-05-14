import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { access } from "node:fs/promises";
import path from "node:path";

import { isLocale } from "@/lib/locales";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

type CategoryCard = {
  title: string;
  subtitle: string;
  href: string;
  iconSrc: string;
  videoSrc?: string;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "ka";

  return {
    title: resolvedLocale === "ka" ? "მთავარი" : "Home",
    description: "Minimal hero portfolio landing page.",
  };
}

export default async function LocalizedHome({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const categoryCards: CategoryCard[] =
    locale === "ka"
      ? [
          {
            title: "Web დეველოპინგი",
            subtitle: "ჩემი შექმნილი ვებგვერდები",
            href: `/${locale}/work?category=web`,
            iconSrc: "/icon/web.svg",
            videoSrc: "/web.mp4",
          },
          {
            title: "Android აპები",
            subtitle: "ჩემი შექმნილი აპლიკაციები",
            href: `/${locale}/work?category=android`,
            iconSrc: "/icon/android.svg",
            videoSrc: "/android.mp4",
          },
          {
            title: "Desktop პროგრამები",
            subtitle: "ჩემი შექმნილი პროგრამები",
            href: `/${locale}/work?category=software`,
            iconSrc: "/icon/desktop.svg",
            videoSrc: "/software.mp4",
          },
        ]
      : [
          {
            title: "Web Development",
            subtitle: "Websites and web platforms",
            href: `/${locale}/work?category=web`,
            iconSrc: "/icon/web.svg",
            videoSrc: "/web.mp4",
          },
          {
            title: "Android Apps",
            subtitle: "Mobile apps for Android",
            href: `/${locale}/work?category=android`,
            iconSrc: "/icon/android.svg",
            videoSrc: "/android.mp4",
          },
          {
            title: "Desktop Software",
            subtitle: "Desktop products and tools",
            href: `/${locale}/work?category=software`,
            iconSrc: "/icon/desktop.svg",
            videoSrc: "/software.mp4",
          },
        ];

  const categoryCardsWithVideo = await Promise.all(
    categoryCards.map(async (card) => {
      if (!card.videoSrc) {
        return { ...card, hasVideo: false };
      }

      const absoluteFilePath = path.join(process.cwd(), "public", card.videoSrc.replace(/^\//, ""));

      try {
        await access(absoluteFilePath);
        return { ...card, hasVideo: true };
      } catch {
        return { ...card, hasVideo: false };
      }
    }),
  );

  return (
    <main className="shell">
      <section className="pt-5 pb-14" id="categories">
        <div className="grid gap-4 md:grid-cols-3">
          {categoryCardsWithVideo.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="category-card group relative h-56 rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:border-[#15ef8d]/65 hover:bg-black/50 hover:shadow-[0_16px_36px_rgba(21,239,141,0.22)] md:h-60"
            >
              <div className="flex h-full flex-col justify-between pb-6 pt-1">
                <p className="-mt-1 text-center text-sm uppercase tracking-[0.18em] text-[var(--text-main)]">
                  {locale === "ka" ? "კატეგორია" : "Category"}
                </p>
                <div className="mt-1 text-center">
                  {card.hasVideo ? (
                    <span className="mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/[0.03] transition-all duration-300 group-hover:border-[#15ef8d]/55 group-hover:bg-[#15ef8d]/10">
                      <video
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                      >
                        <source src={card.videoSrc} type="video/mp4" />
                      </video>
                    </span>
                  ) : (
                    <span
                      className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/[0.03] p-2 transition-all duration-300 group-hover:border-[#15ef8d]/55 group-hover:bg-[#15ef8d]/10 ${
                        card.iconSrc.includes("desktop") ? "mt-3" : "mt-2"
                      }`}
                    >
                      <img
                        src={card.iconSrc}
                        alt=""
                        className="h-full w-full scale-[1.9] object-contain"
                      />
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold leading-tight text-[var(--text-main)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{card.subtitle}</p>
                </div>
              </div>
              <p className="absolute right-4 bottom-2 text-xl leading-none text-[#15ef8d] transition-transform duration-300 group-hover:translate-x-1 md:right-5 md:bottom-3">
                →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
