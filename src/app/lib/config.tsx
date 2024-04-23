"use client"
import { useContext, useState } from "react"
import { NavigationContext } from "../ui/components/navigationProvider"

export function getLoginToken() {
  if (typeof window != "undefined" && window.localStorage) {
    const [token, setToken] = useState<any>(null)
    // let token = 
    // useEffect(() => {
      let lSTOken = localStorage.getItem("token")
      setToken(lSTOken)
    // }, [])
    
    return token == "null" ? null : token
  }

  return null
}

export function handleSave(data: string) {
  if (typeof window != "undefined" && window.localStorage) {
    localStorage.setItem("token", data)
  }
}