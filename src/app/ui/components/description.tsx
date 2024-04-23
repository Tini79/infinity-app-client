import clsx from "clsx"
import { crimsonText } from "../fonts"
import Carousel from "./carousel"

interface DescProps {
  children?: React.ReactNode,
  title: string,
  desc?: string,
  isBgPrimary: boolean,
  hasCarousel?: boolean,
  customSectionCls?: string
}
export default function Description({ children, isBgPrimary, title, desc, hasCarousel, customSectionCls }: DescProps) {
  return (
    <>
      <section className={clsx(customSectionCls, { "lg:py-20 sm:py-[60px] py-10": !hasCarousel, "bg-bs-primary": isBgPrimary, "bg-bs-third--lighter": !isBgPrimary && !hasCarousel })}>
        {/* TODO: cek buat carousel */}
        <div className={clsx({ "text-bs-fourth": !isBgPrimary, "xl:px-52 sm:px-20 px-5": desc, "lg:px-10 sm:px-[30px] px-5": !desc, "bg-bs-third--lighter": hasCarousel, "lg:py-20 sm:py-[60px] py-10": hasCarousel })}>
          <h2 className={clsx(`${crimsonText.className} text-center lg:text-[32px] sm:text-[30px] text-[28px] !font-bold`, { "text-bs-secondary--less-darker": isBgPrimary })}>
            {title}
          </h2>
          {desc && (
            <p className={clsx("lg:text-base sm:text-sm text-xs text-center lg:mt-2 sm:mt-1.5 mt-1", { "text-white": isBgPrimary })}>{desc}</p>
          )}
        </div>
        {children && (
          <div className={clsx(hasCarousel ? "lg:mt-10 sm:mt-[35px] mt-[30px] lg:px-10 sm:px-[30px] px-5" : "text-white lg:mt-20 sm:mt-[60px] mt-10")}>
            {children}
          </div>
        )}
      </section >
    </>
  )
}