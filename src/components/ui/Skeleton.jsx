// src/components/ui/Skeleton.jsx
export default function Skeleton({ className = "" }) {
  return (
    <div className={`skeleton rounded-lg ${className}`} />
  )
}

// Skeleton for anime card
export function AnimeCardSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

// Skeleton grid
export function AnimeGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  )
}