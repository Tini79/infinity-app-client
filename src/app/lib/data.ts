"use server"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrencyCode, getHeaders } from "./services"

const baseUrl = process.env.REACT_APP_BACKEND_URL

export async function getCategories() {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/categories`, options)
    return data.data
  } catch (error: any) {
    if (error.response?.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch category data.');
    }
  }
}

export async function getSlugs() {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/slugs`)
    return data.data
  } catch (error) {
    throw new Error('Failed to fetch category\'s slugs data.');
  }
}

export async function getCategorySlug(slug: string) {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/slug/${slug}`, options)
    return data.data
  } catch (error: any) {
    if (error.response?.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch categorie\'s slug data.');
    }
  }
}

export async function getPopularCategories() {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/popular-categories`, options)
    return data.data
  } catch (error: any) {
    if (error.response?.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch popular category data.');
    }
  }
}

export async function getTestimonials() {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/testimonials`, options)
    return data.data
  } catch (error: any) {
    if (error.response?.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch testimonial data.');
    }
  }
}

export async function getProductsByCategory(slug: string) {
  const options = getHeaders()
  try {
    const params = {
      slug: slug,
      currency_code: getCurrencyCode()
    }
    const { data } = await axios.get(`${baseUrl}/api/v1/category`, { params: params, headers: options.headers })
    return data.data
  } catch (error: any) {
    if (error.response?.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else if (error.response?.data.statusCode == 404) {
      // due to I revert the data using slug
      revalidatePath("/404")
      redirect("/404")
      // throw new Error('Failed to fetch product data by category.');
    }
  }
}

export async function getCountries() {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/countries`)
    return data.data
  } catch (error) {
    throw new Error('Failed to fetch country data.');
  }
}