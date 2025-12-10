// src/app/populer/page.jsx
export const dynamic = "force-dynamic"
import { Suspense } from "react"
import { getTopAnime } from "@/lib/api"
import AnimeGrid from "@/components/anime/AnimeGrid"
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import { TrendUp, Fire } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Anime Populer - KaiAnimeList",
  description: "Daftar anime terpopuler dengan rating tertinggi"
}

export default function PopularPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="glass rounded-full p-3">
              <Fire size={32} weight="fill" className="text-[var(--maroon-strong)]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">
                Anime Paling Populer
              </h1>
              <p className="text-white/60 text-lg">
                Anime dengan rating tertinggi dan paling banyak ditonton
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <StatCard
              icon={<TrendUp weight="bold" />}
              label="Top Rated"
              value="Berdasarkan MyAnimeList"
            />
            <StatCard
              icon={<Fire weight="fill" />}
              label="Most Popular"
              value="Rating 8.0+"
            />
          </div>
        </div>

        {/* Anime Grid */}
        <Suspense fallback={<AnimeGridSkeleton count={24} />}>
          <PopularAnimeList />
        </Suspense>
      </div>
    </div>
  )
}

async function PopularAnimeList() {
  const animes = await getTopAnime(24)
  return <AnimeGrid animes={animes} />
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass rounded-xl p-4 flex items-center gap-3">
      <div className="text-[var(--maroon-strong)]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-white/60">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}