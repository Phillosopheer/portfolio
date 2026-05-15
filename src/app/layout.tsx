import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { BackgroundMusic } from "@/components/background-music";
import { getCmsData } from "@/lib/cms-store";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

const fontDirectory = path.join(process.cwd(), "public", "font");

function getFontFormat(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase();
  if (extension === ".woff2") return "woff2";
  if (extension === ".woff") return "woff";
  if (extension === ".otf") return "opentype";
  return "truetype";
}

function toFamilyName(fileName: string): string {
  return `portfolio-${fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}

function pickFontFile(files: string[], patterns: RegExp[], fallbackIndex: number): string | null {
  for (const pattern of patterns) {
    const match = files.find((file) => pattern.test(file));
    if (match) return match;
  }
  return files[fallbackIndex] ?? files[0] ?? null;
}

async function resolveDynamicFonts() {
  const rawFiles = await readdir(fontDirectory);
  const fontFiles = rawFiles
    .filter((file) => /\.(ttf|otf|woff2?|TTF|OTF|WOFF2?|WOFF)$/.test(file))
    .sort((a, b) => a.localeCompare(b));

  const bodyFile = pickFontFile(fontFiles, [/agwre/i, /body/i], 0);
  const displayFile = pickFontFile(fontFiles, [/sataur/i, /display/i, /title/i], 1);
  const monoFile = pickFontFile(fontFiles, [/tekst/i, /mono/i, /code/i], 2);

  const selectedFiles = [bodyFile, displayFile, monoFile].filter((value): value is string => Boolean(value));
  const uniqueFiles = Array.from(new Set(selectedFiles));

  const cssText = uniqueFiles
    .map((file) => {
      const familyName = toFamilyName(file);
      return `@font-face{font-family:'${familyName}';src:url('/font/${encodeURIComponent(file)}') format('${getFontFormat(file)}');font-display:swap;}`;
    })
    .join("");

  return {
    cssText,
    variables: {
      "--font-body": bodyFile ? `'${toFamilyName(bodyFile)}', sans-serif` : "sans-serif",
      "--font-display": displayFile ? `'${toFamilyName(displayFile)}', sans-serif` : "sans-serif",
      "--font-mono": monoFile ? `'${toFamilyName(monoFile)}', ui-monospace, monospace` : "ui-monospace, monospace",
    } as React.CSSProperties,
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Developer",
  description: "Minimal dark portfolio landing page starter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsData = await getCmsData();
  const isMaintenanceMode = cmsData.settings.maintenanceMode;
  const dynamicFonts = await resolveDynamicFonts();

  return (
    <html lang="en" className="h-full" style={dynamicFonts.variables}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: dynamicFonts.cssText }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <div className="app-background pointer-events-none fixed inset-0 -z-30 overflow-hidden">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="site-bg-overlay" aria-hidden="true" />
        </div>
        <div className="site-dim-overlay" />
        {!isMaintenanceMode ? <BackgroundMusic /> : null}
        {children}
      </body>
    </html>
  );
}
