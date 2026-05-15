import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontBody = localFont({
  src: "../../public/font/tekstebistvis.ttf",
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = localFont({
  src: "../../public/font/sataurebistvis.ttf",
  variable: "--font-display",
  display: "swap",
});

const fontMono = localFont({
  src: "../../public/font/agwrebistvis.otf",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Developer",
  description: "Minimal hero portfolio landing page.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
