// src/lib/utils.js

/**
 * Format number with K/M suffix
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Truncate text
 */
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Get season name
 */
export function getCurrentSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 1 && month <= 3) return 'winter'
  if (month >= 4 && month <= 6) return 'spring'
  if (month >= 7 && month <= 9) return 'summer'
  return 'fall'
}

/**
 * Format date
 */
export function formatDate(dateString) {
  if (!dateString) return 'Unknown'
  
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('id-ID', options)
}

/**
 * Get score color
 */
export function getScoreColor(score) {
  if (score >= 8) return 'text-green-400'
  if (score >= 7) return 'text-blue-400'
  if (score >= 6) return 'text-yellow-400'
  return 'text-gray-400'
}

/**
 * Clean HTML
 */
export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}
