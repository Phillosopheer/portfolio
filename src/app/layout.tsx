import type { Metadata } from "next";
import path from "node:path";

import { BackgroundMusic } from "@/components/background-music";
import { getCmsData } from "@/lib/cms-store";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

const fontFiles = {
  body: "tekstebistvis.ttf",
  display: "sataurebistvis.ttf",
  mono: "agwrebistvis.otf",
} as const;

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

async function resolveDynamicFonts() {
  const bodyFile = fontFiles.body;
  const displayFile = fontFiles.display;
  const monoFile = fontFiles.mono;
  const selectedFiles = [bodyFile, displayFile, monoFile];
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
        <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="site-bg-overlay" aria-hidden="true" />
        </div>
        {!isMaintenanceMode ? <BackgroundMusic /> : null}
        {children}
      </body>
    </html>
  );
}
