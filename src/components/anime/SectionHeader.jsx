// src/components/anime/SectionHeader.jsx
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

export default function SectionHeader({ 
  title, 
  subtitle, 
  linkHref, 
  linkText = "Lihat Semua" 
}) {
  return (
    <div className="flex items-end justify-between mb-6 md:mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gradient">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/60 text-sm md:text-base mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {linkHref && (
        <Link 
          href={linkHref}
          className="group flex items-center gap-2 text-sm md:text-base font-semibold text-[var(--maroon-strong)] hover:text-[var(--accent-strong)] transition-colors"
        >
          {linkText}
          <ArrowRight 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
            weight="bold"
          />
        </Link>
      )}
    </div>
  )
}