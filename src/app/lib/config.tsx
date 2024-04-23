"use client"
import { useEffect, useState } from "react"

export function useLoginToken() {
  
  const [token, setToken] = useState<any>(null)
  useEffect(() => {
  if (typeof window != "undefined" && window.localStorage) {
      let lSTOken = localStorage.getItem("token")
      setToken(lSTOken)
      
      return token == "null" ? null : token
    }
  }, [])

  return null
}

export function handleSave(data: string) {
  if (typeof window != "undefined" && window.localStorage) {
    localStorage.setItem("token", data)
  }
}