import { Suspense } from "react";
// import { getCategories, getPopularCategories, getTestimonials } from "./lib/data";
// TODO: coba lagi check pada carousel n testi: height foto tidak sesuai dg design
export default function Loading() {
  // const categories = await getCategories()
  // const popularCategories = await getPopularCategories()
  // const testimonials = await getTestimonials()

  return (
    <>
      {/* hero */}
      <section id="homepageHero" className="relative h-screen w-full bg-center flex items-center lg:mb-20 sm:mb-[60px] mb-10  bg-[url('/imgs/hero.jpg')] bg-cover bg-no-repeat">
        <Suspense fallback="dssd"></Suspense>
        {/* <Hero isHomepage title="Discover Vibrant Jewelry for Every Soul" desc="Immerse yourself in the rich cultural heritage and spiritual essence of Bali with our authentic jewelry. Shop now and bring a piece of Bali home!" /> */}
      </section >
      <section className="bg-bs-primary sm:p-20 p-10 lg:flex">
        {/* <div className="flex-1">
          <Image src="/imgs/brand-logo.png" alt="Infinity Pritty Jewellery Logo" width={368} height={176} className="xl:w-[368px] md:w-[318px] w-[245px] xl:h-[176px] md:h-[152px] h-[117px] lg:m-0 mx-auto lg:mb-0 mb-6" />
        </div>
        <div className="flex-1 flex items-center">
          <p className="lg:text-sm sm:text-xs text-[10px] lg:leading-6 sm:leading-5 leading-4 text-white text-justify">Founded in 2021, Infinity Pretty Wear strives to introduce the world to the beauty of Balinese culture through our unique jewelry. We bridge the gap between traditional Balinese culture and modern fashion, allowing everyone to experience the &ldquo;goodness of Bali&ldquo; through our vibrant and spiritually inspired designs.</p>
        </div> */}
      </section>
      <section className="px-10 lg:py-[100px] sm:py-[75px] py-[50px]">
        {/* <Carousel id="popularThisWeek" title="Popular This Week" isCategory data={popularCategories} /> */}
      </section>
      {/* <Description isBgPrimary={false} title="Beyond the Beaches: Discover Bali’s Exquisite Jewelry" desc="Beyond its stunning beaches and vibrant culture, Bali, the captivating Indonesian island, boasts a rich tradition of handcrafted jewelry making that incorporates elements of Hinduism, local folklore, and nature. Balinese authentic jewelry is known for its intricate craftsmanship, unique designs, and deep cultural significance." /> */}
      {/* design introduction */}
      <section className="lg:px-10 sm:px-[30px] px-5 lg:py-20 sm:py-[60px] py-10 md:flex items-center">
        {/* <div className="flex-1 flex justify-center md:mb-0 sm:mb-10 mb-5">
          <Image src="/imgs/design-introduction.jpg" alt="Bracelets Collections" width={550} height={618} className="md:w-[550px] w-[376px] h-full" />
        </div>
        <div className="lg:ml-10 md:ml-5 flex-1">
          <h2 className={`${crimsonText.className} lg:text-[36px] sm:text-[34px] text-[32px] lg:mb-4 sm:mb-3 mb-2 !font-bold`}>Introduce About Our Design</h2>
          <p className="text-justify lg:text-base sm:text-sm text-xs">
            Our jewelry transcends mere fashion and style; it&lsquo;s a path to achieving life&lsquo;s balance. Infinity Pritty Jewellery offers a vast collection featuring diverse stones and charms, each imbued with unique meanings, strengths, and values. Inspired by various Balinese cultures, our collection invites you to embark on a journey of Balinese life.
          </p>
        </div> */}
      </section>
      {/* TODO: coba bikin setiap section yg dituju pas scroll tampil di tengah" page */}
      <section id="productCategoriesSection" className="lg:px-10 sm:px-[30px] px-5 lg:py-20 sm:py-[60px] py-10 bg-bs-third--lighter">
        {/* <Carousel id="productCategories" title="Product Categories" isAllCategories data={categories} /> */}
      </section >
      <section id="testimonialsSection" className="lg:px-10 sm:px-[30px] px-5 lg:pt-[100px] sm:pt-[75px] pt-[50px] lg:pb-[52px] sm:pb-[39px] pb-[26px]">
        {/* <Carousel id="testimonials" title={["Testimonials", "What Our Client Say"]} isTestimonials data={testimonials} /> */}
      </section>
      <section className="bg-bs-primary--darker lg:pr-10 lg:flex lg:pb-0 pb-10">
        {/* <div className="flex-initial lg:w-[45%]">
          <Image src="/imgs/footer-cta.jpg" alt="CTA Image" width={542} height={379} className="h-full w-full object-cover" />
        </div>
        <div className="lg:ml-10 lg:py-24 flex-initial lg:w-[55%] lg:px-10 sm:px-[30px] px-5 lg:mt-0 sm:mt-10 mt-5">
          <div className="text-white lg:mb-10 mb-5">
            <h2 className={`${crimsonText.className} lg:text-[36px] sm:text-[34px] text-[32px] lg:mb-2 sm:mb-1.5 mb-1 !font-bold`}>Embrace Bali&lsquo;s Essence Today!</h2>
            <p className="lg:text-base sm:text-sm text-xs font-light">Carry the spirit of Bali with you through our intricately crafted bracelets. Explore our collection and let the magic of Bali adorn your wrist!</p>
          </div>
          <Button />
        </div> */}
      </section >
    </>
  );
}
