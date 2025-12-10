// src/app/anime/[id]/loading.jsx
import Skeleton from "@/components/ui/Skeleton"

export default function AnimeDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="h-[50vh] md:h-[60vh] bg-black/20">
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
            <Skeleton className="w-48 md:w-64 h-72 md:h-96" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    </div>
  )
}