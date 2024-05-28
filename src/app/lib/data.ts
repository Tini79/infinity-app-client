"use server"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getHeaders } from "./services"

export async function getCategories() {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`, options)
    return data.data
  } catch (error: any) {
    if (error.response.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch category data.');
    }
  }
}

export async function getSlugs() {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/slugs`)
    return data.data
  } catch (error) {
    throw new Error('Failed to fetch category\'s slugs data.');
  }
}

export async function getCategorySlug(slug: string) {
  const options = getHeaders()
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/slug/${slug}`, options)
    return data.data
  } catch (error: any) {
    if (error.response.data.statusCode == 401) {
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
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/popular-categories`, options)
    return data.data
  } catch (error: any) {
    if (error.response.data.statusCode == 401) {
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
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/testimonials`, options)
    return data.data
  } catch (error: any) {
    if (error.response.data.statusCode == 401) {
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
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${slug}`, options)
    return data.data
  } catch (error: any) {
    if (error.response.data.statusCode == 401) {
      revalidatePath("/logout")
      redirect("/logout")
    } else {
      throw new Error('Failed to fetch product data by category.');
    }
  }
}

export async function getCountries() {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/countries`)
    return data.data
  } catch (error) {
    throw new Error('Failed to fetch country data.');
  }
}