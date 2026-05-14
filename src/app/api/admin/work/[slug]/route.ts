import { NextResponse } from "next/server";

import { getCmsData, saveCmsData } from "@/lib/cms-store";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";
import type { ProjectCategory } from "@/lib/types";

type Params = {
  params: Promise<{ slug: string }>;
};

type WorkUpdateInput = {
  category?: ProjectCategory;
  titleKa?: string;
  titleEn?: string;
  summaryKa?: string;
  summaryEn?: string;
  cover?: string;
  downloadUrl?: string;
  liveUrl?: string;
};

function resolveCategory(value: string | undefined, fallback: ProjectCategory): ProjectCategory {
  if (value === "web" || value === "software" || value === "android") {
    return value;
  }

  return fallback;
}

export async function DELETE(_: Request, { params }: Params) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const { slug } = await params;
  const data = await getCmsData();
  const nextWorks = data.works.filter((item) => item.slug !== slug);

  if (nextWorks.length === data.works.length) {
    return NextResponse.json({ error: "ნაშრომი ვერ მოიძებნა" }, { status: 404 });
  }

  data.works = nextWorks;
  await saveCmsData(data);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const { slug } = await params;
  const input = (await request.json()) as WorkUpdateInput;
  const data = await getCmsData();
  const target = data.works.find((item) => item.slug === slug);

  if (!target) {
    return NextResponse.json({ error: "ნაშრომი ვერ მოიძებნა" }, { status: 404 });
  }

  const titleKa = (input.titleKa ?? target.translations.ka.title).trim();
  const titleEn = (input.titleEn ?? target.translations.en.title).trim();
  const summaryKa = (input.summaryKa ?? target.translations.ka.summary).trim();
  const summaryEn = (input.summaryEn ?? target.translations.en.summary).trim();
  const cover = (input.cover ?? target.cover).trim();
  const liveUrl = (input.liveUrl ?? target.actions?.live?.href ?? "").trim();
  const downloadUrl = (input.downloadUrl ?? target.actions?.download?.href ?? "").trim();

  target.category = resolveCategory(input.category, target.category);
  target.cover = cover || target.cover;
  target.gallery = [target.cover];
  target.actions = {
    ...(liveUrl ? { live: { href: liveUrl } } : {}),
    ...(downloadUrl ? { download: { href: downloadUrl } } : {}),
  };
  target.translations.ka.title = titleKa || target.translations.ka.title;
  target.translations.en.title = titleEn || target.translations.en.title;
  target.translations.ka.summary = summaryKa;
  target.translations.en.summary = summaryEn;
  target.translations.ka.intro = summaryKa;
  target.translations.en.intro = summaryEn;

  await saveCmsData(data);
  return NextResponse.json({ ok: true });
}
