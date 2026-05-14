import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-guard";

function createAttachmentUrl(url: string, fileName: string): string {
  const marker = "/upload/";
  if (!url.includes(marker)) {
    return url;
  }

  const sanitizedName = fileName
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "_");
  if (!sanitizedName) {
    return url;
  }

  const encodedName = encodeURIComponent(sanitizedName);
  return url.replace(marker, `/upload/fl_attachment:${encodedName}/`);
}

async function saveFileLocally(file: File): Promise<string> {
  const originalName = file.name.trim();
  const extFromName = path.extname(originalName);
  const extFromType = file.type === "image/png" ? ".png" : file.type === "image/webp" ? ".webp" : ".jpg";
  const ext = extFromName || extFromType;
  const safeBaseName = path
    .basename(originalName, ext)
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "_")
    .slice(0, 48);
  const uniqueName = `${Date.now()}-${safeBaseName || "upload"}-${randomUUID().slice(0, 8)}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const targetPath = path.join(uploadDir, uniqueName);
  await writeFile(targetPath, bytes);

  return `/uploads/${uniqueName}`;
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

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    const localUrl = await saveFileLocally(file);
    return NextResponse.json({
      ok: true,
      url: localUrl,
      downloadUrl: localUrl,
      storage: "local",
    });
  }

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", file);
  cloudinaryForm.append("upload_preset", uploadPreset);
  cloudinaryForm.append("use_filename", "true");
  cloudinaryForm.append("filename_override", file.name);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: cloudinaryForm,
    },
  );

  if (!response.ok) {
    const localUrl = await saveFileLocally(file);
    return NextResponse.json({
      ok: true,
      url: localUrl,
      downloadUrl: localUrl,
      storage: "local",
      fallback: true,
    });
  }

  const payload = (await response.json()) as { secure_url?: string };
  if (!payload.secure_url) {
    return NextResponse.json({ error: "Cloudinary URL ვერ დაბრუნდა" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    url: payload.secure_url,
    downloadUrl: createAttachmentUrl(payload.secure_url, file.name),
  });
}
