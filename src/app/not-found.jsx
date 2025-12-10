// src/app/not-found.jsx
import Link from "next/link"
import { Ghost, House } from "@phosphor-icons/react/dist/ssr"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="glass rounded-full p-8">
            <Ghost size={80} weight="duotone" className="text-[var(--maroon-strong)]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl font-bold">Halaman Tidak Ditemukan</h2>
          <p className="text-white/60">
            Sepertinya anime yang kamu cari sudah isekai ke dunia lain
          </p>
        </div>

        {/* Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 glass rounded-xl px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
        >
          <House weight="fill" />
          Kembali ke Homepage
        </Link>
      </div>
    </div>
  )
}