// import { MetadataRoute } from "next";
import { getSlugs } from "./lib/data";

export default async function sitemap() {
  // const baseUrl = "https://infinityprittyjewellery.com"
  const baseUrl = "https://infinity-app-client-git-master-tinis-projects-9f5a40a4.vercel."
  const response = await getSlugs()
  console.log(response, 'sssss');
  
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