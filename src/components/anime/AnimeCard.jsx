// src/components/anime/AnimeCard.jsx
import Image from "next/image"
import Link from "next/link"
import { Star } from "@phosphor-icons/react/dist/ssr"

export default function AnimeCard({ anime }) {
  const {
    mal_id,
    title,
    images,
    score,
    type,
    episodes,
    year
  } = anime

  return (
    <Link 
      href={`/anime/${mal_id}`} 
      className="anime-card group block"
    >
      <div className="glass rounded-xl overflow-hidden card-hover">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
          <Image
            src={images.webp.image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={false}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Score Badge */}
          {score && (
            <div className="absolute top-3 right-3 glass rounded-lg px-2 py-1 flex items-center gap-1 backdrop-blur-md">
              <Star weight="fill" className="text-yellow-600 w-4 h-4" />
              <span className="text-sm font-bold text-yellow-400">{score}</span>
            </div>
          )}

          {/* Type Badge */}
          {type && (
            <div className="absolute top-3 left-3 glass rounded-lg px-2 py-1 text-xs font-semibold backdrop-blur-md">
              {type}
            </div>
          )}

          {/* Info on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-xs text-white/80">
              {episodes && <span>{episodes} eps</span>}
              {year && (
                <>
                  <span>•</span>
                  <span>{year}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="p-4">
          <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-[var(--maroon-strong)] transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}