"use client"
import { useEffect, useState } from "react"

export function useAuthStatus() {
  const [isAuth, setIsAuth] = useState<any>(null)

  useEffect(() => {
    if (typeof window != "undefined" && window.localStorage) {
      let lSisAuth = localStorage.getItem("isAuth")
      setIsAuth(lSisAuth)
    }
  }, [])

  return isAuth == "true" ? true : false
}

export function saveAuthStatus(data: boolean) {
  console.log('nlaaa');
  if (typeof window != "undefined" && window.localStorage) {
    localStorage.setItem("isAuth", data.toString())
  }
}