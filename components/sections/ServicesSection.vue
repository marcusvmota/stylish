<script setup lang="ts">
import { gsap } from 'gsap'

const services = [
  {
    n: '01',
    title: 'Naming',
    desc: 'O nome certo é o primeiro ato de estratégia. Criação de nomes com significado, sonoridade e território próprio.',
    img: '/img/services/naming.jpg',
  },
  {
    n: '02',
    title: 'Identidade Visual',
    desc: 'Sistemas visuais autênticos: logo, tipografia, cor e direção de arte que traduzem a essência da marca.',
    img: '/img/services/idvisual.jpg',
  },
  {
    n: '03',
    title: 'Branding',
    desc: 'Posicionamento, propósito e experiência. A construção completa de marcas de alto padrão — Stylishs.',
    img: '/img/services/branding.jpg',
  },
]

const root = ref<HTMLElement | null>(null)
const sceneActive = ref(false)
onMounted(() => {
  sceneActive.value = motionOK() && window.matchMedia('(min-width: 768px)').matches
})

// Scene cuts: panels stacked on top of each other; each next panel slides up
// over the previous one as the scroll advances (vertical film cut).
useScene(
  root,
  (tl) => {
    const panels = gsap.utils.toArray<HTMLElement>('.sv-panel')
    panels.forEach((el, i) => {
      if (i === 0) return
      tl.fromTo(
        el,
        { yPercent: 100 },
        { yPercent: 0, ease: 'power2.inOut', duration: 1 },
        (i - 1) * 1.15,
      )
      // subtle push-back of the covered panel
      tl.to(
        panels[i - 1],
        { scale: 0.94, opacity: 0.55, ease: 'power2.inOut', duration: 1 },
        (i - 1) * 1.15,
      )
    })
  },
  { length: '+=250%', scrub: 0.7 },
)
</script>

<template>
  <section id="servicos" ref="root" class="relative bg-ink">
    <!-- Desktop scene: stacked full-screen panels. Mobile: normal stacked flow. -->
    <div class="relative" :class="sceneActive ? 'md:h-[100svh] md:overflow-hidden' : ''">
      <div
        v-for="(s, i) in services"
        :key="i"
        class="sv-panel relative flex min-h-[70svh] items-center border-t border-paper/10 bg-ink px-6 py-16"
        :class="sceneActive ? 'md:absolute md:inset-0 md:min-h-0 md:border-0 md:px-10 md:py-0' : 'md:px-10'"
        :style="sceneActive ? { zIndex: i + 1 } : {}"
      >
        <div class="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12">
          <!-- text -->
          <div class="md:col-span-7">
            <span class="font-display text-lg text-paper/60">{{ s.n }}</span>
            <h3
              class="mt-4 font-display font-light leading-[0.95] tracking-tight text-paper"
              style="font-size: clamp(3rem, 8.5vw, 8.5rem)"
            >
              {{ s.title }}
            </h3>
            <p class="mt-8 max-w-md text-base font-light leading-relaxed text-paper/70">
              {{ s.desc }}
            </p>
          </div>

          <!-- image (shown on mobile too) -->
          <div class="md:col-span-5">
            <div class="mt-8 aspect-[3/4] w-full max-w-xs overflow-hidden md:mt-0 md:max-w-sm md:justify-self-end">
              <img
                :src="s.img"
                :alt="`${s.title} — serviço de ${s.title.toLowerCase()} por Jonatas Santiago`"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </div>

        <!-- section label (first panel only) -->
        <div
          v-if="i === 0"
          class="pointer-events-none absolute left-6 top-8 text-[11px] uppercase tracking-[0.3em] text-paper/60 md:left-10 md:top-10"
        >
          Serviços — do nome ao universo da marca
        </div>
      </div>
    </div>
  </section>
</template>
