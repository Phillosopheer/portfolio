import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

function hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256(keyBytes: Uint8Array, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return new Uint8Array(sig);
}

async function sha256Hex(message: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message));
  return hex(buf);
}

async function getSigningKey(date: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const k0 = enc.encode("AWS4" + R2_SECRET_ACCESS_KEY);
  const k1 = await hmacSha256(k0, date);
  const k2 = await hmacSha256(k1, "auto");
  const k3 = await hmacSha256(k2, "s3");
  return hmacSha256(k3, "aws4_request");
}

async function createPresignedUrl(key: string, contentType: string): Promise<string> {
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
    "X-Amz-Expires": "3600",
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
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = await getSigningKey(dateStamp);
  const sigBytes = await hmacSha256(signingKey, stringToSign);
  const signature = hex(sigBytes.buffer);

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
