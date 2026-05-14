import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { portfolioItems } from "@/content/portfolio";
import { siteProfile } from "@/content/site";
import type { PortfolioItem, SiteProfile, SiteSettings } from "@/lib/types";

export type CmsData = {
  profile: SiteProfile;
  settings: SiteSettings;
  works: PortfolioItem[];
};

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "cms.json");

function getDefaultData(): CmsData {
  return {
    profile: JSON.parse(JSON.stringify(siteProfile)) as SiteProfile,
    settings: {
      maintenanceMode: false,
    },
    works: JSON.parse(JSON.stringify(portfolioItems)) as PortfolioItem[],
  };
}

async function ensureDataFile() {
  try {
    await readFile(dataFilePath, "utf-8");
  } catch {
    await mkdir(dataDir, { recursive: true });
    const defaultData = getDefaultData();
    await writeFile(dataFilePath, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

export async function getCmsData(): Promise<CmsData> {
  await ensureDataFile();
  const raw = await readFile(dataFilePath, "utf-8");
  const parsed = JSON.parse(raw) as Partial<CmsData>;
  return {
    profile: (parsed.profile ?? getDefaultData().profile) as SiteProfile,
    settings: {
      maintenanceMode: Boolean(parsed.settings?.maintenanceMode),
    },
    works: (parsed.works ?? getDefaultData().works) as PortfolioItem[],
  };
}

export async function saveCmsData(data: CmsData): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}
