<script setup lang="ts">
import { gsap } from 'gsap'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const label = ref('')
const hovering = ref(false)
const down = ref(false)
const visible = ref(false)

let xTo: gsap.QuickToFunc, yTo: gsap.QuickToFunc
let rxTo: gsap.QuickToFunc, ryTo: gsap.QuickToFunc

function onMove(e: MouseEvent) {
  if (!visible.value) visible.value = true
  xTo?.(e.clientX)
  yTo?.(e.clientY)
  rxTo?.(e.clientX)
  ryTo?.(e.clientY)
}

function onOver(e: MouseEvent) {
  const t = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
  hovering.value = !!t
  label.value = t?.dataset.cursor || ''
}

const onDown = () => (down.value = true)
const onUp = () => (down.value = false)
const onLeave = () => (visible.value = false)
const onEnter = () => (visible.value = true)

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (!motionOK()) return // reduced-motion: keep the native cursor
  if (!dot.value || !ring.value) return
  document.documentElement.classList.add('has-custom-cursor')

  // Center both layers via gsap so quickTo on x/y fully controls the transform
  gsap.set([dot.value, ring.value], { xPercent: -50, yPercent: -50 })

  xTo = gsap.quickTo(dot.value, 'x', { duration: 0.08, ease: 'power3' })
  yTo = gsap.quickTo(dot.value, 'y', { duration: 0.08, ease: 'power3' })
  rxTo = gsap.quickTo(ring.value, 'x', { duration: 0.5, ease: 'power3' })
  ryTo = gsap.quickTo(ring.value, 'y', { duration: 0.5, ease: 'power3' })

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  document.documentElement.classList.remove('has-custom-cursor')
})
</script>

<template>
  <div>
    <div
      class="pointer-events-none fixed inset-0 z-[200] hidden mix-blend-difference md:block"
      :style="{ opacity: visible ? 1 : 0, transition: 'opacity .3s ease' }"
    >
      <!-- center dot -->
      <div ref="dot" class="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-paper" />
      <!-- trailing ring + label -->
      <div
        ref="ring"
        class="absolute left-0 top-0 flex items-center justify-center rounded-full border-2 border-paper text-[10px] font-medium uppercase tracking-widest text-paper transition-[width,height] duration-300 ease-out"
        :class="hovering ? 'h-24 w-24' : 'h-11 w-11'"
        :style="{ opacity: down ? 0.6 : 1 }"
      >
        <span
          class="transition-opacity duration-200"
          :style="{ opacity: hovering && label ? 1 : 0 }"
        >
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>
