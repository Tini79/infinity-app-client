"use client"
import { usePathname } from "next/navigation";
import React, { Suspense, createContext, useContext } from "react";
import Navbar from "../app/ui/components/navigations/navbar/navbar";
import Footer from "../app/ui/components/navigations/footer/footer";
interface ContextProps {
  pathname: string,
  // isAuth: boolean,
  // setIsAuth: Dispatch<SetStateAction<boolean>>
}

// export const GlobalContext = createContext('/')
export const GlobalContext = createContext<ContextProps>({
  pathname: "",
  // isAuth: false,
  // setIsAuth: (): boolean => false
})

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // const [isAuth, setIsAuth] = useState(false)

  if (pathname !== "/login" && pathname !== "/registration") {
    return (
      <>
        <GlobalContext.Provider value={{ pathname }}>
          <Navbar></Navbar>
          {children}
          <Suspense fallback="loading...">
            <Footer></Footer>
          </Suspense>
        </GlobalContext.Provider>
      </>
    );
  } else {

    return (
      <>
        <GlobalContext.Provider value={{ pathname }}>
          {children}
        </GlobalContext.Provider>
      </>
    );
  }
}

export const useGlobalContext = () => useContext(GlobalContext)