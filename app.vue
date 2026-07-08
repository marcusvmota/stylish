<script setup lang="ts">
useSmoothScroll()
const route = useRoute()
// landing-only chrome (intro, chapter indicator, site nav) shouldn't bleed
// onto other routes like /proposta
const isLanding = computed(() => route.path === '/')
</script>

<template>
  <div>
    <a href="#main" class="skip-link">Pular para o conteúdo</a>
    <UiGrainOverlay />
    <UiFluidCursor />
    <UiCustomCursor />
    <template v-if="isLanding">
      <UiPreloader />
      <UiSceneIndicator />
      <SectionsSiteHeader />
    </template>
    <NuxtPage />
  </div>
</template>
