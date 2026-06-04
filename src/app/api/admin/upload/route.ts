import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

async function hmac(key: ArrayBuffer, data: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, new TextEncoder().encode(data));
}

async function getSigningKey(date: string): Promise<ArrayBuffer> {
  const k0 = new TextEncoder().encode("AWS4" + R2_SECRET_ACCESS_KEY);
  const k1 = await hmac(k0, date);
  const k2 = await hmac(k1, "auto");
  const k3 = await hmac(k2, "s3");
  return hmac(k3, "aws4_request");
}

function hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(data: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data)));
}

async function createPresignedUrl(key: string, contentType: string, expiresIn = 3600): Promise<string> {
  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const credential = `${R2_ACCESS_KEY_ID}/${credentialScope}`;

  const queryParams = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": credential,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expiresIn),
    "X-Amz-SignedHeaders": "content-type;host",
  });

  const canonicalRequest = [
    "PUT",
    `/${R2_BUCKET_NAME}/${key}`,
    queryParams.toString(),
    `content-type:${contentType}\nhost:${host}\n`,
    "content-type;host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256(canonicalRequest),
  ].join("\n");

  const signingKey = await getSigningKey(dateStamp);
  const signature = hex(await hmac(signingKey, stringToSign));

  queryParams.set("X-Amz-Signature", signature);

  return `https://${host}/${R2_BUCKET_NAME}/${key}?${queryParams.toString()}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const body = (await request.json()) as { fileName: string; contentType: string };
  const { fileName, contentType } = body;

  if (!fileName || !contentType) {
    return NextResponse.json({ error: "fileName და contentType საჭიროა" }, { status: 400 });
  }

  const ext = fileName.includes(".") ? "." + fileName.split(".").pop() : "";
  const key = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;

  const presignedUrl = await createPresignedUrl(key, contentType);
  const publicUrl = `${R2_PUBLIC_URL}/${key}`;

  return NextResponse.json({ presignedUrl, url: publicUrl, downloadUrl: publicUrl });
}
