import { getCategories, getCategorySlug, getProductsByCategory } from "@/app/lib/data";
import Description from "../../../ui/components/description";
import Hero from "../../../ui/components/hero";
import { crimsonText } from "../../../ui/fonts";
import Image from "next/image"
import ProductsCarousel from "@/app/ui/components/home/products-carousel";
import dynamic from "next/dynamic";
import ProductSection from "@/app/ui/components/slug/product-section";
import { Metadata } from "next";
import clsx from "clsx";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await getCategorySlug(params.slug)
    if (response?.length === 0) {
      return {
        title: "Not Found",
        description: "The page you're looking for does not exist!"
      }
    }

    return {
      openGraph: {
        title: response?.[0]?.name,
        description: response?.[0]?.desc1,
        images: [response?.[0]?.path]
      }
    }
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you're looking for does not exist!"
    }
  }
}

export default async function Category({ params }: { params: { slug: string } }) {
  const imageUrl = `/imgs/categories/${params.slug}.jpg`;
  const products = await getProductsByCategory(params.slug)
  const { materialDescTitle, triHitaKarana, slug } = require("@/app/lib/placeholder-data")
  let mostPopProducts = []
  for (let i = 0; i < products.details.length; i++) {
    if (products.details[i].total_rate) {
      mostPopProducts.push(products.details[i])
    }
  }
  const categories = await getCategories()
  const anotherCategories = []

  for (let i = 0; i < categories.length; i++) {
    if (!(categories[i].slug == params.slug)) anotherCategories.push(categories[i])
  }
  const DynamicCarousel = dynamic(() => import("../../../ui/components/carousel"), { ssr: false })
  const titleArr = products.data.name.split(' ')
  const subTitle = titleArr[titleArr.length - 1]
  titleArr.pop()
  const title = titleArr.toString().replace(/[\s,]/g, ' ')

  return (
    <>
      <section id="categoryHero" className="bg-[url('/imgs/categories/${params.slug}.jpg')] relative h-screen w-full bg-center flex items-center lg:mb-20 sm:mb-[60px] mb-10 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${imageUrl})` }}>
        <Hero isHomepage={false} title={title} subTitle={subTitle} />
      </section >
      <ProductsCarousel id="newArrivals" title="New Arrivals" data={products.details} isProduct productCardCls="bg-bs-fourth bg-opacity-[2%]" custCls={clsx({ "lg:mb-20 sm:mb-[60px] mb-10": products.data.title_desc1 })} />
      {products.data.title_desc1 && (
        <Description isBgPrimary title={products.data.title_desc1} desc={products.data.desc1}>
          {params.slug == slug[0].triHitaKaranaBracelets && (
            <>
              <div className="md:flex grid justify-center items-center lg:gap-x-8 md:gap-x-7 gap-y-7 lg:px-10 px-5">
                {params.slug == slug[0].triHitaKaranaBracelets && (triHitaKarana.map((concept: any) => (
                  <>
                    <div key={concept.id} className="text-center">
                      <span className={`${crimsonText.className} block !font-bold lg:text-lg sm:text-base text-sm lg:mb-2 sm:mb-1.5 mb-1`}>{concept.name}</span>
                      <span className="block font-light lg:text-sm sm:text-xs text-[10px]">{concept.desc}</span>
                    </div>
                    {concept.id <= 2 && (
                      <span key={concept.id} className="hidden md:block h-10 border"></span>
                    )}
                  </>
                )))}
              </div>
            </>
          )}
        </Description>
      )}
      {/* product explanation */}
      <section className="lg:py-20 sm:py-[60px] py-10 md:px-0 lg:px-10 sm:px-[30px] px-5">
        <div className="md:flex items-center">
          {/* TODO: untuk height belum pakai persentase */}
          <Image src={`/${products.data.path}`} alt={`${title} Bracelet Collections`} width={630} height={450} className="md:w-1/2 w-full" />
          <div className="lg:mx-10 md:mx-5 md:mt-0 sm:mt-10 mt-5">
            <h2 className={`${crimsonText.className} lg:text-[36px] sm:text-[34px] text-[32px] lg:mb-4 sm:mb-3 mb-2 !font-bold`}>{products.data.title_desc2}</h2>
            <p className="text-justify lg:text-base sm:text-sm text-xs">{products.data.desc2}</p>
          </div>
        </div>
      </section>
      <Description customSectionCls="lg:mb-20 sm:mb-[60px] mb-10 " isBgPrimary={false} hasCarousel title={params.slug == slug[0].triHitaKaranaBracelets ? materialDescTitle[0].triHitaKaranaBracelets : params.slug == slug[0].chipstoneBracelets ? materialDescTitle[0].chipstoneBracelets : params.slug == slug[0].redStringBracelets ? materialDescTitle[0].redStringBracelets : ""}>
        <DynamicCarousel id="description" data={products.materials} />
      </Description>
      {(mostPopProducts.length > 0) && (
        <ProductsCarousel id="mostPopular" title="Most Popular" data={mostPopProducts} isProduct custCls="sm:py-20 py-10 bg-bs-fourth bg-opacity-[2%]" />
      )}
      {/* all products */}
      <ProductSection products={products}></ProductSection>
      <section className="lg:px-10 px-5 lg:py-20 py-10 bg-bs-fourth bg-opacity-[2%]">
        <DynamicCarousel id="seeAlso" data={anotherCategories} title="See Also" isCategory />
      </section>
    </>
  )
}