// src/app/layout.jsx
import { Gabarito } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const gabarito = Gabarito({ subsets: ["latin"] })

export const metadata = {
  title: "KaiAnimeList - Jelajahi Dunia Anime",
  description: "Temukan ribuan anime dari berbagai genre dengan rating terbaik",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={gabarito.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}