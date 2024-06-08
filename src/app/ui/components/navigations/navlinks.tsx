"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLinks {
  icon?: any,
  href?: string,
  isPhone?: boolean,
  isEmail?: boolean,
  val?: string,
  customCls?: string,
  // footer
  footerMenus?: Array<any>
  footerMenuTitle?: string,
  hasIcon?: boolean
}
// TODO: mungkin untuk parameter yg diterima bisa dipersingkat
export default function NavLinks({ icon, href, isPhone = false, isEmail = false, val, customCls, footerMenus = [], footerMenuTitle, hasIcon = false }: NavLinks) {
  const [url, setUrl] = useState("")

  // HOOK
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const handleResize = () => {
      // setCurrWindowWidth(window.innerWidth)
      setUrl(new URL(window.location.href).origin)
      // }
    }
  }, [])
  return (
    <>
      {!(footerMenus.length > 0) ? (
        <>
          <Link href={`${href}`} className={customCls}>
            <FontAwesomeIcon icon={icon} className={clsx("lg:text-sm sm:text-xs text-sm", { "me-2": val })}></FontAwesomeIcon>
            {val && (
              <span>{val}</span>
            )}
          </Link >
        </>
      ) : (
        <>
          <div className={customCls}>
            <span className="lg:text-sm sm:text-xs text-[10px] !font-bold uppercase underline lg:underline-offset-8 md:underline-offset-[6px] underline-offset-4">{footerMenuTitle}</span>
            <ul className="lg:mt-4 sm:mt-3 mt-2">
              {footerMenus.map((menu, i) => (
                // TODO: coba cek ya navlink categori di footer
                <li key={i}>
                  <Link href={`${footerMenuTitle == "Categories" ? `${url}/category/` + menu.href : menu.href}`} className={clsx("lg:text-sm sm:text-xs text-[10px] lg:mb-2 sm:mb-1.5 mb-1 hover:text-bs-secondary--darker", { "flex": hasIcon })}>
                    {hasIcon && (
                      <FontAwesomeIcon icon={menu.icon} className="me-2 lg:text-base sm:text-sm text-xs"></FontAwesomeIcon>
                    )}
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}