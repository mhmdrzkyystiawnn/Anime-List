export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full glass rounded-xl px-4 py-3 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--maroon)] transition-all placeholder:text-white/40 ${className}`}
      {...props}
    />
  )
}
