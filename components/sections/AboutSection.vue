<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)

const stats = [
  { value: 10, suffix: '+', label: 'anos de estrada' },
  { value: 1000, suffix: '+', label: 'marcas criadas' },
  { value: 5, suffix: '+', label: 'países atendidos' },
]
const display = ref(stats.map(() => 0))

const facts = [
  'Formado em Comunicação — UFCG',
  'Design de moda e estilismo',
  'CEO do estúdio JONATASSANTIAGO',
  'Estrategista e especialista em ID Visual',
  'Empreende desde 2009',
  'Cristão · marido · pai da Sofia',
]

let io: IntersectionObserver | null = null

onMounted(() => {
  // reduced-motion: show final numbers immediately, no count-up
  if (!motionOK()) {
    stats.forEach((s, i) => (display.value[i] = s.value))
    return
  }
  // IO instead of one-shot ScrollTrigger: pin spacers added after mount would
  // leave the trigger position stale and the counters stuck at 0.
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      stats.forEach((s, i) => {
        const obj = { v: 0 }
        gsap.to(obj, {
          v: s.value,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => (display.value[i] = Math.round(obj.v)),
        })
      })
    },
    { rootMargin: '0px 0px -20% 0px' },
  )
  io.observe(root.value!)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="sobre" ref="root" class="relative bg-ink px-6 py-28 md:px-10 md:py-40">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <!-- Portrait -->
      <div class="lg:col-span-5">
        <UiMaskImage
          src="/image%202.jpg"
          alt="Retrato de Jonatas Santiago, o Stylish, o estiloso"
          class="aspect-[4/5] w-full"
          direction="up"
        />
        <p class="mt-4 text-[11px] uppercase tracking-[0.25em] text-paper/60">
          Jonatas Santiago — “Stylish, o estiloso”
        </p>
      </div>

      <!-- Content -->
      <div class="flex flex-col justify-center lg:col-span-7">
        <h2
          class="font-display text-4xl font-light leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl"
        >
          Ajudo pessoas e empresas a terem marcas autênticas,
          <span class="italic">Stylishs</span> e de alto padrão.
        </h2>

        <ul class="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <li
            v-for="(f, i) in facts"
            :key="i"
            class="flex items-start gap-3 text-sm font-light text-paper/70"
          >
            <span class="mt-2 h-px w-4 shrink-0 bg-paper/40" />
            {{ f }}
          </li>
        </ul>

        <!-- Stats -->
        <div class="mt-14 grid grid-cols-3 gap-4 border-t border-paper/10 pt-10">
          <div v-for="(s, i) in stats" :key="i">
            <div class="font-display text-4xl font-semibold text-paper md:text-6xl">
              {{ display[i] >= 1000 ? (display[i] / 1000).toFixed(0) + 'k' : display[i]
              }}<span class="text-paper/60">{{ s.suffix }}</span>
            </div>
            <div class="mt-2 text-[11px] uppercase tracking-[0.2em] text-paper/60">
              {{ s.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
