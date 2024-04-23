"use client"
import { usePathname } from "next/navigation";
import React, { createContext } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export const NavigationContext = createContext('/')
export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { contacts } = require("@/app/lib/placeholder-data")

  // useEffect(() => {
  if (pathname !== "/login" && pathname !== "/registration") {
    return (
      <>
        <NavigationContext.Provider value={pathname}>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <div className="w-full flex justify-between fixed lg:bottom-4 sm:bottom-3 bottom-2 lg:px-5 sm:px-[15px] px-2.5">
            <div className="flex items-center justify-center bg-bs-primary--darker p-2 box-content w-10 h-10 rounded-full z-10 shadow-[0_1px_8px_1px_rgba(0,0,0,0.25)]">
              <Link href={contacts[2]} className="">
                <FontAwesomeIcon icon={contacts[2].icon} className="text-4xl  text-bs-secondary--lighter hover:text-bs-secondary--darker"></FontAwesomeIcon>
              </Link>
            </div>
            <div className="flex items-center justify-center bg-white p-2 box-content w-20 h-8 rounded-full z-10 shadow-[0_1px_8px_1px_rgba(0,0,0,0.25)]">
              <Link href={contacts[2]} className=" flex items-center text-bs-fourth hover:text-bs-third">
                <FontAwesomeIcon icon={faQuestion} className="text-lg"></FontAwesomeIcon>
                <span className="ml-2 font-semibold">Help</span>
              </Link>
            </div>
          </div>
        </NavigationContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <NavigationContext.Provider value={pathname}>
          {children}
        </NavigationContext.Provider>
      </>
    );
  }
  // }, [pathname])
}

