"use client"
import Link from "next/link";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/navigation-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
// TODO: boleh nanti tambahin props buat nampung text nih ama link and so on
interface ButtonProps {
  btnType?: string,
  isAuth?: boolean
}
export default function Button({ btnType, isAuth = false }: ButtonProps) {
  const { pathname } = useContext(GlobalContext)
  const { contacts } = require("@/app/lib/placeholder-data")
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [orderAmount, setOrderAmount] = useState(0)

  const onClickOrder = () => {
    setShowOrderDetail(!showOrderDetail)
  }

  const onClickDirect = () => {
    setShowOrderDetail(!showOrderDetail)
  }

  const onChangeOrderVal = (val: string) => {
    setOrderAmount(parseInt(val))
  }
  return (
    <>
      {btnType == "btn-group" ? (
        <>
          {/* TODO: mungkin button yg paling bawah bisa pakai yg ini saja, ambil satu lah, isi kondisi */}
          <Link href={contacts[2]} className="inline-block bg-bs-secondary border-2 border-bs-secondary text-bs-primary--darker !font-bold lg:text-base sm:text-sm text-xs lg:py-4 sm:py-3 py-2 lg:px-16 sm:px-[42px] px-8 lg:mr-4 sm:mr-3 mr-2 hover:bg-bs-secondary--darker hover:border-transparent">Order Now</Link>
          <Link href="/#productCategoriesSection" className="inline-block bg-transparent border-2 border-bs-secondary text-bs-secondary !font-bold lg:text-base sm:text-sm text-xs lg:py-4 sm:py-3 py-2 lg:px-16 sm:px-[42px] px-8 hover:bg-bs-secondary--darker hover:text-bs-primary--darker hover:border-transparent">Explore Product</Link>
        </>
      ) : btnType == "auth-btn-group" ? (
        <>
          <div className="">
            {/* <MyContext.Provider > */}
            <button type="submit" className="w-full border-2 border-bs-secondary bg-bs-secondary text-bs-primary--darker !font-medium lg:text-base sm:text-sm text-xs lg:py-3 sm:py-[9px] py-1.5 lg:px-16 sm:px-[42px] px-8 hover:bg-bs-secondary--darker hover:border-bs-secondary--darker ">Submit</button>
            <div className="lg:mt-2 sm:mb-1.5 mb-1 text-center">
              <span className="lg:text-sm sm:text-xs text-[10px]">Don&lsquo;t have an account?&nbsp;
                <Link href={pathname == "/login" && "/registration" || (pathname == "/registration" ? "/login" : "")} className="text-bs-fourth font-medium hover:text-bs-third underline lg:underline-offset-8 sm:underline-offset-[6px] underline-offset-4">{pathname == "/login" ? "Register" : pathname == "/registration" && "Login"}</Link></span>
            </div>
            {/* </MyContext.Provider> */}
          </div>
        </>
      ) : btnType == "btn-product" ? (
        <>
          {/* // TODO: belum isi dropdown dan harga belum hidden ini UI nya */}
          {isAuth ? (
            <div className="flex flex-1">
              <div className="flex items-center justify-center w-1/5 border-r-0 border-bs-third--lighter focus:outline-0 text-bs-fourth lg:h-12 sm:h-9 h-6 bg-bs-third--lighter">
                <FontAwesomeIcon icon={faBasketShopping} className="lg:text-lg sm:text-base text-sm"></FontAwesomeIcon>
              </div>
              <input onChange={e => onChangeOrderVal(e.target.value)} min="0" type="number" id="amount" value={orderAmount} name="amount" className="lg:h-12 sm:h-9 h-6 md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:text-base sm:text-sm text-xs w-1/3" />
              <div className="relative w-2/3">
                {/* <div className="absolute top-0 z-10"> */}
                {showOrderDetail ? (
                  <ul className="w-full flex justify-between text-sm">
                    <li className="flex items-center justify-center bg-bs-secondary text-bs-primary--darker w-full hover:bg-bs-secondary--darker lg:h-12 sm:h-9 h-6 lg:py-3 sm:py-[9px] py-1.5">
                      <Link onClick={onClickDirect} href={contacts[2].href} className="flex items-center">
                        <FontAwesomeIcon icon={contacts[2].icon} className="lg:text-lg sm:text-base text-sm"></FontAwesomeIcon>
                      </Link>
                    </li>
                    <li className="flex items-center justify-center bg-bs-secondary text-bs-primary--darker w-full hover:bg-bs-secondary--darker lg:h-12 sm:h-9 h-6 lg:py-3 sm:py-[9px] py-1.5">
                      <Link onClick={onClickDirect} href={"mailto" + contacts[1].href} className="flex items-center">
                        <FontAwesomeIcon icon={contacts[1].icon} className="lg:text-lg sm:text-base text-sm"></FontAwesomeIcon>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <button onClick={onClickOrder} className="lg:text-base sm:text-sm text-xs bg-bs-secondary text-bs-primary--darker w-full hover:bg-bs-secondary--darker lg:h-12 sm:h-9 h-6 lg:py-3 sm:py-[9px] py-1.5 flex items-center justify-center">Order</button>
                )}
                {/* </div> */}
              </div>
            </div>
          ) : (
            <>
              <div className="flex lg:gap-2 sm:gap-1.5 gap-1">
                {/* <div className="lg:text-base sm:text-sm text-xs bg-transparent border border-bs-secondary text-bs-primary--darker hover:border-bs-secondary--darker hover:bg-bs-secondary--darker w-full lg:py-3 sm:py-[9px] py-1.5 text-center"> */}
                <Link href="/login" className="lg:text-base sm:text-sm text-xs !font-medium bg-transparent border-2 border-bs-secondary text-bs-primary--darker hover:border-bs-secondary--darker hover:bg-bs-secondary--darker w-full lg:py-3 sm:py-[9px] py-1.5 text-center">Login</Link>
                {/* </div> */}
                {/* <div className="lg:text-base sm:text-sm text-xs bg-bs-secondary text-bs-primary--darker hover:bg-bs-secondary--darker w-full lg:py-3 sm:py-[9px] py-1.5 text-center"> */}
                <Link href="/registration" className="lg:text-base sm:text-sm text-xs !font-medium bg-bs-secondary text-bs-primary--darker hover:bg-bs-secondary--darker w-full lg:py-3 sm:py-[9px] py-1.5 text-center">Register</Link>
                {/* </div> */}
              </div>
            </>
          )}
        </>
      ) : (
        <Link href="https://wa.me/+62881038440302" className="bg-bs-secondary border-2 border-bs-secondary text-bs-primary--darker !font-bold lg:text-base sm:text-sm text-xs lg:py-4 sm:py-3 py-2 lg:px-16 sm:px-[42px] px-8 hover:bg-bs-secondary--darker hover:border-transparent">Order Now</Link>
      )
      }
    </>
  )
}