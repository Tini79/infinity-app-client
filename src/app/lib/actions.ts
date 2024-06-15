"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"

const baseUrl = process.env.REACT_APP_BACKEND_URL
const FormSchema = z.object({
  full_name: z.string().trim().nonempty("full name is required!"),
  username: z.string().trim().nonempty("username is required!"),
  country: z.string().trim().nonempty("country is required!"),
  currency: z.string(),
  gender: z.string().trim().nonempty("gender is required!"),
  email: z.string().email("invalid email address").trim().nonempty("email is required!"),
  password: z.string().trim().nonempty("password is required!"),
})

const FormSchemaRequired = FormSchema.required()
const RegisterUser = FormSchemaRequired
const LoginUser = FormSchema.omit({ full_name: true, gender: true, country: true, currency: true, email: true })
const RequiredLoginUser = LoginUser.required()

export async function registerUser(currState: any, formData: FormData) {
  try {

    const rawData = Object.fromEntries(formData.entries())
    const countryCode = rawData.country.slice(0, 3)
    const currCode = rawData.country.slice(4)

    const insertedData = RegisterUser.safeParse({
      full_name: rawData.full_name,
      username: rawData.username,
      gender: rawData.gender,
      country: countryCode,
      currency: currCode,
      email: rawData.email,
      password: rawData.password,
    })

    if (!insertedData.success) {
      return { "error": insertedData.error.issues[0].message }
    }

    const { data } = await axios.post(`${baseUrl}/api/v1/registration`, insertedData)
    if (data.statusCode == 200) {
      // TODO: coba pelajari lagi soal revalidatePath ini 
      revalidatePath("/login")
      // redirect("/login")
    }
  } catch (error: any) {
    return { "error": error.response.data.message }
  }

  redirect("/login")
}

export async function loginUser(currState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const insertedData = RequiredLoginUser.safeParse({
      username: rawData.username,
      password: rawData.password
    })

    if (!insertedData.success) {
      return { "error": insertedData.error.issues[0].message }
    }

    const { data } = await axios.post(`${baseUrl}/api/v1/login`, insertedData)
    if (data.statusCode == 200) {
      cookies().set("token", data.data.token)
      cookies().set("currency_code", data.data.currency_code)
      revalidatePath("/")
      return data.data
    }
  } catch (error: any) {
    // TODO: padahal status code 400, tapi di network munculnya 200, kenapa yah?
    return { "error": error.response.data.message }
  }
}

export async function logout() {
  cookies().set("token", "")
  cookies().set("currency_code", "")
}