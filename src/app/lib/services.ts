import { cookies } from "next/headers"

export function getHeaders(){
  const headers = {
    "Content-Type": "application-json",
    "Authorization": `Bearer ${cookies().get("token")?.value}`
  }
  
  const options = {
    headers: headers
  }

  return options
}