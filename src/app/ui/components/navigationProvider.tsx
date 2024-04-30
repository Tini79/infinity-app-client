"use client"
import { usePathname } from "next/navigation";
import React, { Suspense, createContext } from "react";
import Navbar from "./navigations/navbar/navbar";
import Footer from "./navigations/footer/footer";

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
          <Suspense fallback="loading...">
          <Footer></Footer>
          </Suspense>
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

