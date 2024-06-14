import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://infinityprittyjewellery.com"

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/category"],
      disallow: ["/login", "/registration"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}