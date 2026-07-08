/**
 * Single source of truth for "is motion allowed?".
 * Respects prefers-reduced-motion. Call motionOK() inside client-only code
 * (onMounted / event handlers) — it reads matchMedia, so it's false on the
 * server and true only when the user hasn't asked to reduce motion.
 */
export function motionOK(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
