// src/app/search/[keyword]/page.jsx
import { Suspense } from "react"
import AnimeGrid from "@/components/anime/AnimeGrid"
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import { searchAnime } from "@/lib/api"
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

export async function generateMetadata({ params }) {
  const resolvedParams = await params // 👈 AWAIT params
  const keyword = decodeURIComponent(resolvedParams.keyword)
  return {
    title: `Hasil Pencarian: ${keyword} - KaiAnimeList`,
    description: `Hasil pencarian anime untuk kata kunci "${keyword}"`
  }
}

export default async function SearchPage({ params }) {
  const resolvedParams = await params // 👈 AWAIT params
  const keyword = decodeURIComponent(resolvedParams.keyword)

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon)]/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl">
              <MagnifyingGlass weight="bold" className="w-8 h-8 text-[var(--maroon-strong)]" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="text-white/60">Hasil untuk </span>
              <span className="text-gradient glow-text">"{keyword}"</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 pb-16">
        <Suspense fallback={<AnimeGridSkeleton count={16} />}>
          <SearchResults keyword={keyword} />
        </Suspense>
      </section>
    </main>
  )
}

async function SearchResults({ keyword }) {
  const animes = await searchAnime(keyword, 16)
  
  if (animes.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-white/60 text-lg">
          Tidak ada hasil untuk "{keyword}"
        </p>
        <p className="text-white/40 text-sm">
          Coba kata kunci lain atau periksa ejaan
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/60">
          Ditemukan {animes.length} anime
        </p>
      </div>
      <AnimeGrid animes={animes} />
    </div>
  )
}