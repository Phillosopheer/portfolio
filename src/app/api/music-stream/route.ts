import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "assets", "music", "music.mp3");
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": "inline; filename=\"audio.mp3\"",
      },
    });
  } catch {
    return NextResponse.json({ error: "music_not_found" }, { status: 404 });
  }
}
