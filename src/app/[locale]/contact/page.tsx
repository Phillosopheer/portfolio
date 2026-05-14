import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/content/site";
import { isLocale } from "@/lib/locales";
import { getSiteProfile } from "@/lib/profile";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : "ka");

  return {
    title: dictionary.nav.contact,
    description: dictionary.contact.intro,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const siteProfile = await getSiteProfile();

  return (
    <div className="shell space-y-8 pt-6">
      <SectionHeading
        body={dictionary.contact.intro}
        eyebrow="Contact / Links"
        title={dictionary.contact.title}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="panel px-6 py-7 sm:px-8">
          <div className="space-y-6">
            <div>
              <p className="eyebrow">{dictionary.contact.noteTitle}</p>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                {dictionary.contact.note}
              </p>
            </div>
            <div>
              <p className="eyebrow">{dictionary.contact.availabilityTitle}</p>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                {dictionary.contact.availability}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {siteProfile.availability[locale]}
              </p>
            </div>
            <div>
              <p className="eyebrow">{dictionary.contact.responseTitle}</p>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                {dictionary.contact.response}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {siteProfile.links.map((link) => (
            <Link
              key={link.label}
              className="panel px-6 py-6 transition hover:border-[var(--accent)]"
              href={link.href}
              target="_blank"
            >
              <p className="eyebrow">{link.label}</p>
              <h2 className="mt-3 font-display text-2xl text-[var(--text-main)]">
                {link.href.replace(/^mailto:/, "")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {link.description[locale]}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

