<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    stagger?: number
    start?: string
  }>(),
  { as: 'p', stagger: 0.04, start: 'top 85%' },
)

const root = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!motionOK()) return // reduced-motion: text already visible, no reveal
  const targets = root.value?.querySelectorAll('.reveal-word-inner')
  if (!targets || !targets.length) return
  // IntersectionObserver instead of a one-shot ScrollTrigger: pinned scenes
  // change the page height after mount and stale trigger positions never fire.
  gsap.set(targets, { yPercent: 110 })
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      gsap.to(targets, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: props.stagger,
      })
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  io.observe(root.value!)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <component :is="as" ref="root">
    <span
      v-for="(w, i) in words"
      :key="i"
      class="inline-block overflow-hidden align-bottom"
    >
      <span class="reveal-word-inner inline-block">{{ w }}</span>
      <span class="inline-block">&nbsp;</span>
    </span>
  </component>
</template>
