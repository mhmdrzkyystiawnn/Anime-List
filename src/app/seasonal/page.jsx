// src/app/seasonal/page.jsx
import { Suspense } from "react"
import AnimeGrid from "@/components/anime/AnimeGrid"
import SectionHeader from "@/components/anime/SectionHeader"
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import { getSeasonalAnime, getCurrentSeason } from "@/lib/api"
import { Sparkle, CalendarBlank } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Anime Musim Ini - KaiAnimeList",
  description: "Anime yang sedang tayang musim ini"
}

export default function SeasonalPage() {
  const { year, season } = getCurrentSeason()
  
  // Capitalize season name
  const seasonName = season.charAt(0).toUpperCase() + season.slice(1)
  
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon)]/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
              <CalendarBlank weight="fill" className="text-[var(--maroon-strong)]" />
              <span>{seasonName} {year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-gradient glow-text">Anime Musim Ini</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/70">
              Temukan anime terbaru yang sedang tayang musim {seasonName.toLowerCase()} ini
            </p>
          </div>
        </div>
      </section>

      {/* Anime Grid */}
      <section className="container mx-auto px-4 pb-16">
        <Suspense fallback={<AnimeGridSkeleton count={20} />}>
          <SeasonalAnimeList />
        </Suspense>
      </section>
    </main>
  )
}

async function SeasonalAnimeList() {
  const animes = await getSeasonalAnime(24)
  
  if (animes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">Tidak ada anime yang sedang tayang</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/60">
          Menampilkan {animes.length} anime
        </p>
      </div>
      <AnimeGrid animes={animes} />
    </div>
  )
}