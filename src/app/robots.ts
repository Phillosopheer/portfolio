import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["facebookexternalhit", "Facebot", "Twitterbot", "Slackbot", "LinkedInBot", "WhatsApp"],
        allow: "/",
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

