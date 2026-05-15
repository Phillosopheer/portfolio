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
  metadataBase: new URL("https://nodokebadze.vercel.app"),
  title: "Nodo Kebadze | Software Engineer Portfolio",
  description: "Welcome to my portfolio. I am a software engineer specializing in modern web technologies and creative solutions.",
  openGraph: {
    title: "Nodo Kebadze | Software Engineer Portfolio",
    description: "Discover my latest projects and skills in web development.",
    url: "https://nodokebadze.vercel.app",
    siteName: "Nodo Portfolio",
    images: [
      {
        url: "https://nodokebadze.vercel.app/LINK.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodo Kebadze | Software Engineer Portfolio",
    description: "Discover my latest projects and skills in web development.",
    images: ["https://nodokebadze.vercel.app/LINK.png"],
  },
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
    <html lang="en" className="h-full" style={dynamicFonts.variables} prefix="og: http://ogp.me/ns#">
      <head>
        <meta property="og:title" content="Developer" />
        <meta property="og:description" content="Developer Portfolio" />
        <meta property="og:image" content="https://nodokebadze.vercel.app/LINK.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://nodokebadze.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Developer" />
        <meta name="twitter:description" content="Developer Portfolio" />
        <meta name="twitter:image" content="https://nodokebadze.vercel.app/LINK.png" />
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
