<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(
  defineProps<{
    duration?: number
    reverse?: boolean
    repeat?: number
  }>(),
  { duration: 28, reverse: false, repeat: 4 },
)

const track = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween | null = null
let tickerFn: ((t: number) => void) | null = null

onMounted(() => {
  if (!track.value) return
  if (!motionOK()) return // reduced-motion: keep marquee static
  const base = props.reverse ? -1 : 1

  // continuous loop: two identical halves -> -50% wraps seamlessly
  tween = gsap.to(track.value, {
    xPercent: -50,
    duration: props.duration,
    ease: 'none',
    repeat: -1,
  })
  tween.timeScale(base)

  // react to Lenis scroll velocity: speed up, flip direction, and skew
  let skew = 0
  tickerFn = () => {
    const v = getScrollVelocity()
    // direction follows scroll when moving, idle drifts in base direction
    const boost = gsap.utils.clamp(0, 4, Math.abs(v) / 25)
    const dir = Math.abs(v) > 1 ? Math.sign(v) * base : base
    const targetTs = dir * (1 + boost)
    tween!.timeScale(gsap.utils.interpolate(tween!.timeScale(), targetTs, 0.08))
    // skew toward scroll velocity for that elastic, premium feel
    const targetSkew = gsap.utils.clamp(-10, 10, v * 0.35)
    skew += (targetSkew - skew) * 0.1
    gsap.set(track.value, { skewX: skew })
  }
  gsap.ticker.add(tickerFn)
})

onBeforeUnmount(() => {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  tween?.kill()
})
</script>

<template>
  <div class="relative flex w-full overflow-hidden">
    <div ref="track" class="flex shrink-0 will-change-transform">
      <div class="flex shrink-0 items-center">
        <div v-for="i in repeat" :key="`a-${i}`" class="flex shrink-0 items-center">
          <slot />
        </div>
      </div>
      <div class="flex shrink-0 items-center" aria-hidden="true">
        <div v-for="i in repeat" :key="`b-${i}`" class="flex shrink-0 items-center">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
