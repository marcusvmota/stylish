<script setup lang="ts">
import { gsap } from 'gsap'

const wa = 'https://wa.me/5583989120922'
const root = ref<HTMLElement | null>(null)
const word = ['S', 'T', 'Y', 'L', 'I', 'S', 'H', '?']
let io: IntersectionObserver | null = null

// Finale plays once, centered on screen, when the section enters view.
// No pin: pinning here caused the assembly to happen half-offscreen and left
// a long black gap after it.
onMounted(() => {
  if (!motionOK()) return
  const letters = root.value!.querySelectorAll('.cta-letter')
  const lead = root.value!.querySelector('.cta-lead')
  const actions = root.value!.querySelector('.cta-actions')
  gsap.set(lead, { opacity: 0, y: 30 })
  gsap.set(letters, { yPercent: 120, opacity: 0, rotateX: -40 })
  gsap.set(actions, { opacity: 0, y: 40 })

  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      gsap
        .timeline()
        .to(lead, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(
          letters,
          { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out' },
          0.2,
        )
        .to(actions, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.1)
    },
    { rootMargin: '0px 0px -35% 0px' },
  )
  io.observe(root.value!)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section
    id="contato"
    ref="root"
    class="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center"
  >
    <UiSpotlight />

    <div class="relative z-10 flex flex-col items-center">
      <h2 class="cta-lead font-display text-2xl font-light italic text-paper/80 md:text-4xl">
        Vamos criar algo
      </h2>

      <div
        class="mt-2 flex select-none justify-center font-display font-semibold leading-[0.95] tracking-tightest text-paper"
        style="font-size: clamp(3.5rem, 14vw, 13rem); perspective: 600px"
        aria-label="Stylish?"
      >
        <span
          v-for="(l, i) in word"
          :key="i"
          aria-hidden="true"
          class="cta-letter inline-block will-change-transform"
          >{{ l }}</span
        >
      </div>

      <div class="cta-actions mt-14 flex flex-col items-center">
        <p class="mb-10 max-w-xl text-base font-light text-paper/70 md:text-lg">
          Sua marca merece estilo, propósito e estratégia. Me chama no WhatsApp e vamos dar vida a
          ela.
        </p>

        <UiMagneticButton :href="wa" :strength="0.5">
          <span
            class="group relative inline-flex items-center gap-4 rounded-full border border-paper px-10 py-5 text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
            data-cursor="vamos"
          >
            Iniciar projeto
            <span class="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </UiMagneticButton>

        <a
          :href="wa"
          class="mt-8 text-xs uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
          data-cursor=""
        >
          wa.me/5583989120922
        </a>
      </div>
    </div>
  </section>
</template>
