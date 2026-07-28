<script setup lang="ts">
withDefaults(
  defineProps<{
    word?: string
    /** usa o wordmark da marca (imagem) no lugar do texto */
    logo?: boolean
    reverse?: boolean
    invert?: boolean
    /** versão vazada: contorno em vez de preenchido (vale para texto e wordmark) */
    outline?: boolean
  }>(),
  { word: 'STYLISH', logo: false, reverse: false, invert: false, outline: false },
)
</script>

<template>
  <div class="border-y border-paper/10 py-6 md:py-8" :class="invert ? 'bg-paper' : 'bg-ink'">
    <UiMarquee :reverse="reverse" :duration="30">
      <!-- decorativo: o nome ja esta no h1 e no rodape, e a faixa repete 8x -->
      <img
        v-if="logo"
        :src="outline ? '/logo-wordmark-outline.webp' : '/logo-wordmark.webp'"
        alt=""
        aria-hidden="true"
        width="1600"
        height="225"
        class="mx-6 h-9 w-auto md:h-16"
      />
      <span
        v-else
        class="px-6 font-display text-5xl font-semibold uppercase tracking-tight md:text-8xl"
        :class="[
          invert ? 'text-ink' : 'text-paper',
          outline ? (invert ? 'text-stroke-ink' : 'text-stroke') : '',
        ]"
      >
        {{ word }}
      </span>
      <span
        class="px-6 font-display text-5xl md:text-8xl"
        :class="invert ? 'text-ink/30' : 'text-paper/30'"
        >✦</span
      >
    </UiMarquee>
  </div>
</template>
