// src/lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4'

/**
 * Fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      ...options
    })

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

/**
 * Get top anime
 */
export async function getTopAnime(limit = 8) {
  const data = await fetchAPI(`/top/anime?limit=${limit}`)
  return data.data || []
}

/**
 * Get seasonal anime (currently airing)
 */
export async function getSeasonalAnime(limit = 8) {
  try {
    // Try to get current season anime
    const data = await fetchAPI(`/seasons/now?limit=${limit}`)
    return data.data || []
  } catch (error) {
    console.error('Failed to fetch seasonal anime:', error)
    
    // Fallback: Get currently airing anime
    try {
      const fallbackData = await fetchAPI(`/top/anime?filter=airing&limit=${limit}`)
      return fallbackData.data || []
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      return []
    }
  }
}

/**
 * Get anime by season and year
 */
export async function getAnimeBySeasonYear(year, season, limit = 20) {
  const data = await fetchAPI(`/seasons/${year}/${season}?limit=${limit}`)
  return data.data || []
}

/**
 * Get current season info
 */
export function getCurrentSeason() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  
  let season = 'winter'
  if (month >= 4 && month <= 6) season = 'spring'
  else if (month >= 7 && month <= 9) season = 'summer'
  else if (month >= 10 && month <= 12) season = 'fall'
  
  return { year, season }
}

/**
 * Get anime by ID
 */
export async function getAnimeById(id) {
  const data = await fetchAPI(`/anime/${id}`)
  return data.data
}

/**
 * Get anime full details (with characters, staff, etc)
 */
export async function getAnimeFullById(id) {
  const data = await fetchAPI(`/anime/${id}/full`)
  return data.data
}

/**
 * Search anime
 */
export async function searchAnime(keyword, limit = 16) {
  if (!keyword || keyword.trim() === '') {
    return []
  }
  
  const data = await fetchAPI(`/anime?q=${encodeURIComponent(keyword)}&limit=${limit}`)
  return data.data || []
}

/**
 * Get anime recommendations
 */
export async function getAnimeRecommendations(id) {
  const data = await fetchAPI(`/anime/${id}/recommendations`)
  return data.data?.slice(0, 6) || []
}

/**
 * Get anime characters
 */
export async function getAnimeCharacters(id) {
  const data = await fetchAPI(`/anime/${id}/characters`)
  return data.data?.slice(0, 8) || []
}