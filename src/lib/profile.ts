import type { SiteProfile } from "@/lib/types";
import { getCmsData } from "@/lib/cms-store";

export async function getSiteProfile(): Promise<SiteProfile> {
  const data = await getCmsData();
  return data.profile;
}
