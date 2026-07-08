<script setup lang="ts">
// Subtle film grain — editorial B&W signature. Animated shimmer unless reduced-motion.
const animate = ref(false)
onMounted(() => {
  animate.value = motionOK()
})
</script>

<template>
  <div class="grain pointer-events-none fixed z-[90]" :class="{ 'grain--anim': animate }" aria-hidden="true" />
</template>

<style scoped>
.grain {
  top: -6%;
  left: -6%;
  width: 112%;
  height: 112%;
  /* fractal-noise tile as data URI */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: 0.045;
  mix-blend-mode: overlay;
}
.grain--anim {
  animation: grain-shift 0.6s steps(3) infinite;
}
@keyframes grain-shift {
  0% { transform: translate(0, 0); }
  33% { transform: translate(-4%, 3%); }
  66% { transform: translate(3%, -2%); }
  100% { transform: translate(0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .grain--anim {
    animation: none;
  }
}
</style>
