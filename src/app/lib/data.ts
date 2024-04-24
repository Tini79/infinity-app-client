"use server"
import axios from "axios"

// export async function getCategories({ token }: { token: string | null }) {
export async function getCategories() {
  try {
    // const headers = {
    //   "Content-Type": "application-json",
    //   "Authorization": `Bearer ${token}`
    // }

    // const options = {
    //   headers: headers
    // }

    // const { data } = await axios.get("http://localhost:3200/api/v1/categories", options)
    const { data } = await axios.get("http://localhost:3200/api/v1/categories")
    return data.data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
}

export async function getPopularCategories() {
  try {
    const { data } = await axios.get("http://localhost:3200/api/v1/popular-categories")
    return data.data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch popular categories data.');
  }
}

export async function getTestimonials() {
  try {
    const { data } = await axios.get("http://localhost:3200/api/v1/testimonials")
    return data.data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch testimonials data.');
  }
}

export async function getProductsByCategory(slug: string) {
  try {
    const { data } = await axios.get(`http://localhost:3200/api/v1/category/${slug}`)
    return data.data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data by category.');
  }
}

export async function getCountries() {
  try {
    const { data } = await axios.get("http://localhost:3200/api/v1/countries")
    return data.data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch country data.');
  }
}