"use client"

// src/components/layout/Navbar.jsx
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { MagnifyingGlass, List, X, Fire } from "@phosphor-icons/react"
import SearchBar from "./SearchBar"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl group"
          >
            <Fire
              weight="fill"
              className="text-[var(--maroon-strong)] w-6 h-6 md:w-8 md:h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="text-gradient">KyyAnimeList</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" pathname={pathname}>
              Beranda
            </NavLink>
            <NavLink href="/populer" pathname={pathname}>
              Populer
            </NavLink>
            <NavLink href="/seasonal" pathname={pathname}>
              Musim Ini
            </NavLink>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 glass rounded-lg px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <MagnifyingGlass weight="bold" />
              <span className="text-sm">Search</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="glass rounded-lg p-2 text-white/80 hover:text-white transition-colors"
            >
              <MagnifyingGlass size={24} weight="bold" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass rounded-lg p-2 text-white/80 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <MobileNavLink
              href="/"
              pathname={pathname}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </MobileNavLink>
            <MobileNavLink
              href="/populer"
              pathname={pathname}
              onClick={() => setIsMenuOpen(false)}
            >
              Populer
            </MobileNavLink>
            <MobileNavLink
              href="/seasonal"
              pathname={pathname}
              onClick={() => setIsMenuOpen(false)}
            >
              Musim Ini
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

function NavLink({ href, children, pathname }) {
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        "relative font-medium transition-colors",
        "text-white/70 hover:text-white",
        "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--maroon-strong)] after:transition-all after:duration-300",
        "hover:after:w-full",
        isActive && "text-white after:w-full"
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, pathname, onClick }) {
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block rounded-lg px-4 py-3 transition-colors",
        isActive
          ? "glass bg-white/15 text-white"
          : "glass hover:bg-white/10 text-white/80"
      )}
    >
      {children}
    </Link>
  )
}