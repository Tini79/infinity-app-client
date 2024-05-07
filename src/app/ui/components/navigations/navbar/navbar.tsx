"use client"
import Link from "next/link";
import Image from "next/image"
import { faBars, faClose, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import NavLinks from "../navlinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { logout } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { saveAuthStatus, useAuthStatus } from "@/app/lib/config";

export default function Navbar() {
  const { contacts, navMenus } = require("@/app/lib/placeholder-data")
  const [logoSize, setLogoSize] = useState("sm:w-4/5 w-3/5")

  useEffect(() => {
    function handleLogoSize() {
      if (window.scrollY > 0) {
        setLogoSize("sm:w-3/5 w-2/5")
      } else {
        setLogoSize("sm:w-4/5 w-3/5")
      }
    }

    window.addEventListener("scroll", handleLogoSize)

    return () => {
      window.removeEventListener("scroll", handleLogoSize)
    }
  }, [])

  const toggleSideMenu = (() => {
    const aside = document.getElementById("aside")
    aside?.classList.toggle("-left-full")
    aside?.classList.toggle("left-0")
  })

  return (
    <>
      <header className="fixed w-full shadow-[0_1px_8px_2px_rgba(0,0,0,0.25)] z-10">
        <nav>
          <div className="bg-bs-primary--darker lg:py-3 sm:py-2 py-1.5 lg:px-10 sm:px-[30px] px-5 flex">
            {/* desktop, laptop, tablet */}
            <ul className="hidden xl:flex items-center flex-1 gap-10">
              {contacts.map((contact: any, i: number) => i <= 1 && (
                <li key={i}>
                  <NavLinks icon={contact.icon} href={contact.href} isPhone={contact.isPhone} isEmail={contact.isEmail} val={contact.value} customCls="text-sm text-bs-secondary--lighter flex hover:text-bs-secondary--darker flex items-center" />
                </li>
              ))}
            </ul>
            <ul className="hidden xl:flex items-center flex-1 justify-end gap-10">
              {contacts.map((contact: any, i: number) => i > 1 && (
                <li key={i}>
                  <NavLinks icon={contact.icon} href={contact.href} customCls="text-sm text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center" />
                </li>
              ))}
              <li>
                {useAuthStatus() ? (
                  <>
                    <form action={async () => {
                      await logout()
                      saveAuthStatus(false)
                      redirect("/")
                    }}>
                      <button type="submit" className="flex items-center">
                        <FontAwesomeIcon icon={faRightFromBracket} className="text-sm text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center"></FontAwesomeIcon>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <FontAwesomeIcon icon={faUser} className="text-sm text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center"></FontAwesomeIcon>
                    </Link>
                  </>
                )}
              </li>
            </ul>
            {/* mobile */}
            <ul className="xl:hidden flex items-center flex-initial sm:w-1/2 w-2/3 gap-10">
              <li>
                <NavLinks icon={contacts[0].icon} href={contacts[0].href} isPhone={contacts[0].isPhone} val={contacts[0].value} customCls="lg:text-sm sm:text-xs text-[10px] text-bs-secondary--lighter flex hover:text-bs-secondary--darker flex items-center" />
              </li>
            </ul>
            <ul className="xl:hidden flex items-center flex-initial sm:w-1/2 w-1/3 justify-end gap-5">
              {contacts.map((contact: any, i: number) => i > 3 && (
                <li key={i}>
                  <NavLinks icon={contact.icon} href={contact.href} customCls="lg:text-sm sm:text-xs text-[10px] text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center" />
                </li>
              ))}
              <li>
                {useAuthStatus() ? (
                  <>
                    <form action={async () => {
                      await logout()
                      saveAuthStatus(false)
                      redirect("/")
                    }}>
                      <button type="submit" className="flex items-center">
                        <FontAwesomeIcon icon={faRightFromBracket} className="lg:text-sm sm:text-xs text-sm text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center"></FontAwesomeIcon>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <NavLinks icon={faUser} href="/login" customCls="lg:text-sm sm:text-xs text-sm text-bs-secondary--lighter hover:text-bs-secondary--darker flex items-center" />
                  </>
                )}
              </li>
            </ul>
          </div >
          {/* main navigation */}
          < div className="flex items-center lg:px-10 sm:px-[30px] px-5 lg:py-2 py-1 bg-white relative" >
            {/* desktop, laptop, tablet */}
            < div className="hidden sm:flex items-center flex-1 lg:gap-10 gap-5" >
              {
                navMenus.map((menu: any, i: number) => i <= 1 && (
                  <Link
                    key={i}
                    href={menu.href}
                    className="lg:text-base sm:text-sm text-bs-fourth hover:text-bs-third uppercase font-medium"
                  >
                    {menu.name}
                  </Link>
                ))
              }
            </div >
            <Link href={navMenus[0].href} className="flex justify-center mx-auto">
              <Image id="navbarLogo" src="/imgs/brand-logo-darker.png" alt="Infinity Pritty Jewellery Logo" width={191} height={91} className={logoSize} priority />
            </Link>
            <div className="hidden sm:flex flex-1 justify-end items-center lg:gap-10 gap-5">
              {navMenus.map((menu: any, i: number) => i > 1 && (
                <Link
                  key={i}
                  href={menu.href}
                  className="lg:text-base sm:text-sm text-bs-fourth hover:text-bs-third uppercase font-medium"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
            <div className="sm:hidden absolute right-5 ">
              <button onClick={toggleSideMenu}>
                <FontAwesomeIcon icon={faBars} className="text-sm text-bs-fourth hover:text-bs-third"></FontAwesomeIcon>
              </button>
            </div>
          </div >
        </nav >
      </header >
      <aside id="aside" className="bg-bs-primary--darker p-5 w-full h-full fixed overflow-hidden z-10 sm:hidden -left-full">
        <div className="flex justify-end">
          <button onClick={toggleSideMenu}>
            <FontAwesomeIcon icon={faClose} className="text-xl text-bs-secondary--lighter hover:text-bs-secondary--darker" />
          </button>
        </div>
        <div>
          <Image onClick={toggleSideMenu} id="sidebarLogo" src="/imgs/brand-logo.png" alt="Infinity Pritty Jewellery Logo" width={199} height={99} className="mx-auto mt-10 mb-16 w-[199px]" />
          <div>
            <ul className="text-center">
              {navMenus.map((menu: any, i: number) => (
                <li key={i} className="mb-7">
                  <Link onClick={toggleSideMenu}
                    href={menu.href}
                    className="text-2xl text-bs-secondary--lighter hover:text-bs-secondary--darker uppercase font-medium"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute inset-x-5 flex justify-center bottom-5">
            <div>
              <ul className="flex justify-center gap-5">
                {contacts.map((contact: any, i: number) => (
                  <li key={i}>
                    <Link onClick={toggleSideMenu} href={contact.href}>
                      <FontAwesomeIcon icon={contact.icon} className="text-bs-secondary--lighter hover:text-bs-secondary--darker text-xl"></FontAwesomeIcon>
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="font-light text-[10px] text-bs-secondary--lighter">&copy; 2024️ <Link onClick={toggleSideMenu} href="/" className="hover:text-bs-secondary--darker">Infinity Pritty Jewellery</Link>. All rights reserved</span>
            </div>
          </div>
        </div>
      </aside >
    </>
  )
}