<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(
  defineProps<{
    href?: string
    strength?: number
    as?: string
  }>(),
  { strength: 0.4, as: 'a' },
)

const root = ref<HTMLElement | null>(null)
let xTo: gsap.QuickToFunc, yTo: gsap.QuickToFunc

function onMove(e: MouseEvent) {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - (rect.left + rect.width / 2)) * props.strength
  const y = (e.clientY - (rect.top + rect.height / 2)) * props.strength
  xTo(x)
  yTo(y)
}

function onLeave() {
  xTo(0)
  yTo(0)
}

onMounted(() => {
  xTo = gsap.quickTo(root.value, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  yTo = gsap.quickTo(root.value, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :href="href"
    class="inline-flex"
    data-cursor=""
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <slot />
  </component>
</template>
