// import { MetadataRoute } from "next";
import { getSlugs } from "./lib/data";

export default async function sitemap() {
  const baseUrl = "https://infinityprittyjewellery.com"
  const response = await getSlugs()
  const categorySlugs = response?.map((data: any) => {
    return {
      url: `${baseUrl}/category/${data?.slug}`,
      lastModified: new Date(data?.created_at)
    }
  })

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date()
    },
    ...categorySlugs
  ]
}