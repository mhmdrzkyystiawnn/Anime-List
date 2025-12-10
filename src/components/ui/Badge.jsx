export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "glass",
    primary: "bg-[var(--maroon)] text-white",
    success: "bg-green-500/20 text-green-300 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
  }

  return (
    <span className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
