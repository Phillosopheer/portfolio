import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/content/site";
import { isLocale } from "@/lib/locales";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : "ka");

  return {
    title: dictionary.nav.about,
    description: dictionary.about.intro,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const languageLogos = [
    { name: "HTML", src: "/chem shesaxeb/html.png" },
    { name: "CSS", src: "/chem shesaxeb/css.png" },
    { name: "JavaScript", src: "/chem shesaxeb/js.png" },
    { name: "TypeScript / React", src: "/chem shesaxeb/react.png" },
    { name: "Angular", src: "/chem shesaxeb/angular.png" },
    { name: "Node.js", src: "/chem shesaxeb/nodejs.png" },
    { name: "PHP", src: "/chem shesaxeb/php.png" },
    { name: "Python", src: "/chem shesaxeb/python.png" },
    { name: "Java", src: "/chem shesaxeb/java.png" },
    { name: "Kotlin", src: "/chem shesaxeb/kotlin.png" },
    { name: "SQL", src: "/chem shesaxeb/sql.png" },
    { name: "C#", src: "/chem shesaxeb/c%23.png" },
    { name: "C++", src: "/chem shesaxeb/c%2B%2B.png" },
  ];

  return (
    <div className="shell space-y-8 pt-6">
      <SectionHeading
        body={dictionary.about.intro}
        eyebrow="About / System"
        title={dictionary.about.title}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {dictionary.about.pillars.map((pillar) => (
          <article key={pillar.title} className="panel px-6 py-7 sm:px-7">
            <p className="eyebrow">Pillar</p>
            <h2 className="mt-4 font-display text-2xl text-[var(--text-main)]">
              {pillar.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="panel px-6 py-7 sm:px-8">
          <p className="eyebrow">Workflow</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--text-main)] sm:text-4xl">
            {dictionary.about.workflowTitle}
          </h2>
          <div className="mt-6 space-y-3">
            {dictionary.about.workflow.map((step) => (
              <div
                key={step}
                className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4 text-sm leading-7 text-[var(--text-muted)]"
              >
                {step}
              </div>
            ))}
          </div>
        </section>

        <section className="panel px-6 py-7 sm:px-8">
          <p className="eyebrow">Architecture</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--text-main)] sm:text-4xl">
            GitHub-first codebase, Vercel-first publishing
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            This starter keeps local content files, dedicated work pages, and a clean deploy path. Add a new project entry, commit the changes, push to GitHub, and Vercel can publish a preview or production build without changing the structure.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4">
              <p className="eyebrow">Local content</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Portfolio data lives in `src/content/portfolio.ts` and can be expanded without a CMS.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-4">
              <p className="eyebrow">Static assets</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Cover images and gallery previews live in `public/work/`, while binaries stay external and linkable.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="panel px-6 py-7 sm:px-8">
        <p className="eyebrow">
          {locale === "ka" ? "პროგრამული ენები" : "Programming Languages"}
        </p>
        <h2 className="mt-4 font-display text-3xl text-[var(--text-main)] sm:text-4xl">
          {locale === "ka"
            ? "ტექნოლოგიები, რომლებსაც ვფლობ"
            : "Technologies I Work With"}
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          {locale === "ka"
            ? "ქვემოთ მოცემულია ჩემი აქტიური ტექნოლოგიების ვიზუალური ჩამონათვალი."
            : "Below is a visual overview of the technologies I actively use."}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {languageLogos.map((logo) => (
            <div
              key={logo.name}
              className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(7,17,31,0.55)] px-4 py-5"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="mx-auto h-12 w-12 object-contain"
              />
              <p className="mt-3 text-center text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

