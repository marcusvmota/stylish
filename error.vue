<script setup lang="ts">
defineProps<{ error: { statusCode: number; message?: string } }>()
const home = () => clearError({ redirect: '/' })
</script>

<template>
  <div
    class="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-paper"
  >
    <span class="mb-8 text-[11px] uppercase tracking-[0.3em] text-paper/60">
      Jonatas Santiago · Stylish
    </span>

    <h1
      class="font-display font-semibold leading-none tracking-tightest text-paper"
      style="font-size: clamp(6rem, 26vw, 20rem)"
    >
      {{ error.statusCode || 404 }}
    </h1>

    <p class="mt-6 max-w-md font-light text-paper/70">
      {{ error.statusCode === 404 ? 'Essa página saiu de cena.' : 'Algo fora do lugar por aqui.' }}
      Vamos te levar de volta ao estúdio.
    </p>

    <button
      class="group mt-12 inline-flex items-center gap-3 rounded-full border border-paper px-9 py-4 text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
      @click="home"
    >
      Voltar ao início
      <span class="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </button>
  </div>
</template>
