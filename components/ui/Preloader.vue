<script setup lang="ts">
import { gsap } from 'gsap'

const show = ref(true)
const count = ref(0)
const root = ref<HTMLElement | null>(null)
const word = ['S', 'T', 'Y', 'L', 'I', 'S', 'H']

onMounted(() => {
  // reduced-motion: no intro, reveal instantly
  if (!motionOK()) {
    show.value = false
    return
  }
  const c = { v: 0 }
  const tl = gsap.timeline({ onComplete: () => (show.value = false) })
  tl.from('.pl-letter', { yPercent: 120, stagger: 0.05, duration: 0.7, ease: 'power4.out' })
    .to(
      c,
      { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => (count.value = Math.round(c.v)) },
      0,
    )
    .to('.pl-letter', { yPercent: -120, stagger: 0.04, duration: 0.6, ease: 'power3.in' }, '+=0.15')
    .to(root.value, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2')
})
</script>

<template>
  <div
    v-if="show"
    ref="root"
    class="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
    aria-hidden="true"
  >
    <div class="overflow-hidden">
      <h2
        class="flex font-display font-semibold leading-none tracking-tightest text-paper"
        style="font-size: clamp(3rem, 12vw, 9rem)"
      >
        <span v-for="(l, i) in word" :key="i" class="pl-letter inline-block">{{ l }}</span>
      </h2>
    </div>
    <div class="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-paper/60 tabular-nums">
      {{ count }}%
    </div>
  </div>
</template>
