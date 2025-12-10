// src/app/seasonal/loading.jsx
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"

export default function SeasonalLoading() {
  return (
    <main className="min-h-screen">
      {/* Header Skeleton */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-block glass rounded-full px-4 py-2">
              <div className="h-5 w-24 skeleton rounded" />
            </div>
            <div className="h-12 md:h-16 skeleton rounded-xl max-w-md mx-auto" />
            <div className="h-6 skeleton rounded-lg max-w-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="container mx-auto px-4 pb-16">
        <AnimeGridSkeleton count={20} />
      </section>
    </main>
  )
}