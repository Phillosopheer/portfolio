import { NextResponse } from "next/server";
import { createHmac, createHash, randomUUID } from "node:crypto";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

function hmac(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data).digest();
}

function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

function getSigningKey(secret: string, date: string): Buffer {
  const k1 = hmac(Buffer.from("AWS4" + secret), date);
  const k2 = hmac(k1, "auto");
  const k3 = hmac(k2, "s3");
  return hmac(k3, "aws4_request");
}

function createPresignedUrl(key: string, contentType: string): string {
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
    sha256(canonicalRequest),
  ].join("\n");

  const signingKey = getSigningKey(R2_SECRET_ACCESS_KEY, dateStamp);
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");

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

  const presignedUrl = createPresignedUrl(key, contentType);
  const publicUrl = `${R2_PUBLIC_URL}/${key}`;

  return NextResponse.json({ presignedUrl, url: publicUrl, downloadUrl: publicUrl });
}
