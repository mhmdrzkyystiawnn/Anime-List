// src/components/layout/SearchBar.jsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, MagnifyingGlass, TrendUp, Clock } from "@phosphor-icons/react"
import { Input } from "@/components/ui/Input"
import { useAnimeSearch } from "@/hooks/useAnimeSearch"
import Image from "next/image"
import Link from "next/link"

export default function SearchBar({ onClose }) {
  const router = useRouter()
  const inputRef = useRef(null)
  const { keyword, setKeyword, results, loading } = useAnimeSearch()
  const [recentSearches, setRecentSearches] = useState([])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Auto focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSearch = (searchKeyword) => {
    if (!searchKeyword.trim()) return

    // Save to recent searches
    const updated = [
      searchKeyword,
      ...recentSearches.filter((k) => k !== searchKeyword),
    ].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))

    // Navigate to search page
    router.push(`/search/${encodeURIComponent(searchKeyword)}`)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(keyword)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl glass rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <MagnifyingGlass className="w-6 h-6 text-white/60" weight="bold" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Cari anime... (contoh: Naruto, One Piece)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 !bg-transparent border-0 focus:ring-0 !px-0"
            />
            {loading && (
              <div className="w-5 h-5 border-2 border-[var(--maroon)] border-t-transparent rounded-full animate-spin" />
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Search Results */}
          {keyword.trim() && results.length > 0 && (
            <div className="p-4 space-y-2">
              <p className="text-xs text-white/50 px-2 mb-3">
                {results.length} hasil ditemukan
              </p>
              {results.map((anime) => (
                <Link
                  key={anime.mal_id}
                  href={`/anime/${anime.mal_id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-[var(--maroon-strong)] transition-colors">
                      {anime.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                      {anime.type && <span>{anime.type}</span>}
                      {anime.year && (
                        <>
                          <span>•</span>
                          <span>{anime.year}</span>
                        </>
                      )}
                      {anime.score && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-400">★ {anime.score}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {keyword.trim() && !loading && results.length === 0 && (
            <div className="p-8 text-center text-white/60">
              <p>Tidak ada hasil untuk "{keyword}"</p>
              <p className="text-sm mt-2">Coba kata kunci lain</p>
            </div>
          )}

          {/* Recent Searches & Trending */}
          {!keyword.trim() && (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 px-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/60" />
                      <h3 className="text-sm font-semibold text-white/80">
                        Pencarian Terakhir
                      </h3>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-white/50 hover:text-white transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <TrendUp className="w-4 h-4 text-[var(--maroon-strong)]" weight="bold" />
                  <h3 className="text-sm font-semibold text-white/80">
                    Pencarian Populer
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Naruto",
                    "One Piece",
                    "Attack on Titan",
                    "Demon Slayer",
                    "Jujutsu Kaisen",
                    "My Hero Academia",
                  ].map((trend) => (
                    <button
                      key={trend}
                      onClick={() => handleSearch(trend)}
                      className="glass rounded-full px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}