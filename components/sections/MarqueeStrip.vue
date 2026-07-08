<script setup lang="ts">
withDefaults(
  defineProps<{
    word?: string
    reverse?: boolean
    invert?: boolean
    outline?: boolean
  }>(),
  { word: 'STYLISH', reverse: false, invert: false, outline: false },
)
</script>

<template>
  <div
    class="border-y border-paper/10 py-6 md:py-8"
    :class="invert ? 'bg-paper' : 'bg-ink'"
  >
    <UiMarquee :reverse="reverse" :duration="30">
      <span
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
