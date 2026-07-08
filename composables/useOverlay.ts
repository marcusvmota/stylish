/**
 * Shared behavior for modal-like overlays (case modal, mobile menu):
 * - Esc closes
 * - scroll lock (stops Lenis + locks body) while open
 * - focus trap inside the container, restoring focus on close
 *
 * Pass the open ref, a ref to the overlay container, and a close callback.
 */
export function useOverlay(
  isOpen: Ref<boolean>,
  container: Ref<HTMLElement | null>,
  close: () => void,
) {
  let lastFocused: HTMLElement | null = null

  const focusable = () =>
    Array.from(
      container.value?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      ) || [],
    )

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close()
      return
    }
    if (e.key === 'Tab') {
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  watch(isOpen, (open) => {
    if (open) {
      lastFocused = document.activeElement as HTMLElement
      getLenis()?.stop()
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKey)
      nextTick(() => focusable()[0]?.focus())
    } else {
      getLenis()?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      lastFocused?.focus?.()
    }
  })

  onBeforeUnmount(() => {
    getLenis()?.start()
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKey)
  })
}
