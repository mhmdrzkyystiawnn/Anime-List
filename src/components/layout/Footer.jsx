// src/components/layout/Footer.jsx
import Link from "next/link"
import { Fire, GithubLogo, Heart } from "@phosphor-icons/react/dist/ssr"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Fire weight="fill" className="text-[var(--maroon-strong)] w-8 h-8" />
              <span className="text-xl font-bold text-gradient">KaiAnimeList</span>
            </div>
            <p className="text-white/60 text-sm">
              Platform untuk menemukan dan menjelajahi ribuan anime dari berbagai genre
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Jelajahi</h3>
            <div className="space-y-2">
              <FooterLink href="/">Beranda</FooterLink>
              <FooterLink href="/populer">Anime Populer</FooterLink>
              <FooterLink href="/search/naruto">Cari Anime</FooterLink>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Info</h3>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">
                Data dari{" "}
                <a
                  href="https://jikan.moe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--maroon-strong)] hover:underline"
                >
                  Jikan API
                </a>
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <GithubLogo weight="fill" size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} KaiAnimeList. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-white/60 text-sm">
            Made with <Heart weight="fill" className="text-red-500" /> by Kaicoder
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block text-white/60 hover:text-white transition-colors text-sm"
    >
      {children}
    </Link>
  )
}