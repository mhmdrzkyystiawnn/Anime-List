// src/app/page.jsx
import { Suspense } from "react"
import AnimeGrid from "@/components/anime/AnimeGrid"
import SectionHeader from "@/components/anime/SectionHeader"
import HeroSection from "@/components/layout/HeroSection"
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import { getTopAnime, getSeasonalAnime } from "@/lib/api"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Seasonal Anime */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader 
          title="Anime Musim Ini" 
          subtitle="Sedang tayang sekarang"
          linkHref="/seasonal"
          linkText="Lihat Semua"
        />
        <Suspense fallback={<AnimeGridSkeleton count={10} />}>
          <SeasonalAnimeList />
        </Suspense>
      </section>

      {/* Top Anime */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader 
          title="Paling Populer" 
          subtitle="Anime dengan rating tertinggi"
          linkHref="/populer"
        />
        <Suspense fallback={<AnimeGridSkeleton count={10} />}>
          <TopAnimeList />
        </Suspense>
      </section>
    </main>
  )
}

// Server Components for data fetching
async function TopAnimeList() {
  const animes = await getTopAnime(10)
  return <AnimeGrid animes={animes} />
}

async function SeasonalAnimeList() {
  const animes = await getSeasonalAnime(10)
  return <AnimeGrid animes={animes} />
}