"use client"
import { useAuthStatus } from "@/app/lib/config";
import clsx from "clsx";
import dynamic from "next/dynamic";


interface ProductCarouselProps {
  id: string,
  title: string,
  data: any,
  isProduct: boolean,
  productCardCls?: string,
  custCls: string
}

export default function ProductsCarousel({
  id,
  title,
  data,
  isProduct,
  productCardCls,
  custCls, }: ProductCarouselProps) {
  const DynamicCarousel = data.length >= 4 ? dynamic(() => import("../slick"), { ssr: false }) : dynamic(() => import("../carousel"), { ssr: false })

  return (
    <>
      <section className={clsx("lg:px-10 sm:px-[30px] px-5", custCls)}>
        <DynamicCarousel id={id} title={title} data={data} isProduct={isProduct} productCardCls={productCardCls} isAuth={useAuthStatus()} />
      </section>
    </>
  )
}