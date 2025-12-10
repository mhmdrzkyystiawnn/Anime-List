// src/components/anime/AnimeGrid.jsx
import AnimeCard from "./AnimeCard"

export default function AnimeGrid({ animes }) {
  if (!animes || animes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">Tidak ada anime yang ditemukan</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  )
}