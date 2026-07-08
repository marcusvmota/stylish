<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    parallax?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    // grayscale is just an effect — reveal original color on group hover
    colorOnHover?: boolean
  }>(),
  { alt: '', parallax: 12, direction: 'up', colorOnHover: false },
)

const root = ref<HTMLElement | null>(null)
const img = ref<HTMLElement | null>(null)
const loaded = ref(false)
let ctx: gsap.Context

onMounted(() => {
  // cached images may have loaded before @load bound
  const el = root.value?.querySelector('img') as HTMLImageElement | null
  if (el?.complete) loaded.value = true
})

const fromClip: Record<string, string> = {
  up: 'inset(100% 0 0 0)',
  down: 'inset(0 0 100% 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

let io: IntersectionObserver | null = null

onMounted(() => {
  if (!motionOK()) return // reduced-motion: image fully visible, no clip reveal / parallax
  gsap.registerPlugin(ScrollTrigger)

  // Reveal via IntersectionObserver — robust against pinned scenes changing
  // the page height after mount (ScrollTrigger positions would go stale).
  gsap.set(root.value, { clipPath: fromClip[props.direction] })
  gsap.set(img.value, { scale: 1.3 })
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      gsap.to(root.value, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' })
      gsap.to(img.value, { scale: 1, duration: 1.6, ease: 'power3.out' })
    },
    { rootMargin: '0px 0px -15% 0px' },
  )
  io.observe(root.value!)

  ctx = gsap.context(() => {
    // Subtle parallax on the inner image
    if (props.parallax) {
      gsap.fromTo(
        img.value,
        { yPercent: -props.parallax },
        {
          yPercent: props.parallax,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }
  }, root.value!)
})

onBeforeUnmount(() => {
  io?.disconnect()
  ctx?.revert()
})
</script>

<template>
  <div ref="root" class="relative overflow-hidden bg-[#141414]">
    <div ref="img" class="h-[120%] w-full -translate-y-[8%]">
      <img
        :src="src"
        :alt="alt"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover grayscale [transition:opacity_.7s_ease,filter_.7s_ease]"
        :class="[
          loaded ? 'opacity-100' : 'opacity-0',
          colorOnHover ? 'group-hover:grayscale-0' : '',
        ]"
        @load="loaded = true"
      />
    </div>
  </div>
</template>
