"use client"
import Image from "next/image"
import { crimsonText } from "../fonts"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import Button from "./button"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface CarouselProps {
  id: string,
  title?: any,
  data: any,
  productName?: string,
  productId?: any,
  isCategory?: boolean,
  isProduct?: boolean,
  isAllProducts?: boolean,
  isAllCategories?: boolean,
  isTestimonials?: boolean,
  productCardCls?: string,
  isAuth?: any,
  slug?: string,
  sendProduct?: any
}

export default function Slick({ id, title, data, productName, productId, isCategory = false, isProduct = false, isAllProducts = false, isAllCategories = false, isTestimonials = false, productCardCls = "", isAuth = null, slug, sendProduct }: CarouselProps) {
  var settings = isProduct ? {
    speed: 500,
    dots: data.length > 4,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        // this breakpoints starts from the initial value to less
        breakpoint: 1280,
        settings: {
          dots: data.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          dots: data.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  } : {
    // TODO: condition for another carousel, since some pictures provided less than the display needs for carousel, I still use my scratch version carousel for them
    speed: 500,
    dots: data.length > 3,
    infinite: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        // this breakpoints starts from the initial value to less
        breakpoint: 1280,
        settings: {
          dots: data.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          dots: data.length > 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  const [url, setUrl] = useState("")
  const displays: any = []
  for (let i = 0; i < data.length; i++) {
    displays.push("hidden")
  }

  const [currDisplays, setCurrDisplays]: any = useState(displays)

  // HOOK
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const handleResize = () => {
      // setCurrWindowWidth(window.innerWidth)
      setUrl(new URL(window.location.href).origin)
      // }
    }
  }, [])

  // GENERAL
  function handleHover(index?: any) {
    displays[index] = "flex"
    setCurrDisplays(displays)
  }

  return (
    <>
      {/* title and slider button */}
      {!isAllProducts && (
        <>
          <div className={clsx(!isTestimonials && "lg:mb-6 sm:mb-[18px] mb-3 flex w-full")}>
            {isTestimonials ? (
              <>
                <div className="lg:mb-[52px] sm:mb-[39px] mb-[26px] text-center">
                  <h2 className="lg:mb-2 sm:mb-1.5 mb-1 uppercase lg:text-sm sm:text-xs text-[10px] lg:tracking-[4px] tracking-[2px]">{title[0]}</h2>
                  <span className={`${crimsonText.className} lg:text-[36px] sm:text-[34px] text-[32px] !font-bold`}>{title[1]}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex-initial w-3/4">
                  <span className={`${crimsonText.className} lg:text-[32px] sm:text-[30px] text-[28px] !font-bold`}>{title}</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {/* sliders */}
      <div className="slider-container">
        <Slider {...settings}>
          {data.map((image: any, i: number) => isProduct ? (
            <>
              <div key={`slickProduct-${image.code}`} className="md:px-2 px-1">
                <article key={`product-${image.code}`} className={clsx("lg:p-2 sm:p-1.5 p-1", productCardCls, { "xl:h-[388px] lg:h-[378px] md:h-[308px] sm:h-[344px] xs:h-[274px] h-[254px]": isProduct })}>
                  <section className="relative h-full">
                    <div className="md:h-3/5 xs:h-2/3 h-[48%] lg:mb-2 sm:mb-1.5 mb-1">
                      <Image src={`/${image.path}`} alt={image.name} title={image.name} width={388} height={274} className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:mb-4 sm:mb-3 mb-2">
                      <h4 className={`${crimsonText.className} lg:text-lg sm:text-base text-sm !leading-tight !font-bold lg:mb-2 sm:mb-1.5 mb-1`}>{image.name}</h4>
                      {isAuth ? (
                        // TODO: incase ada diskon: yg atas untuk harga normal, yg bawah harga diskon
                        // {/* <s className="lg:text-[14px] sm:text-[12px] text-[10px] text-bs-fourth tracking-[1px] opacity-50">$222&nbsp;</s> */}
                        // TODO: mata uang ($) masih statis
                        <span className="lg:text-[16px] sm:text-[14px] text-[12px] text-bs-fourth tracking-[1px]">{image.curr_icon.replace(/&#(\d+);/g, (match: any, dec: any) =>{
                          return String.fromCharCode(dec);
                        })}{image.price}</span>
                      ) : (
                        <span className="lg:text-[12px] sm:text-[10px] text-[8px] text-red-600">*Price will be displayed after login</span>
                      )}
                    </div>
                    <div className="absolute w-full bottom-0">
                      {isAuth ? (
                        <Button btnType="btn-product" productName={productName} productId={productId} isAuth />
                      ) : (
                        <Button btnType="btn-product" />
                      )}
                    </div>
                  </section>
                </article>
              </div>
            </>
          ) : (
            // isCategory's
            <div key={`imageOfCategory-${i}`} id={`image${i}`} className="md:px-2 px-1" onMouseEnter={() => handleHover(i)} onMouseLeave={() => handleHover(null)}>
              <div className="relative xl:h-[274px] lg:h-[288px] md:h-[220px] xs:h-[324px] h-[214px]">
                <Link href={`${url}/category/${image.slug}`}>
                  <Image src={`/${image.pop_path ? image.pop_path : image.path}`} alt={image.name} title={image.name} width={388} height={274} priority className="w-full h-full object-cover" />
                  <span className={clsx(`${crimsonText.className} absolute top-0 w-full h-full hover:bg-bs-fourth hover:bg-opacity-[56%] justify-center items-center !font-bold lg:text-lg sm:text-base text-sm text-white`, currDisplays[i])}>{image.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}