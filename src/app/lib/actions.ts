"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"

const FormSchema = z.object({
  full_name: z.string().trim().nonempty("full name is required!"),
  username: z.string().trim().nonempty("username is required!"),
  country: z.string().trim().nonempty("country is required!"),
  gender: z.string().trim().nonempty("gender is required!"),
  email: z.string().email("invalid email address").trim().nonempty("email is required!"),
  password: z.string().trim().nonempty("password is required!"),
})

const FormSchemaRequired = FormSchema.required()
const RegisterUser = FormSchemaRequired
const LoginUser = FormSchema.omit({ full_name: true, gender: true, country: true, email: true })
const RequiredLoginUser = LoginUser.required()

export async function registerUser(currState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const insertedData = RegisterUser.safeParse({
      full_name: rawData.full_name,
      username: rawData.username,
      gender: rawData.gender,
      country: rawData.country,
      email: rawData.email,
      password: rawData.password,
    })

    if (!insertedData.success) {
      return { "error": insertedData.error.issues }
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/registration`, insertedData)
    if (data.statusCode == 200) {
      // TODO: coba pelajari lagi soal revalidatePath ini 
      revalidatePath("/login")
      redirect("/login")
    } else if (data.statusCode == 400) {
      return { "error": data.message }
    }
  } catch (error) {
    // throw error;
    return { "error": error }
  }
}

export async function loginUser(currState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const insertedData = RequiredLoginUser.safeParse({
      username: rawData.username,
      password: rawData.password
    })

    if (!insertedData.success) {
      return { "error": insertedData.error.issues }
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, insertedData)
    if (data.statusCode == 200) {
      cookies().set("token", data.data.token)
      revalidatePath("/")
      return data.data
    } else if (data.statusCode == 401) {
      return { "error": data.message }
    }
  } catch (error) {
    return { "error": error }
  }
}

export async function logout() {
  cookies().set("token", "")
}