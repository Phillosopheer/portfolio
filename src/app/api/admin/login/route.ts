import { NextResponse } from "next/server";

import {
  createSessionToken,
  getSessionCookieName,
  verifyAdminPassword,
} from "@/lib/admin-auth";

type LoginBody = {
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (!verifyAdminPassword(body.password ?? "")) {
    return NextResponse.json({ error: "არასწორი პაროლი" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
