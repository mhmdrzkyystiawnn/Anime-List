import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { getAnimeFullById, getAnimeRecommendations } from "@/lib/api"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import AnimeGrid from "@/components/anime/AnimeGrid"
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import { 
  Star, 
  Television, 
  CalendarBlank, 
  Clock,
  Users,
  Tag
} from "@phosphor-icons/react/dist/ssr"
import { formatNumber, truncate } from "@/lib/utils"

export async function generateMetadata({ params }) {
  const resolvedParams = await params // 👈 AWAIT params
  const anime = await getAnimeFullById(resolvedParams.id)
  return {
    title: `${anime.title} - KaiAnimeList`,
    description: truncate(anime.synopsis, 160)
  }
}

export default async function AnimeDetailPage({ params }) {
  const resolvedParams = await params // 👈 AWAIT params
  const anime = await getAnimeFullById(resolvedParams.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            className="object-cover blur-2xl opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0509] via-[#0f0509]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex items-end h-full pb-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
              {/* Poster */}
              <div className="flex-shrink-0">
                <Card hover className="w-48 md:w-64">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    width={256}
                    height={384}
                    className="w-full h-auto"
                    priority
                  />
                </Card>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-2">
                    {anime.title}
                  </h1>
                  {anime.title_english && anime.title_english !== anime.title && (
                    <p className="text-white/60 text-lg">{anime.title_english}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {anime.score && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      <Star weight="fill" className="w-4 h-4" />
                      {anime.score} / 10
                    </Badge>
                  )}
                  {anime.type && <Badge>{anime.type}</Badge>}
                  {anime.status && <Badge variant="success">{anime.status}</Badge>}
                  {anime.year && <Badge>{anime.year}</Badge>}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/80">
                  {anime.episodes && (
                    <div className="flex items-center gap-2">
                      <Television weight="fill" className="text-[var(--maroon-strong)]" />
                      <span>{anime.episodes} Episodes</span>
                    </div>
                  )}
                  {anime.duration && (
                    <div className="flex items-center gap-2">
                      <Clock weight="fill" className="text-[var(--maroon-strong)]" />
                      <span>{anime.duration}</span>
                    </div>
                  )}
                  {anime.members && (
                    <div className="flex items-center gap-2">
                      <Users weight="fill" className="text-[var(--maroon-strong)]" />
                      <span>{formatNumber(anime.members)} Members</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Synopsis</h2>
              <p className="text-white/70 leading-relaxed">
                {anime.synopsis || "No synopsis available."}
              </p>
            </Card>

            {/* Background */}
            {anime.background && (
              <Card className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Background</h2>
                <p className="text-white/70 leading-relaxed">{anime.background}</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Information</h3>
              
              <InfoRow label="Type" value={anime.type} />
              <InfoRow label="Episodes" value={anime.episodes || "Unknown"} />
              <InfoRow label="Status" value={anime.status} />
              <InfoRow label="Aired" value={anime.aired?.string || "Unknown"} />
              <InfoRow label="Season" value={anime.season ? `${anime.season} ${anime.year}` : "Unknown"} />
              <InfoRow label="Duration" value={anime.duration} />
              <InfoRow label="Rating" value={anime.rating} />
              <InfoRow label="Source" value={anime.source} />
              
              {anime.studios?.length > 0 && (
                <InfoRow 
                  label="Studios" 
                  value={anime.studios.map(s => s.name).join(", ")} 
                />
              )}
            </Card>

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Tag weight="fill" className="text-[var(--maroon-strong)]" />
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Badge key={genre.mal_id}>{genre.name}</Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient">
            Rekomendasi
          </h2>
          <Suspense fallback={<AnimeGridSkeleton count={6} />}>
            <RecommendationsList id={resolvedParams.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between text-sm border-b border-white/10 pb-2">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  )
}

async function RecommendationsList({ id }) {
  const recommendations = await getAnimeRecommendations(id)
  const animes = recommendations.map(r => r.entry)
  
  if (animes.length === 0) {
    return <p className="text-white/60">Tidak ada rekomendasi tersedia</p>
  }
  
  return <AnimeGrid animes={animes} />
}