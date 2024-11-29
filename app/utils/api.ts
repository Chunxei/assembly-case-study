import { GithubCategory, UsersResponse } from "./types";


export async function fetchJSON<T>(url: string, headers?: RequestInit['headers']) {
  try {
    const response = await fetch(url, {headers: {
      'Content-Type': 'application/json'
    }})

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const results = await response.json()

    return {
      message: '',
      data: results as T
    }
  } catch(e) {
    if (import.meta.env.DEV) {
      const message = (e as Error | null)?.message ?? 'Request error'
      console.error(message)
    }

    return {
      message: 'An error occurred. Please try again',
      data: null
    }
  }
}


export async function searchGithub(search: string, category: GithubCategory, page = 1, perPage = 20) {
  const url = `${import.meta.env.VITE_GIT_SEARCH_URL}?q=${encodeURIComponent(search)}+type:${category}&per_page=${perPage}&page=${page}`
  const authToken = import.meta.env.VITE_GITHUB_TOKEN
  const headers = authToken ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`} : undefined
  return await fetchJSON<UsersResponse>(url, headers)
}