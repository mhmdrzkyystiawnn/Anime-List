// src/components/layout/HeroSection.jsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { MagnifyingGlass, TrendUp, Fire, Sparkle } from "@phosphor-icons/react"

export default function HeroSection() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const trendingKeywords = ["Naruto", "One Piece", "Attack on Titan"]

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--maroon)]/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--maroon)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--maroon-strong)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm animate-fade-in">
            <Fire weight="fill" className="text-[var(--maroon-strong)] w-5 h-5" />
            <span className="font-medium">Temukan anime favoritmu</span>
            <Sparkle weight="fill" className="text-yellow-400 w-4 h-4" />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient glow-text inline-block">
                Jelajahi Dunia Anime
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Ribuan anime dari berbagai genre, rating terbaik, dan rekomendasi 
              <span className="text-[var(--maroon-strong)] font-semibold"> khusus untukmu</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <Link 
              href="/search/naruto"
              onMouseEnter={() => setIsSearchFocused(true)}
              onMouseLeave={() => setIsSearchFocused(false)}
              className={`glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 cursor-pointer group ${
                isSearchFocused ? "scale-105 shadow-2xl shadow-[var(--maroon-glow)]" : "hover:scale-[1.02]"
              }`}
            >
              <div className="flex-shrink-0">
                <MagnifyingGlass 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isSearchFocused ? "text-[var(--maroon-strong)]" : "text-white/60 group-hover:text-[var(--maroon-strong)]"
                  }`} 
                  weight="bold" 
                />
              </div>
              
              <span className="text-white/60 text-left flex-1">
                Cari anime... (contoh: Naruto, One Piece)
              </span>
              
              <div className="flex-shrink-0">
                <TrendUp 
                  className="w-5 h-5 text-[var(--maroon-strong)]" 
                  weight="bold" 
                />
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="text-sm text-white/50 font-medium">Populer:</span>
            {trendingKeywords.map((keyword, index) => (
              <Link
                key={keyword}
                href={`/search/${keyword.toLowerCase().replace(/ /g, "-")}`}
                className="glass rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {keyword}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
            <StatCard number="10K+" label="Anime" />
            <StatCard number="100+" label="Genre" />
            <StatCard number="1M+" label="Reviews" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, label }) {
  return (
    <div className="glass rounded-xl p-4 hover:bg-white/10 transition-colors">
      <div className="text-2xl md:text-3xl font-bold text-gradient">{number}</div>
      <div className="text-xs md:text-sm text-white/60 mt-1">{label}</div>
    </div>
  )
}