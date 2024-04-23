import clsx from "clsx";
import { crimsonText } from "../fonts";
import Button from "./button";

interface HeroProps {
  isHomepage: boolean,
  title: string,
  subTitle?: string,
  desc?: string,
}

export default function Hero({ isHomepage, title, subTitle, desc }: HeroProps) {
  return (
    <>
      {/* <section id={id} className="relative h-screen w-full bg-center flex items-center mb-20 bg-[url('/imgs/hero.jpg')] bg-cover bg-no-repeat"> */}
      <div className="absolute w-full h-full bg-bs-fourth bg-opacity-[56%] lg:px-10 sm:px-[30px] px-5 flex items-center ">
        {/* TODO: untuk mt belum responsive yak */}
        <div className="xl:w-1/2 sm:w-3/4 xs:w-4/5 w-full mt-[153px]">
          <div className={clsx("text-white", { "lg:mb-12 mb-6": isHomepage })}>
            <h1 className={clsx(`${crimsonText.className} !font-bold`, isHomepage ? `lg:text-[56px] sm:text-[48px] text-[40px] lg:mb-4 sm:mb-3 mb-2 lg:leading-[64px] sm:leading-[56px] leading-[48px]` : `lg:text-[64px] sm:text-[56px] text-[48px]`)}>
              {title}
            </h1>
            {!isHomepage && (
              <span className="lg:text-lg sm:text-base text-sm font-medium uppercase lg:mt-4 md:mt-3 mt-2 md:tracking-[6px] tracking-[4px]">{subTitle}</span>
            )}
            {isHomepage && (
              <p className="lg:text-base sm:text-sm text-xs">{desc}</p>
            )}
          </div>
          <div>
            {isHomepage && (
              <Button btnType="btn-group" />
            )}
          </div>
        </div>
      </div>
      {/* </section > */}
    </>
  )
}