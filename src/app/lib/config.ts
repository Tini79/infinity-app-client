"use client"
import { useEffect, useState } from "react"

export function useAuthStatus() {
  const [isAuth, setIsAuth] = useState<any>(null)
  // call token once when the app loads
  useEffect(() => {
    if (typeof window != "undefined" && window.localStorage) {
      let lSisAuth = localStorage.getItem("isAuth")
      setIsAuth(lSisAuth)
    }
  }, [])

  return isAuth == "true" ? true : false
}

export function saveAuthStatus(data: boolean) {
  if (typeof window != "undefined" && window.localStorage) {
    localStorage.setItem("isAuth", data.toString())
  }
}