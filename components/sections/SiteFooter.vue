<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/jonatassantiagos' },
  { label: 'WhatsApp', href: 'https://wa.me/5583989120922' },
  { label: 'Studio', href: 'https://instagram.com/studiojonatassantiago' },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-ink px-6 pb-12 pt-20 md:px-10">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div class="font-display text-lg text-paper">Jonatas Santiago®</div>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-paper/60">
          Estrategista de Marcas · Branding
        </p>
      </div>

      <nav class="flex flex-wrap gap-6">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="group relative text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-paper"
          data-cursor=""
        >
          {{ s.label }}
          <span
            class="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full"
          />
        </a>
      </nav>
    </div>

    <div
      class="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-paper/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-paper/30 md:flex-row md:justify-between"
    >
      <span>© {{ year }} — Todos os direitos reservados</span>
      <span>Feito com estilo, propósito e estratégia.</span>
    </div>
  </footer>
</template>
