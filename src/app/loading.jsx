// src/app/loading.jsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="loading mx-auto" />
        <p className="text-white/60 text-sm">Memuat anime...</p>
      </div>
    </div>
  )
}