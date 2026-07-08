<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
let tickerFn: (() => void) | null = null
const target = { x: 0, y: 0 }
const cur = { x: 0, y: 0 }
let setX: (v: number) => void, setY: (v: number) => void

function onMove(e: MouseEvent) {
  const r = root.value?.getBoundingClientRect()
  if (!r) return
  target.x = e.clientX - r.left
  target.y = e.clientY - r.top
}

onMounted(() => {
  if (!root.value) return
  const r = root.value.getBoundingClientRect()
  target.x = cur.x = r.width / 2
  target.y = cur.y = r.height / 2
  setX = gsap.quickSetter(root.value, '--mx', 'px') as (v: number) => void
  setY = gsap.quickSetter(root.value, '--my', 'px') as (v: number) => void
  setX(cur.x)
  setY(cur.y)

  tickerFn = () => {
    cur.x += (target.x - cur.x) * 0.12
    cur.y += (target.y - cur.y) * 0.12
    setX(cur.x)
    setY(cur.y)
  }
  gsap.ticker.add(tickerFn)
  root.value.addEventListener('mousemove', onMove)
})

onBeforeUnmount(() => {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  root.value?.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <div ref="root" class="spotlight pointer-events-none absolute inset-0 overflow-hidden">
    <div class="spotlight-base absolute inset-0" />
    <div class="spotlight-grid absolute inset-0" />
    <div class="spotlight-glow absolute inset-0" />
  </div>
</template>

<style scoped>
.spotlight {
  --mx: 50%;
  --my: 50%;
}
.spotlight-base,
.spotlight-grid {
  background-image: radial-gradient(circle, rgba(245, 244, 240, 0.55) 1px, transparent 1px);
  background-size: 30px 30px;
}
.spotlight-base {
  opacity: 0.05;
}
.spotlight-grid {
  opacity: 0.9;
  -webkit-mask-image: radial-gradient(
    260px circle at var(--mx) var(--my),
    #000 0%,
    transparent 72%
  );
  mask-image: radial-gradient(260px circle at var(--mx) var(--my), #000 0%, transparent 72%);
}
.spotlight-glow {
  background: radial-gradient(
    340px circle at var(--mx) var(--my),
    rgba(245, 244, 240, 0.07),
    transparent 70%
  );
}
</style>
