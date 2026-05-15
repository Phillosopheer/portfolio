import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackButton } from "@/components/back-button";
import { getDictionary } from "@/content/site";
import { getCmsData } from "@/lib/cms-store";
import { isLocale, locales } from "@/lib/locales";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);
  const data = await getCmsData();
  const profile = data.profile;

  if (data.settings.maintenanceMode) {
    return (
      <div className="min-h-screen px-4 py-14">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-white/20 bg-[#0b0d11]/90 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur">
          <p className="font-display text-3xl font-semibold text-[var(--text-main)]">
            {locale === "ka" ? "საიტი დროებით დახურულია" : "Site Is Temporarily Closed"}
          </p>
          <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
            {locale === "ka"
              ? "მიმდინარეობს განახლება. მალე საიტი ისევ ჩაირთვება."
              : "Maintenance update is in progress. The site will be back online soon."}
          </p>
          <div className="mt-6 rounded-xl border border-[#15ef8d]/35 bg-[#15ef8d]/10 px-4 py-3">
            <p className="text-sm text-[#9ef7ca]">
              {locale === "ka" ? "დამიკავშირდით ნომერზე" : "Contact me at"}:
            </p>
            <p className="mt-1 font-display text-2xl tracking-wide text-[#15ef8d]">{profile.phone}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="site-dim-overlay" aria-hidden="true" />
      <SiteHeader dictionary={dictionary} locale={locale as Locale} profile={profile} />
      <BackButton locale={locale} />
      <main className="pb-24">{children}</main>
      <SiteFooter dictionary={dictionary} locale={locale as Locale} />
    </div>
  );
}

