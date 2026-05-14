import { NextResponse } from "next/server";

import { getCmsData, saveCmsData } from "@/lib/cms-store";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";
import type { SiteSettings } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const data = await getCmsData();
  return NextResponse.json(data.settings);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const incoming = (await request.json()) as Partial<SiteSettings>;
  const data = await getCmsData();
  data.settings = {
    maintenanceMode: Boolean(incoming.maintenanceMode),
  };
  await saveCmsData(data);

  return NextResponse.json({ ok: true });
}
