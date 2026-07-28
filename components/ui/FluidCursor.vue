<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | null = null

onMounted(async () => {
  // desktop / fine-pointer only — skip the WebGL load on touch devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (!motionOK()) return // respect prefers-reduced-motion
  if (!canvas.value) return
  try {
    // dynamic import: ~500 lines of WebGL shaders stay out of the main bundle,
    // so phones (which never run this) don't pay to download it
    const { fluidCursor } = await import('~/composables/useFluidCursor')
    dispose = fluidCursor(canvas.value)
  } catch (e) {
    // fail silently — the dot/ring cursor still works without the fluid layer
    console.warn('[FluidCursor] disabled:', e)
  }
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none fixed inset-0 z-[150] hidden h-full w-full md:block"
    style="mix-blend-mode: screen"
  />
</template>
