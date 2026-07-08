import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Call once on the root client component (app.vue) inside onMounted.
 */
export function useSmoothScroll() {
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Honor prefers-reduced-motion: no smooth scroll, native jump instead.
    if (!motionOK()) return

    lenis = new Lenis({
      // lerp gives that weighty, continuous glide of premium Lenis sites
      lerp: 0.075,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
      syncTouch: false,
    })

    // Drive Lenis from GSAP's ticker for a single, synced RAF loop.
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // re-measure pinned scenes once webfonts settle (layout heights change)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  })

  onBeforeUnmount(() => {
    lenis?.destroy()
    lenis = null
  })

  return {
    scrollTo: (target: string | number | HTMLElement, opts?: object) => {
      if (lenis) return lenis.scrollTo(target, opts)
      // reduced-motion / no Lenis: native jump
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView()
      } else if (typeof target === 'number') {
        window.scrollTo(0, target)
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView()
      }
    },
  }
}

export function getLenis() {
  return lenis
}

/** Current scroll velocity (px/frame-ish). Positive = down, negative = up. */
export function getScrollVelocity(): number {
  return (lenis as unknown as { velocity?: number })?.velocity ?? 0
}
