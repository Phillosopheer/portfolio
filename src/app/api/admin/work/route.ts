import { NextResponse } from "next/server";

import { getCmsData, saveCmsData } from "@/lib/cms-store";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";
import type { PortfolioItem, ProjectCategory } from "@/lib/types";

type WorkInput = {
  slug: string;
  category: ProjectCategory;
  year: number;
  cover: string;
  titleKa: string;
  titleEn: string;
  summaryKa: string;
  summaryEn: string;
  taglineKa?: string;
  taglineEn?: string;
  downloadUrl?: string;
  liveUrl?: string;
};

const DEFAULT_COVER = "/work/quiet-ops.svg";

function normalizeSlug(value: string): string {
  const sanitized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return sanitized.replace(/^-|-$/g, "");
}

function resolveCategory(value: string): ProjectCategory {
  if (value === "web" || value === "software" || value === "android") {
    return value;
  }

  return "web";
}

function resolveYear(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return new Date().getFullYear();
  }

  return Math.floor(value);
}

function createPortfolioItem(input: WorkInput, order: number): PortfolioItem {
  const cover = input.cover.trim() || DEFAULT_COVER;
  const titleKa = input.titleKa.trim() || input.slug.trim() || "ახალი ნაშრომი";
  const titleEn = input.titleEn.trim() || input.slug.trim() || "New Work";
  const summaryKa = input.summaryKa.trim();
  const summaryEn = input.summaryEn.trim();

  return {
    slug: input.slug.trim(),
    category: input.category,
    featured: false,
    order,
    year: input.year,
    stack: [],
    cover,
    gallery: [cover],
    actions: {
      ...(input.liveUrl ? { live: { href: input.liveUrl.trim() } } : {}),
      ...(input.downloadUrl ? { download: { href: input.downloadUrl.trim() } } : {}),
    },
    translations: {
      ka: {
        title: titleKa,
        tagline: (input.taglineKa ?? "").trim(),
        summary: summaryKa,
        intro: summaryKa,
        role: "Owner / Developer",
        highlights: [],
        sections: {
          challenge: { title: "ამოცანა", body: summaryKa },
          solution: { title: "გადაწყვეტა", body: summaryKa },
          result: { title: "შედეგი", body: summaryKa },
        },
      },
      en: {
        title: titleEn,
        tagline: (input.taglineEn ?? "").trim(),
        summary: summaryEn,
        intro: summaryEn,
        role: "Owner / Developer",
        highlights: [],
        sections: {
          challenge: { title: "Challenge", body: summaryEn },
          solution: { title: "Solution", body: summaryEn },
          result: { title: "Result", body: summaryEn },
        },
      },
    },
  };
}

export async function GET() {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const data = await getCmsData();
  return NextResponse.json(data.works);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const input = (await request.json()) as Partial<WorkInput>;

  const data = await getCmsData();
  const fallbackBase =
    input.slug?.trim() ||
    input.titleKa?.trim() ||
    input.titleEn?.trim() ||
    `work-${Date.now()}`;
  const normalizedBaseSlug = normalizeSlug(fallbackBase) || `work-${Date.now()}`;

  let normalizedSlug = normalizedBaseSlug;
  let duplicateCounter = 2;
  while (data.works.some((item) => item.slug === normalizedSlug)) {
    normalizedSlug = `${normalizedBaseSlug}-${duplicateCounter}`;
    duplicateCounter += 1;
  }

  const duplicate = data.works.some((item) => item.slug === normalizedSlug);

  if (duplicate) {
    return NextResponse.json({ error: "ასეთი slug უკვე არსებობს" }, { status: 400 });
  }

  const nextOrder = data.works.length
    ? Math.max(...data.works.map((item) => item.order)) + 1
    : 1;
  data.works.push(
    createPortfolioItem(
      {
        slug: normalizedSlug,
        category: resolveCategory(input.category ?? "web"),
        year: resolveYear(Number(input.year)),
        cover: (input.cover ?? "").trim(),
        titleKa: (input.titleKa ?? "").trim(),
        titleEn: (input.titleEn ?? "").trim(),
        summaryKa: (input.summaryKa ?? "").trim(),
        summaryEn: (input.summaryEn ?? "").trim(),
        taglineKa: input.taglineKa,
        taglineEn: input.taglineEn,
        downloadUrl: input.downloadUrl,
        liveUrl: input.liveUrl,
      },
      nextOrder,
    ),
  );
  await saveCmsData(data);

  return NextResponse.json({ ok: true });
}
