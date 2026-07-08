<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const year = new Date().getFullYear()
const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context

let io: IntersectionObserver | null = null

onMounted(() => {
  if (!motionOK()) return
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    // giant wordmark drifts horizontally as you scroll the footer into view
    gsap.fromTo(
      '.footer-mark',
      { xPercent: -8 },
      {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom bottom', scrub: true },
      },
    )
  }, root.value!)

  // film credits fade up in sequence when they enter the view
  const items = root.value!.querySelectorAll('.footer-credit')
  gsap.set(items, { opacity: 0, y: 26 })
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      gsap.to(items, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.18 })
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  io.observe(root.value!)
})

onBeforeUnmount(() => {
  io?.disconnect()
  ctx?.revert()
})
const socials = [
  { label: 'Instagram', href: 'https://instagram.com/jonatassantiagos' },
  { label: 'WhatsApp', href: 'https://wa.me/5583989120922' },
  { label: 'Studio', href: 'https://instagram.com/studiojonatassantiago' },
]

const credits = [
  { role: 'Direção criativa', name: 'Jonatas Santiago' },
  { role: 'Naming · ID Visual · Branding', name: 'Studio Jonatas Santiago' },
  { role: 'Uma produção', name: 'STYLISH' },
]
</script>

<template>
  <footer ref="root" class="relative overflow-hidden bg-ink px-6 pb-12 pt-20 md:px-10">
    <!-- giant wordmark -->
    <div class="pointer-events-none select-none overflow-hidden border-b border-paper/10 pb-8">
      <div
        class="footer-mark whitespace-nowrap font-display font-semibold leading-none tracking-tightest text-paper"
        style="font-size: clamp(3.5rem, 21vw, 18rem)"
      >
        STYLISH
      </div>
    </div>

    <!-- film credits -->
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-5 pt-12 text-center sm:grid-cols-3">
      <div v-for="c in credits" :key="c.role" class="footer-credit">
        <div class="text-[10px] uppercase tracking-[0.3em] text-paper/50">{{ c.role }}</div>
        <div class="mt-1 font-display text-lg font-light text-paper">{{ c.name }}</div>
      </div>
    </div>

    <div
      class="mx-auto flex max-w-7xl flex-col gap-8 pt-12 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div class="font-display text-lg text-paper">Jonatas Santiago®</div>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-paper/60">
          Estrategista de Marcas · Branding
        </p>
      </div>

      <nav class="flex flex-wrap gap-6">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="group relative text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-paper"
          data-cursor=""
        >
          {{ s.label }}
          <span
            class="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full"
          />
        </a>
      </nav>
    </div>

    <div
      class="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-paper/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-paper/30 md:flex-row md:justify-between"
    >
      <span>© {{ year }} — Todos os direitos reservados</span>
      <span>Feito com estilo, propósito e estratégia.</span>
    </div>
  </footer>
</template>
