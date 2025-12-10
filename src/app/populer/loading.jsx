// src/app/populer/loading.jsx
import { AnimeGridSkeleton } from "@/components/ui/Skeleton"
import Skeleton from "@/components/ui/Skeleton"
import { Fire } from "@phosphor-icons/react/dist/ssr"

export default function PopularLoading() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="glass rounded-full p-3">
              <Fire size={32} weight="fill" className="text-[var(--maroon-strong)]" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-10 w-80 mb-2" />
              <Skeleton className="h-6 w-96" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-20 w-48" />
            <Skeleton className="h-20 w-48" />
          </div>
        </div>

        <AnimeGridSkeleton count={24} />
      </div>
    </div>
  )
}