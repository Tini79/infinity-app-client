// import { MetadataRoute } from "next";
import { getSlugs } from "./lib/data";

export default async function sitemap() {
  const baseUrl = "https://infinityprittyjewellery.com"
  const response = await getSlugs()
  const categoriSlugs = response?.map((slug: any) => {
    return {
      url: `${baseUrl}/category/${slug.slug}`,
      lastModified: new Date(slug?.created_at)
    }
  })

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date()
    },
    ...categoriSlugs
  ]
}