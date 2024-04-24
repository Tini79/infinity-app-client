"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";
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
export async function registerUser(formData: FormData) {
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
      console.log(insertedData.error.issues)
      return
    }

    // TODO: dari depan hash juga passnya klo bisa
    const { data } = await axios.post("http://localhost:3200/api/v1/registration", insertedData)
    if (data.statusCode == 200) {
      // TODO: coba pelajari lagi soal revalidatePath ini 
      revalidatePath("/login")
      redirect("/login")
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
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
      console.log(insertedData.error.issues)
      return
    }

    const { data } = await axios.post("http://localhost:3200/api/v1/login", insertedData)
    if (data.statusCode == 200) {
      revalidatePath("/")
      return data.data
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}