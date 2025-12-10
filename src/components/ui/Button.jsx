// src/components/ui/Button.jsx
export function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[var(--maroon)] hover:bg-[var(--maroon-strong)] text-white",
    secondary: "glass hover:bg-white/10",
    outline: "border-2 border-[var(--maroon)] text-[var(--maroon)] hover:bg-[var(--maroon)] hover:text-white"
  }

  return (
    <button
      className={`px-6 py-3 rounded-xl font-semibold transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}