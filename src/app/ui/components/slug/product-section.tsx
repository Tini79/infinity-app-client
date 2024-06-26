"use client"
import { useEffect, useState } from "react";
import { crimsonText } from "../../fonts";
import Button from "../button";
import Image from "next/image"
import Carousel from "../carousel";
interface ProductSectionProps {
  products: any,
}

export default function ProductSection({ products }: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState(products.details[0])
  const [isLoading, setIsLoading] = useState(false)
  // const { isAuth } = useGlobalContext()

  const changeProduct = (productCode: string) => {
    // useEffect(() => {
    const data = products.details.find((el: any) => el.code == productCode)
    setSelectedProduct(data)
    // }, [changeProduct])
  }

  return (
    <>
      <section className="lg:px-10 sm:px-[30px] px-5 sm:py-20 py-10">
        <div className="lg:mb-6 sm:mb-[18px] mb-3">
          <span className={`${crimsonText.className} lg:text-[32px] sm:text-[30px] text-[28px] !font-bold`}>All Products</span>
        </div>
        <div className="lg:mb-7 mb-[21px] flex">
          <article id={selectedProduct.code} className="product-content">
            <section>
              <div className="md:flex lg:gap-8 xs:gap-4 items-center">
                <div className="flex-initial md:w-1/2">
                  <Image src={`/${selectedProduct.path}`} alt={selectedProduct.name} title={selectedProduct.name} width={550} height={464} priority className="md:w-full w-[90%] mx-auto lg:h-[464px] md:h-[300px] md:mb-0 mb-2 object-cover" />
                </div>
                <div className="flex-initial md:w-1/2 w-[90%] mx-auto">
                  <div>
                    <span className="lg:text-[14px] sm:text-[12px] text-[10px] font-medium text-bs-fourth tracking-[1px] opacity-50">
                      {selectedProduct.code}
                    </span>
                    <h3 className={`${crimsonText.className} !font-bold lg:text-[30px] sm:text-[28px] text-[26px] lg:leading-8 sm:leading-[30px] leading-7 lg:mb-2 sm:mb-1.5 mb-1`}>
                      {selectedProduct.name}
                    </h3>
                    <p className="lg:text-base sm:text-sm text-xs font-light text-justify lg:mb-10 md:mb-[30px] mb-5 lg:w-3/4">{selectedProduct.description}</p>
                  </div>
                  <Button />
                </div>
              </div>
            </section>
          </article>
        </div>
        <div>
          <Carousel id="allProducts" data={products.details} slug={products.data.slug} sendProduct={changeProduct} isAllProducts />
        </div>
      </section >
    </>
  )
}