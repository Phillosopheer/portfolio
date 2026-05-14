import Link from "next/link";

import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "@/components/icons";
import { getSiteProfile } from "@/lib/profile";
import type { Locale } from "@/lib/types";

type ProfileBentoCardProps = {
  locale: Locale;
};

const iconMap = {
  Email: MailIcon,
  Gmail: MailIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Telegram: TelegramIcon,
} as const;

export async function ProfileBentoCard({ locale }: ProfileBentoCardProps) {
  const year = new Date().getFullYear();
  const siteProfile = await getSiteProfile();

  return (
    <section className="panel mt-18 px-6 py-7 sm:px-8 sm:py-8">
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Profile / Contact</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-5xl">
              {siteProfile.name}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-[var(--text-muted)]">
              {siteProfile.bio[locale]}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {siteProfile.links.map((link) => {
              const Icon = iconMap[link.label as keyof typeof iconMap] ?? MailIcon;

              return (
                <Link
                  key={link.label}
                  aria-label={link.label}
                  className="icon-button"
                  href={link.href}
                  target="_blank"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="eyebrow">Location</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {siteProfile.location[locale]}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="eyebrow">Availability</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {siteProfile.availability[locale]}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          {siteProfile.stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-5"
            >
              <p className="font-display text-5xl font-extrabold text-[var(--accent)]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                {stat.label[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-8 h-px bg-[rgba(255,255,255,0.06)]" />
      <div className="mt-5 flex flex-col items-center justify-center gap-1 text-center text-xs text-[var(--text-soft)] sm:flex-row sm:gap-4">
        <span>© {year} {siteProfile.name}. All Rights Reserved.</span>
        <span>Powered by Next.js, GitHub, and Vercel</span>
      </div>
    </section>
  );
}
