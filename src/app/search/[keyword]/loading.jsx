// src/app/search/[keyword]/loading.jsx
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import Skeleton from "@/components/ui/Skeleton"
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

export default function SearchLoading() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="glass rounded-full p-3">
              <MagnifyingGlass size={32} weight="bold" className="text-[var(--maroon-strong)]" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-6 w-80" />
            </div>
          </div>
        </div>

        <AnimeGridSkeleton count={16} />
      </div>
    </div>
  )
}