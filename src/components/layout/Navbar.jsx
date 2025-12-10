"use client"

// src/components/layout/Navbar.jsx
import Link from "next/link"
import { useState } from "react"
import { MagnifyingGlass, List, X, Fire } from "@phosphor-icons/react"
import SearchBar from "./SearchBar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl group">
            <Fire weight="fill" className="text-[var(--maroon-strong)] w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
            <span className="text-gradient">KaiAnime</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/populer">Populer</NavLink>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 glass rounded-lg px-4 py-2 hover:bg-white/10 transition-colors"
            >
              <MagnifyingGlass weight="bold" />
              <span className="text-sm">Search</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="glass rounded-lg p-2"
            >
              <MagnifyingGlass size={24} weight="bold" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass rounded-lg p-2"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Beranda
            </MobileNavLink>
            <MobileNavLink href="/populer" onClick={() => setIsMenuOpen(false)}>
              Populer
            </MobileNavLink>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white font-medium transition-colors"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block glass rounded-lg px-4 py-3 hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  )
}