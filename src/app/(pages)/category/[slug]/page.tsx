import { getCategories, getProductsByCategory } from "@/app/lib/data";
import Description from "../../../ui/components/description";
import Hero from "../../../ui/components/hero";
import { crimsonText } from "../../../ui/fonts";
import Image from "next/image"
import ProductsCarousel from "@/app/ui/components/home/products-carousel";
import dynamic from "next/dynamic";
import ProductSection from "@/app/ui/components/slug/product-section";

export default async function Category({ params }: { params: { slug: string } }) {
  const imageUrl = `/imgs/categories/${params.slug}.jpg`;
  const products = await getProductsByCategory(params.slug)
  const anotherCategories = await getCategories()
  const triHitaKarana = [
    { name: "Parahyangan", desc: "Harmony between humans and the divine" },
    { name: "Pawongan", desc: "Harmony between humans and other humans" },
    { name: "Palemahan", desc: "Harmony between humans and nature" },
  ]
  // TODO: masih data dummy, soalnya belum ada foto nig
  const images = [
    { name: "Sandalwood", path: "imgs/tri-hita-karana-collections.jpg", desc: "We choose sandalwood because it has become a spiritual wood in Bali. In some ceremonies, sandalwood is used to symbolize the relationship between humans, nature, and the environment (balance of nature).", href: "/category" },
    { name: "The Balinese Charm", path: "imgs/tri-hita-karana-collections.jpg", desc: "This charm embodies various Balinese values, such as strength, acceptance, reincarnation, balance, faith, appreciation, love, beauty, and wisdom.", href: "/category" },
    { name: "Color Beads, Gemnstones, Glass and Crystals", path: "imgs/tri-hita-karana-collections.jpg", desc: "These materials are inspired by the relationship between humans. They represent the creative expressions and shared emotions that bring people together, creating something captivating to the eye.", href: "/category" },
  ]
  const DynamicCarousel = dynamic(() => import("../../../ui/components/carousel"), { ssr: false })

  return (
    <>
      <section id="categoryHero" className="bg-[url('/imgs/categories/${params.slug}.jpg')] relative h-screen w-full bg-center flex items-center lg:mb-20 sm:mb-[60px] mb-10 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${imageUrl})` }}>
        <Hero isHomepage={false} title="Tri Hita Karana" subTitle="bracelets" />
      </section >
      <ProductsCarousel id="newArrivals" title="New Arrivals" data={products.details} isProduct productCardCls="bg-bs-fourth bg-opacity-[2%]" custCls="lg:mb-20 sm:mb-[60px] mb-10" />
      <Description isBgPrimary title="Cultivate Harmony Within & Around You" desc={`Inspired by the ancient Balinese philosophy \"Tri Hita Karana\" (meaning \"three causes of well-being\" or \"three paths to prosperity\"), the Tri Hita Karana bracelet emphasizes harmonious balance among three fundamental elements.`}>
        <div className="md:flex grid justify-center items-center lg:gap-x-8 md:gap-x-7 gap-y-7 lg:px-10 px-5">
          {triHitaKarana.map((concept, index) => (
            <>
              <div key={index} className="text-center">
                <span className={`${crimsonText.className} block !font-bold lg:text-lg sm:text-base text-sm lg:mb-2 sm:mb-1.5 mb-1`}>{concept.name}</span>
                <span className="block font-light lg:text-sm sm:text-xs text-[10px]">{concept.desc}</span>
              </div>
              {index < 2 && (
                <span key={index} className="hidden md:block h-10 border"></span>
              )}
            </>
          ))}
        </div>
      </Description>
      {/* product explanation */}
      <section className="lg:py-20 sm:py-[60px] py-10 md:px-0 lg:px-10 sm:px-[30px] px-5">
        <div className="md:flex items-center">
          {/* TODO: untuk height belum pakai persentase */}
          <Image src="/imgs/tri-hita-karana-collections.jpg" alt="Tri Hita Karana Bracelet Collections" width={630} height={450} className="md:w-1/2 w-full" />
          <div className="lg:mx-10 md:mx-5 md:mt-0 sm:mt-10 mt-5">
            <h2 className={`${crimsonText.className} lg:text-[36px] sm:text-[34px] text-[32px] lg:mb-4 sm:mb-3 mb-2 !font-bold`}>Harmony in Every Bead</h2>
            <p className="text-justify lg:text-base sm:text-sm text-xs">The Tri Hita Karana bracelet typically incorporates symbols or designs representing the three elements of harmony between divinity, humanity, and nature. This serves as a constant reminder of the philosophy&lsquo;s core message. It&lsquo;s often worn not just as a fashion accessory but also as a spiritual and cultural symbol.</p>
          </div>
        </div>
      </section>
      <Description customSectionCls="lg:mb-20 sm:mb-[60px] mb-10 " isBgPrimary={false} hasCarousel title="The Tri Hita Karana bracelets is crafted with mindful attention to the Balinese philosophy, reflected in the materials we  choose.">
        <DynamicCarousel id="description" data={images} />
      </Description>
      {/* TODO: belum filter base on popular yak ini */}
      <ProductsCarousel id="mostPopular" title="Most Popular" data={products.details} isProduct custCls="sm:py-20 py-10 bg-bs-fourth bg-opacity-[2%]" />
      {/* all products */}
      <ProductSection products={products}></ProductSection>
      <section className="lg:px-10 px-5 lg:py-20 py-10 bg-bs-fourth bg-opacity-[2%]">
        <DynamicCarousel id="seeAlso" data={anotherCategories} title="See Also" isCategory />
      </section>
    </>
  )
}