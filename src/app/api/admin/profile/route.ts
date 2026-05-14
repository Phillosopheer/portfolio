import { NextResponse } from "next/server";

import { getCmsData, saveCmsData } from "@/lib/cms-store";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";
import type { SiteProfile } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const data = await getCmsData();
  return NextResponse.json(data.profile);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const profile = (await request.json()) as SiteProfile;
  const data = await getCmsData();
  data.profile = profile;
  await saveCmsData(data);

  return NextResponse.json({ ok: true });
}
