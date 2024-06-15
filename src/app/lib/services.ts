import { cookies } from "next/headers"

export function getHeaders() {
  const headers = {
    "Content-Type": "application-json",
    "Authorization": `Bearer ${cookies().get("token") ? cookies().get("token")?.value : ""}`
  }

  const options = {
    headers: headers
  }

  return options
}

export function getCurrencyCode() {
  return cookies().get("currency_code") ? cookies().get("currency_code")?.value : ""
}