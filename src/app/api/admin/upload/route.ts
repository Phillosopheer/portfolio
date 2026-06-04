import { NextResponse } from "next/server";
import { createHmac, createHash, randomUUID } from "node:crypto";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

// ── Cloudinary ──────────────────────────────────────────────
function createAttachmentUrl(url: string, fileName: string): string {
  const marker = "/upload/";
  if (!url.includes(marker)) return url;
  const isRawFile = fileName.toLowerCase().endsWith(".zip") || url.includes("/raw/upload/");
  if (isRawFile) return url.replace(marker, "/upload/fl_attachment/");
  const sanitizedName = fileName.trim().replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, "_");
  if (!sanitizedName) return url;
  return url.replace(marker, `/upload/fl_attachment:${encodeURIComponent(sanitizedName)}/`);
}

async function uploadToCloudinary(file: File): Promise<{ url: string; downloadUrl: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  form.append("filename_override", file.name);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: form,
  });
  const payload = (await res.json()) as { secure_url?: string; error?: { message?: string } };
  if (!res.ok || !payload.secure_url) {
    throw new Error(payload.error?.message ?? "Cloudinary ატვირთვა ვერ მოხერხდა");
  }
  return { url: payload.secure_url, downloadUrl: createAttachmentUrl(payload.secure_url, file.name) };
}

// ── R2 Presigned URL ────────────────────────────────────────
function hmac(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data).digest();
}

function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

function getR2PresignedUrl(key: string, contentType: string): string {
  const accountId = process.env.R2_ACCOUNT_ID!;
  const bucketName = process.env.R2_BUCKET_NAME!;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;

  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;

  const queryParams = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${accessKeyId}/${credentialScope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": "3600",
    "X-Amz-SignedHeaders": "content-type;host",
  });

  const canonicalRequest = [
    "PUT",
    `/${bucketName}/${key}`,
    queryParams.toString(),
    `content-type:${contentType}\nhost:${host}\n`,
    "content-type;host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, credentialScope, sha256(canonicalRequest)].join("\n");

  const k1 = hmac(Buffer.from("AWS4" + secretAccessKey), dateStamp);
  const k2 = hmac(k1, "auto");
  const k3 = hmac(k2, "s3");
  const signingKey = hmac(k3, "aws4_request");
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  queryParams.set("X-Amz-Signature", signature);
  return `https://${host}/${bucketName}/${key}?${queryParams.toString()}`;
}

// ── Handler ─────────────────────────────────────────────────
export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) return unauthorizedResponse();

  const contentType = request.headers.get("content-type") ?? "";

  // ZIP → R2 presigned URL (JSON request)
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { fileName: string; contentType: string };
    if (!body.fileName || !body.contentType) {
      return NextResponse.json({ error: "fileName და contentType საჭიროა" }, { status: 400 });
    }
    const ext = body.fileName.includes(".") ? "." + body.fileName.split(".").pop() : "";
    const key = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
    const presignedUrl = getR2PresignedUrl(key, body.contentType);
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    return NextResponse.json({ presignedUrl, url: publicUrl, downloadUrl: publicUrl });
  }

  // ფოტო → Cloudinary (FormData request)
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ფაილი ვერ მოიძებნა" }, { status: 400 });
  }
  try {
    const result = await uploadToCloudinary(file);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ატვირთვა ვერ მოხერხდა";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
