<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const scenes = [
  { id: '#top', label: 'Abertura' },
  { id: '#manifesto', label: 'Manifesto' },
  { id: '#sobre', label: 'Quem sou' },
  { id: '#servicos', label: 'Serviços' },
  { id: '#portfolio', label: 'Portfólio' },
  { id: '#depoimentos', label: 'Depoimentos' },
  { id: '#contato', label: 'Contato' },
]

const current = ref(1)
const progress = ref(0)
const visible = ref(false)
const { scrollTo } = useSmoothScroll()

let progressTrigger: ScrollTrigger | null = null

function computeCurrent() {
  // chapter = last scene whose top crossed the viewport middle
  // (measured live, so pin spacers are accounted for)
  const mid = window.innerHeight / 2
  let idx = 1
  scenes.forEach((s, i) => {
    const el = document.querySelector(s.id)
    if (el && el.getBoundingClientRect().top <= mid) idx = i + 1
  })
  current.value = idx
}

onMounted(() => {
  if (!motionOK()) return
  if (!window.matchMedia('(min-width: 768px)').matches) return
  gsap.registerPlugin(ScrollTrigger)
  visible.value = true

  // page progress drives the vertical bar + chapter counter
  progressTrigger = ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      progress.value = self.progress
      computeCurrent()
    },
  })
})

onBeforeUnmount(() => {
  progressTrigger?.kill()
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed right-8 top-1/2 z-[140] hidden -translate-y-1/2 flex-col items-center gap-4 mix-blend-difference md:flex"
    aria-hidden="true"
  >
    <span class="font-display text-sm tabular-nums text-paper">
      {{ String(current).padStart(2, '0') }}
    </span>
    <div class="relative h-36 w-px overflow-hidden bg-paper/25">
      <div
        class="absolute left-0 top-0 w-full bg-paper transition-[height] duration-200 ease-out"
        :style="{ height: `${progress * 100}%` }"
      />
    </div>
    <span class="font-display text-sm tabular-nums text-paper/60">
      {{ String(scenes.length).padStart(2, '0') }}
    </span>

    <!-- dots -->
    <div class="mt-2 flex flex-col gap-2.5">
      <button
        v-for="(s, i) in scenes"
        :key="s.id"
        class="pointer-events-auto h-2 w-2 rounded-full transition-all duration-300"
        :class="current === i + 1 ? 'scale-125 bg-paper' : 'bg-paper/35 hover:bg-paper/70'"
        :aria-label="s.label"
        :data-cursor="s.label.toLowerCase()"
        @click="scrollTo(s.id)"
      />
    </div>
  </div>
</template>
