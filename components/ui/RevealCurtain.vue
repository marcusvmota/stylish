<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = withDefaults(
  defineProps<{
    zoom?: boolean
    round?: boolean
  }>(),
  { zoom: true, round: false },
)

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  if (!motionOK()) return // reduced-motion: section visible, no curtain/zoom
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    const fromRadius = props.round ? ' round 32px' : ''
    gsap.fromTo(
      root.value,
      {
        clipPath: `inset(20% 9% 0% 9%${fromRadius})`,
        ...(props.zoom ? { scale: 1.14 } : {}),
      },
      {
        clipPath: `inset(0% 0% 0% 0%${props.round ? ' round 0px' : ''})`,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top bottom',
          end: 'top 55%',
          scrub: true,
        },
      },
    )
  }, root.value!)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="will-change-transform">
    <slot />
  </div>
</template>
