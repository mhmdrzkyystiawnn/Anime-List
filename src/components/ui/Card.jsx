// src/components/ui/Card.jsx
export function Card({ children, className = "", hover = false }) {
  return (
    <div className={`glass rounded-xl overflow-hidden ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  )
}