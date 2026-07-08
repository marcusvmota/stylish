<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)

const lines = [
  'Atrás de uma marca existem sonhos, esforço e verdade.',
  'O que era improviso virou profissão. O que era vontade virou visão.',
  'Dar vida a marcas autênticas, com estilo, propósito e estratégia.',
]

let io: IntersectionObserver | null = null

onMounted(() => {
  // reduced-motion: lines already visible, no reveal
  if (!motionOK()) return
  const els = root.value?.querySelectorAll<HTMLElement>('.mf-line')
  if (!els?.length) return
  // Reveal on enter and STAY — readable at any scroll speed (no scrub, no pin).
  gsap.set(els, { opacity: 0, y: 40, filter: 'blur(10px)' })
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        io?.unobserve(e.target)
        gsap.to(e.target, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
        })
      })
    },
    { rootMargin: '0px 0px -22% 0px' },
  )
  els.forEach((el) => io!.observe(el))
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="manifesto" ref="root" class="relative overflow-hidden bg-ink">
    <!-- blurred portrait backdrop for depth / "something's here" cue -->
    <div class="pointer-events-none absolute inset-[-6%] opacity-20" aria-hidden="true">
      <img src="/image%203.png" alt="" class="h-full w-full object-cover blur-2xl grayscale" />
      <div class="absolute inset-0 bg-ink/50" />
    </div>

    <h2 class="sr-only">Manifesto</h2>

    <div class="relative mx-auto flex max-w-5xl flex-col gap-[26vh] px-6 py-[38vh] md:px-10">
      <p
        v-for="(l, i) in lines"
        :key="i"
        class="mf-line text-balance text-center font-display font-light leading-[1.12] tracking-tight text-paper"
        style="font-size: clamp(2rem, 5vw, 4.25rem)"
      >
        {{ l }}
      </p>
    </div>
  </section>
</template>
