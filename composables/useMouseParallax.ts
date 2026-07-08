import { gsap } from 'gsap'

type Setter = (v: number) => void

/**
 * Mouse-driven parallax. Any descendant of `root` carrying a
 * `data-depth="0.2"` attribute drifts with the cursor — higher depth = more
 * movement. `amplitude` is the max px travel at depth 1.
 *
 * Usage:
 *   const root = ref<HTMLElement | null>(null)
 *   useMouseParallax(root, { amplitude: 40 })
 *   <div ref="root"> <img data-depth="0.3" /> ... </div>
 */
export function useMouseParallax(
  root: Ref<HTMLElement | null>,
  opts: { amplitude?: number; useWindow?: boolean } = {},
) {
  const amplitude = opts.amplitude ?? 30
  const setters: { x: Setter; y: Setter; depth: number }[] = []
  let target: HTMLElement | Window | null = null

  function onMove(e: MouseEvent) {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2 // -1 .. 1
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    for (const s of setters) {
      s.x(-nx * amplitude * s.depth)
      s.y(-ny * amplitude * s.depth)
    }
  }

  onMounted(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (!motionOK()) return // respect prefers-reduced-motion
    if (!root.value) return
    const nodes = root.value.querySelectorAll<HTMLElement>('[data-depth]')
    nodes.forEach((el) => {
      setters.push({
        depth: parseFloat(el.dataset.depth || '0') || 0,
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
      })
    })
    target = opts.useWindow ? window : root.value
    target.addEventListener('mousemove', onMove as EventListener)
  })

  onBeforeUnmount(() => {
    target?.removeEventListener('mousemove', onMove as EventListener)
  })
}
