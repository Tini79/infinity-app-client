import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

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
// TODO: mungkinuntuk parameter yg diterima bisa dipersingkat
export default function NavLinks({ icon, href, isPhone = false, isEmail = false, val, customCls, footerMenus = [], footerMenuTitle, hasIcon = false }: NavLinks) {
  return (
    <>
      {!(footerMenus.length > 0) ? (
        <>
          <Link href={`${isPhone ? "tel:" + href : isEmail ? "mailto:" + href
            : href}`} className={customCls}>
            <FontAwesomeIcon icon={icon} className={clsx("lg:text-sm sm:text-xs text-[10px]", { "me-2": val })}></FontAwesomeIcon>
            {val && (
              <span>{val}</span>
            )}
          </Link >
        </>
      ) : (
        <>
          <div className={customCls}>
            <span className="lg:text-sm sm:text-xs text-[10px] !font-bold uppercase">{footerMenuTitle}</span>
            <ul className="lg:mt-4 sm:mt-3 mt-2">
              {footerMenus.map((menu, i) => (
                // TODO: coba cek ya navlink categori di footer
                <li key={i}>
                  <Link href={`${menu.isEmail ? "mailto:" + menu.href : menu.isPhone ? "tel:" + menu.href : footerMenuTitle == "Categories" ? "category/" + menu.href : menu.href}`} className={clsx("lg:text-sm sm:text-xs text-[10px] lg:mb-2 sm:mb-1.5 mb-1 hover:text-bs-secondary--darker", { "flex": hasIcon })}>
                    {hasIcon && (
                      <FontAwesomeIcon icon={menu.icon} className="me-2 lg:text-base sm:text-sm text-xs"></FontAwesomeIcon>
                    )}
                    {menu.name}
                  </Link>
                </li>
              ))
              }
            </ul>
          </div>
        </>
      )
      }
    </>
  )
}