import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Registers a pinned "scene" (desktop-only, motion-allowed-only).
 * Handles the shared boilerplate: matchMedia gate, gsap.context cleanup,
 * anticipatePin/invalidateOnRefresh defaults.
 *
 * `build` receives the gsap timeline already wired to a pin+scrub
 * ScrollTrigger on `root`; add scene tweens to it with position params.
 * Returns nothing on mobile/reduced-motion — content must be laid out
 * visible by default.
 */
export function useScene(
  root: Ref<HTMLElement | null>,
  build: (tl: gsap.core.Timeline) => void,
  opts: { length?: string; scrub?: number; pinSpacing?: boolean } = {},
) {
  let ctx: gsap.Context | undefined
  let mm: gsap.MatchMedia | undefined

  onMounted(async () => {
    if (!motionOK() || !root.value) return
    // components often toggle their scene layout with a mounted flag;
    // wait for that re-render so selectors inside `build` can find targets
    await nextTick()
    gsap.registerPlugin(ScrollTrigger)
    mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const scope = root.value as HTMLElement
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.value,
            start: 'top top',
            end: opts.length ?? '+=150%',
            pin: true,
            pinSpacing: opts.pinSpacing ?? true,
            scrub: opts.scrub ?? 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        build(tl)
      }, scope)
      return () => ctx?.revert()
    })
  })

  onBeforeUnmount(() => {
    mm?.revert()
  })
}
