// src/app/error.jsx
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { 
  WarningCircle, 
  ArrowCounterClockwise, 
  House,
  Bug 
} from "@phosphor-icons/react"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console in development
    console.error("Error boundary caught:", error)
  }, [error])

  const errorMessage = error?.message || "Terjadi kesalahan yang tidak terduga"
  const isNetworkError = errorMessage.includes("fetch") || errorMessage.includes("network")
  const isNotFound = errorMessage.includes("404") || errorMessage.includes("not found")

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="p-8 md:p-12 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--maroon)]/20 rounded-full blur-2xl" />
              <div className="relative glass rounded-full p-6">
                <WarningCircle 
                  weight="fill" 
                  className="w-16 h-16 md:w-20 md:h-20 text-[var(--maroon-strong)]" 
                />
              </div>
            </div>
          </div>

          {/* Error Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient">
              {isNotFound ? "Halaman Tidak Ditemukan" : "Oops! Ada Masalah"}
            </h1>
            <p className="text-white/70 text-lg">
              {isNetworkError 
                ? "Gagal terhubung ke server. Periksa koneksi internet kamu."
                : isNotFound
                ? "Halaman yang kamu cari tidak ditemukan."
                : "Terjadi kesalahan saat memuat halaman ini."}
            </p>
          </div>

          {/* Error Details (Only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="glass rounded-lg p-4 text-left">
              <div className="flex items-start gap-2 text-sm">
                <Bug className="w-5 h-5 text-[var(--maroon-strong)] flex-shrink-0 mt-0.5" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-[var(--maroon-strong)] mb-1">
                    Debug Info:
                  </p>
                  <p className="text-white/60 font-mono text-xs break-all">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="primary"
              onClick={reset}
              className="flex items-center justify-center gap-2"
            >
              <ArrowCounterClockwise weight="bold" className="w-5 h-5" />
              Coba Lagi
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => window.location.href = "/"}
              className="flex items-center justify-center gap-2"
            >
              <House weight="fill" className="w-5 h-5" />
              Kembali ke Beranda
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-white/50 pt-4">
            Jika masalah terus berlanjut, silakan{" "}
            <button 
              onClick={() => window.location.reload()}
              className="text-[var(--maroon-strong)] hover:underline"
            >
              refresh halaman
            </button>
            {" "}atau hubungi support.
          </p>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
            <span className="text-white/60">Error Code:</span>
            <span className="font-mono text-[var(--maroon-strong)] font-semibold">
              {isNotFound ? "404" : isNetworkError ? "NET_ERR" : "500"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}