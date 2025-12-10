// src/hooks/useAnimeSearch.js
"use client"

import { useState, useEffect } from 'react'

export function useAnimeSearch(initialKeyword = '') {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([])
      return
    }

    const searchAnime = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${encodeURIComponent(keyword)}&limit=16`
        )
        
        if (!response.ok) throw new Error('Search failed')
        
        const data = await response.json()
        setResults(data.data || [])
      } catch (err) {
        setError(err.message)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(searchAnime, 500)
    return () => clearTimeout(timeoutId)
  }, [keyword])

  return { keyword, setKeyword, results, loading, error }
}