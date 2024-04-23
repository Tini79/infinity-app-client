"use client"
import Image from "next/image"
import { crimsonText } from "../fonts"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import Button from "./button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronLeft, faCircleChevronRight, faStar } from "@fortawesome/free-solid-svg-icons"

interface CarouselProps {
  id: string,
  title?: any,
  data: any,
  isCategory?: boolean,
  isProduct?: boolean,
  isAllProducts?: boolean,
  isAllCategories?: boolean,
  isTestimonials?: boolean,
  productCardCls?: string,
  token?: any
}

export default function Carousel({ id, title, data, isCategory = false, isProduct = false, isAllProducts = false, isAllCategories = false, isTestimonials = false, productCardCls = "", token = null }: CarouselProps) {
  // TODO nanti untuk desc dan href boleh null DAN MUNGKIN UNTUK TIPE DATANYA BISA DIBIKININI INTERFACE  
  const [currWindowWidth, setCurrWindowWidth] = useState(window.innerWidth)
  const displays: any = []
  const [isStartLimit, setIsStartLimit] = useState(true)
  const [isEndLimit, setIsEndLimit] = useState(false)
  const carouselContainer: HTMLElement | null = document.getElementById(`carouselContainer-${id}`)

  let carouselChildrenCounts = carouselContainer?.children.length
  const [counts, setCounts] = useState(0)
  const [temptWindowWidth, setTemptWindowWidth] = useState(0)
  const toShow = useRef(1)
  // const productCategoriesCarousel = document.getElementById("carouselContainer-productCategories")
  // const sliderWidth = useRef(0)
  // check media query
  const mediaXl = window.matchMedia("(min-width: 1280px)")
  const mediaLg = window.matchMedia("(min-width: 1024px)")
  const mediaMd = window.matchMedia("(min-width: 768px)")
  const mediaSm = window.matchMedia("(min-width: 640px)")
  const itemDisplayed = useMemo(() => {
    if (isCategory) {
      return [3, 2, 2, 1, 1]
    } else if (isProduct) {
      return [4, 3, 3, 2, 2]
    } else if (isAllCategories) {
      return [2, 2, 2, 2, 1]
    } else if (isTestimonials) {
      return [3, 3, 2, 2, 1]
    } else {
      return [5, 4, 3, 2, 2]
    }
  }, [isCategory, isProduct, isAllCategories, isTestimonials])
  const [temptItemDisplayed, setTemptItemDisplayed] = useState(0)
  const currItemDisplayed = mediaXl.matches ? itemDisplayed[0] : mediaLg.matches ? itemDisplayed[1] : mediaMd.matches ? itemDisplayed[2] : mediaSm.matches ? itemDisplayed[3] : itemDisplayed[4]
  let showSliderBtn = false
  // if (carouselContainer) {
  //   const temptOffsetLeft = carouselContainer.offsetLeft
  // }

  // HOOK
  useEffect(() => {
    const handleResize = () => {
      setCurrWindowWidth(window.innerWidth)
    }
    // TODO: masih bug ini carouselnya, bosen gw lama" benerin ini mak
    window.addEventListener("resize", handleResize)
    if (carouselChildrenCounts && carouselContainer instanceof HTMLElement && carouselContainer?.children[0] instanceof HTMLElement && carouselContainer?.children[1] instanceof HTMLElement) {
      if (counts > 0) {
        const gapValue = carouselContainer?.children[1].offsetLeft - carouselContainer?.children[0].offsetWidth
        if (temptWindowWidth > currWindowWidth) {
          carouselContainer.style.left = `${0 - ((carouselContainer?.children[0].offsetWidth + gapValue) * counts)}px`
        } else if (temptWindowWidth < currWindowWidth) {
          if (currItemDisplayed > temptItemDisplayed) {
            toShow.current = currItemDisplayed - itemDisplayed[4]
          }

          carouselContainer.style.left = `${0 - ((carouselContainer?.children[0].offsetWidth + gapValue) * (counts - toShow.current))}px`
        }

        if (isEndLimit) {
          if (temptWindowWidth > currWindowWidth && currItemDisplayed < temptItemDisplayed) {
            setIsEndLimit(false)
          } else if (temptWindowWidth < currWindowWidth && currItemDisplayed > temptItemDisplayed) {
            setIsEndLimit(true)
          }
        }
      }

      // // slider for all product categories
      // sliderWidth.current = Math.round(100 / carouselChildrenCounts)
    }

    // // productCategoriesCarousel
    // if (productCategoriesCarousel?.children[0] instanceof HTMLElement) {
    //   console.log(productCategoriesCarousel?.children[0].offsetLeft, 'productCategoriesCarousel');
    // }

    setTemptWindowWidth(currWindowWidth)
    setTemptItemDisplayed(currItemDisplayed)
    return () => {
      window.addEventListener("resize", handleResize)
    }
  }, [counts, isStartLimit, isEndLimit, temptWindowWidth, currWindowWidth, carouselContainer, carouselChildrenCounts, itemDisplayed, temptItemDisplayed, currItemDisplayed])

  // GENERAL
  if (carouselChildrenCounts) {
    showSliderBtn = carouselChildrenCounts > temptItemDisplayed
  }

  for (let i = 0; i < data.length; i++) {
    displays.push("hidden")
  }

  const [currDisplays, setCurrDisplays]: any = useState(displays)

  function handleHover(index?: any) {
    displays[index] = "flex"
    setCurrDisplays(displays)
  }

  const onClickSlider = ((isNext: boolean) => {
    if (carouselContainer?.children[0] instanceof HTMLElement && carouselContainer?.children[1] instanceof HTMLElement && carouselChildrenCounts) {
      const gapValue = carouselContainer?.children[1].offsetLeft - carouselContainer?.children[0].offsetWidth
      carouselContainer.style.left = isNext ? `${carouselContainer.offsetLeft - (carouselContainer?.children[0].offsetWidth + gapValue)}px` : `${carouselContainer.offsetLeft + (carouselContainer?.children[0].offsetWidth + gapValue)}px`
      let tempCounts = counts

      if (isNext) {
        tempCounts += 1
        setCounts(tempCounts)
        carouselChildrenCounts = carouselChildrenCounts - tempCounts
        if (carouselChildrenCounts == temptItemDisplayed) {
          setIsEndLimit(true)
        } else if (carouselChildrenCounts > itemDisplayed[0]) {
          setIsEndLimit(false)
        }
      } else {
        tempCounts -= 1
        setCounts(tempCounts)
        carouselChildrenCounts = carouselChildrenCounts + tempCounts
        setIsEndLimit(false)
      }
    }

    // TODO: nanti prevent user untuk klik tombol prev ama next in case dia usil: ngapus disabled di ui
    setIsStartLimit(!!(carouselContainer?.offsetLeft == 0))
  })

  return (
    // TODO: ada moment ketika load page lagi, malah dibawa ke footer
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
        {((isCategory || isProduct || isAllCategories) && showSliderBtn) && (
          <>
            <div className="flex-initial w-1/4 flex justify-end lg:gap-5 sm:gap-[15px] gap-2.5">
              <button disabled={isStartLimit} onClick={() => onClickSlider(false)}><FontAwesomeIcon icon={faCircleChevronLeft} className={clsx("slider-icon lg:text-2xl sm:text-[22px] text-xl text-bs-third--lighter hover:text-bs-third", { "text-white text-opacity-50 hover:text-bs-third": isAllCategories })} /></button>
              <button disabled={isEndLimit} onClick={() => onClickSlider(true)}><FontAwesomeIcon icon={faCircleChevronRight} className={clsx("slider-icon lg:text-2xl sm:text-[22px] text-xl text-bs-third--lighter hover:text-bs-third", { "text-white text-opacity-50 hover:text-bs-third": isAllCategories })} /></button>
            </div>
          </>
        )}
      </div>
      <div>
        {/* TODO: kalo mau bikin slider pada Product Categories section "overflow-x-scroll": isAllCategories, */}
        <div className={clsx("mx-auto", { "overflow-x-hidden": isCategory || isProduct || isAllProducts || isAllCategories || isTestimonials, "carousel-container relative": isCategory || isProduct || isAllProducts || isAllCategories || isTestimonials, "xl:h-[274px] lg:h-[284px] md:h-[220px] xs:h-[324px] h-[214px]": isCategory, "xl:h-[368px] lg:h-[368px] md:h-[308px] sm:h-[344px] xs:h-[274px] h-[254px]": isProduct, "xl:h-[137px] md:h-[142px] xs:h-[162px] h-[117px]": isAllProducts, "xl:h-[480px] md:h-[440px] sm:h-[380px] h-[400px] xs:h-[338px]": isTestimonials, "xl:h-[338px] lg:h-[300px] md:h-[250px] sm:h-[188px] xs:h-[316px] h-[200px] lg:mt-10 sm:mt-[30px] mt-5": isAllCategories })}>
          <div id={`carouselContainer-${id}`} className={clsx({ "absolute flex h-full": isCategory || isProduct || isAllProducts || isAllCategories || isTestimonials, "md:gap-4 gap-2": isCategory || isProduct, "grid lg:gap-[50px] sm:gap-[30px] xs:gap-[25px] gap-5 lg:grid-cols-3 grid-cols-2": !isCategory && !isProduct && !isAllProducts && !isAllCategories && !isTestimonials, "flex lg:gap-x-3 gap-x-1.5": isAllProducts, "md:gap-5 gap-2.5": isAllCategories, "lg:gap-x-[30px] gap-x-[15px] py-1": isTestimonials })}>
            {data.map((image: any, i: number) => isCategory ? (
              <>
                <div key={i} id={`image${i}`} className="relative xl:w-[calc((100vw-112px)/3)] lg:w-[calc((100vw-96px)/2)] md:w-[calc((100vw-76px)/2)] sm:w-[calc((100vw-60px))] w-[calc((100vw-40px))] mx-auto" onMouseEnter={() => handleHover(i)} onMouseLeave={() => handleHover(null)}>
                  <Link href={`category/${image.href}`}>
                    <Image src={`/${image.path}`} alt={image.name} width={388} height={274} className="w-full h-full object-cover" />
                    <span className={clsx(`${crimsonText.className} absolute top-0 w-full h-full hover:bg-bs-fourth hover:bg-opacity-[56%] justify-center items-center !font-bold lg:text-lg sm:text-base text-sm text-white`, currDisplays[i])}>{image.name}</span>
                  </Link>
                </div>
              </>
            ) : (isAllProducts ? (
              <>
                <div key={i} className="relative xl:w-[calc((100vw-128px)/5)] lg:w-[calc((100vw-116px)/4)] md:w-[calc((100vw-72px)/3)] xs:w-[calc((100vw-52px)/2)] w-[calc((100vw-46px)/2)]">
                  <Link key={i} href={image.href}>
                    <Image src={`/${image.path}`} alt={image.name} width={272} height={248} className="w-full h-full object-cover" />
                  </Link>
                </div>
              </>
            ) : (isProduct ? (
              <>
                <article key={i} className={clsx("xl:w-[calc((100vw-128px)/4)] lg:w-[calc((100vw-112px)/3)] md:w-[calc((100vw-92px)/3)] sm:w-[calc((100vw-66px)/2)] w-[calc((100vw-48px)/2)] lg:p-2 sm:p-1.5 p-1", productCardCls)}>
                  <section className="relative h-full">
                    {/* TODO: mungkin nanti untuk width dan height (semua image yg sifatnya statis) bisa disesuaikan lagi biar foto yg dihasilkan mak nyuss, atau pakai svg aja? */}
                    <div className="md:h-1/2 xs:h-[55%] h-[48%] lg:mb-2 sm:mb-1.5 mb-1">
                      <Image src={`/${image.path}`} alt={image.name} width={388} height={274} className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:mb-4 sm:mb-3 mb-2">
                      <h4 className={`${crimsonText.className} lg:text-lg sm:text-base text-sm !leading-tight !font-bold lg:mb-2 sm:mb-1.5 mb-1`}>{image.name}</h4>
                      {token ? (
                        // TODO: incase ada diskon: yg atas untuk harga normal, yg bawah harga diskon
                        // {/* <s className="lg:text-[14px] sm:text-[12px] text-[10px] text-bs-fourth tracking-[1px] opacity-50">$222&nbsp;</s> */}
                        // TODO: mata uang ($) masih statis
                        <span className="lg:text-[16px] sm:text-[14px] text-[12px] text-bs-fourth tracking-[1px]">${image.price}</span>
                      ) : (
                        <span className="lg:text-[12px] sm:text-[10px] text-[8px] text-red-600">*Price will be displayed after login</span>
                      )}
                    </div>
                    <div className="absolute w-full bottom-0">
                      {/* TODO: mungkin ini nanti jadiin config kayak sistem cakra, kan di localstorage itu diubah */}
                      {token ? (
                        <Button btnType="btn-product" isAuth />
                      ) : (
                        <Button btnType="btn-product" />
                      )}
                    </div>
                  </section>
                </article>
              </>
            ) : (isAllCategories ? (
              <>
                <div key={i} className="relative md:w-[calc((100vw-100px)/2)] sm:w-[calc((100vw-50px)/2)] w-[calc(100vw-40px)] h-full" onMouseEnter={() => handleHover(i)} onMouseLeave={() => { handleHover(null) }}>
                  <Link href={`category/${image.href}`}>
                    <span className={clsx("absolute w-full h-full bg-bs-fourth top-0 bg-opacity-[56%]", currDisplays[i])}></span>
                    <Image src={`/${image.path}`} alt={image.name} width={590} height={338} className="w-full h-full object-cover"></Image>
                    <div className={clsx(`${crimsonText.className} absolute lg:left-8 sm:left-6 left-4 inset-y-1/2 text-white hover:text-bs-secondary !font-bold lg:text-2xl sm:text[22px] text-xl`, currDisplays[i])}><span className=" underline lg:underline-offset-8 sm:underline-offset-[6px] underline-offset-4 ">{image.name.slice(0, 3)}</span>{(image.name.slice(3, 4) == " ") ? <>&nbsp;{image.name.slice(4)}</> : image.name.slice(3)}</div>
                  </Link>
                </div>
              </>
            ) : (isTestimonials ? (
              <>
                <article className="lg:w-[calc((100vw-148px)/3)] sm:w-[calc((100vw-83px)/2)] xs:w-[calc((100vw-63px)/2)] w-[calc((100vw-48px))] lg:px-4 sm:px-3 px-2 lg:pt-4 sm:pt-3 pt-2 lg:pb-6 sm:pb-[18px] pb-3 mx-auto hover:shadow-[0_0_4px_0_rgba(51,44,17,0.16)]">
                  <section className="h-full relative">
                    <div className="h-1/2 lg:mb-2 sm:mb-1.5 mb-1">
                      <Image src={`/${image.image}`} alt={image.productCategory} width={348} height={313} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      {/* or here? */}
                      <span className="lg:text-sm sm:text-xs text-[10px] text-bs-third opacity-50">{image["customer-name"]}</span>
                      {/*  md:mb-1 mb-0.5 */}
                      <h3 className={`${crimsonText.className} lg:text-xl sm:text-lg text-base !font-bold`}>{image["product-category"]}</h3>
                      {/* TODO: nanti data jumlah star diambil dari testi user */}
                      <div className="flex justify-center lg:mb-2 sm:mb-1.5 mb-1">
                        <FontAwesomeIcon icon={faStar} className="lg:w-3.5 sm:w-3 w-2.5 text-bs-third opacity-50 hover:text-bs-third"></FontAwesomeIcon>
                      </div>
                      {/* lg:mb-10 sm:mb-[30px] mb-5  */}
                      <div className="lg:px-4 sm:px-3 px-2">
                        <p className="lg:text-sm sm:text-xs text-[10px] font-light">{image.testimonial}</p>
                      </div>
                      {/* TODO: aku ragu mau ubah ini ke text-sm atau biarin aja 16px ukurannya yah? coba tambahin underlinenya deh biar bisa mutusin */}
                    </div>
                    <div className="absolute w-full bottom-0 flex justify-center">
                      <Link key={i} href={`/category${image.href}`} className="text-bs-fourth lg:text-sm sm:text-xs text-[10px] font-medium hover:text-bs-third underline lg:underline-offset-8 sm:underline-offset-[6px] underline-offset-4">View Product</Link>
                    </div>
                  </section>
                </article>
              </>
            ) : (
              <>
                <div key={i} className="w-full mx-auto">
                  <article>
                    <section>
                      <Image src={`/${image.path}`} alt={image.name} width={340} height={300} className="lg:mb-2 sm:mb-1.5 mb-1 w-full h-full" />
                      <div className="text-center">
                        <h4 className={`${crimsonText.className} lg:mb-2 sm:mb-1.5 mb-1`}>{image.name}</h4>
                        <p className="font-light lg:text-sm sm:text-xs text-[10px]">{image.desc}</p>
                      </div>
                    </section>
                  </article>
                </div>
              </>
            ))))))
            }
          </div >
        </div >
        {/* TODO: persentase ini masih statis yah, jadi kalo ada penambahan kategori, update manual; soalnya belum tahu caranya bikin biar mau statis gimana caranya */}
        {/* TODO: pakai tombol aja deh dulu semua carouselnya, nanti kalo sempet kita edit ini sesuai design */}
        {/* {isAllCategories && (
          <div className="relative mt-4 bg-bs-fourth h-1.5 w-[33%] left-0"></div>
        )} */}
      </div>
      {((isTestimonials || isAllProducts) && showSliderBtn) && (
        <>
          <div className="lg:mt-2 sm:mt-[6px] mt-1 flex w-full justify-center lg:gap-5 sm:gap-[15px] gap-2.5">
            <button disabled={isStartLimit} onClick={() => onClickSlider(false)} className="lg:p-1.5 sm:p-[4px] p-[3px] rounded-full bg-bs-third--lighter hover:bg-bs-third">
              {/* <FontAwesomeIcon icon={faCircleChevronLeft} className="slider-icon lg:text-2xl sm:text-[22px] text-xl text-bs-third--lighter hover:text-bs-third" /> */}
            </button>
            <button disabled={isEndLimit} onClick={() => onClickSlider(true)} className="center-slider lg:p-1.5 sm:p-[4px] p-[3px] rounded-full bg-bs-third--lighter hover:bg-bs-third">
              {/* <FontAwesomeIcon icon={faCircleChevronRight} className="slider-icon lg:text-2xl sm:text-[22px] text-xl text-bs-third--lighter hover:text-bs-third" /> */}
            </button>
          </div>
        </>
      )}
    </>
  )
}