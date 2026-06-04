import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!; // https://pub-d5ad7dc5c8eb4ad4ab57c69edc3a22e4.r2.dev
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

async function sign(key: CryptoKey, data: string): Promise<string> {
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getSigningKey(secret: string, date: string, region: string, service: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const algo = { name: "HMAC", hash: "SHA-256" };
  const k1 = await crypto.subtle.importKey("raw", enc.encode("AWS4" + secret), algo, false, ["sign"]);
  const k2buf = await crypto.subtle.sign("HMAC", k1, enc.encode(date));
  const k2 = await crypto.subtle.importKey("raw", k2buf, algo, false, ["sign"]);
  const k3buf = await crypto.subtle.sign("HMAC", k2, enc.encode(region));
  const k3 = await crypto.subtle.importKey("raw", k3buf, algo, false, ["sign"]);
  const k4buf = await crypto.subtle.sign("HMAC", k3, enc.encode(service));
  const k4 = await crypto.subtle.importKey("raw", k4buf, algo, false, ["sign"]);
  const ksbuf = await crypto.subtle.sign("HMAC", k4, enc.encode("aws4_request"));
  return crypto.subtle.importKey("raw", ksbuf, algo, false, ["sign"]);
}

async function uploadToR2(file: File, key: string): Promise<string> {
  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z";

  const bytes = Buffer.from(await file.arrayBuffer());
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const payloadHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${R2_BUCKET_NAME}/${key}`;
  const canonicalQueryString = "";
  const canonicalHeaders = `content-type:${file.type}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest = [
    "PUT",
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const reqHash = Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonicalRequest)))
  )
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${reqHash}`;

  const signingKey = await getSigningKey(R2_SECRET_ACCESS_KEY, dateStamp, "auto", "s3");
  const signature = await sign(signingKey, stringToSign);

  const authHeader = `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`${endpoint}${canonicalUri}`, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      Authorization: authHeader,
    },
    body: bytes,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`R2 ატვირთვა ვერ მოხერხდა: ${res.status} ${txt}`);
  }

  return `${R2_PUBLIC_URL}/${key}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) {
    return unauthorizedResponse();
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ფაილი ვერ მოიძებნა" }, { status: 400 });
  }

  const ext = file.name.includes(".") ? "." + file.name.split(".").pop() : "";
  const uniqueName = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;

  const url = await uploadToR2(file, uniqueName);

  return NextResponse.json({
    ok: true,
    url,
    downloadUrl: url,
    storage: "r2",
  });
}
