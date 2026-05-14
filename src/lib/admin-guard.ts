import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSessionCookieName, verifySessionToken } from "@/lib/admin-auth";

export async function isAdminAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  return verifySessionToken(token);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
