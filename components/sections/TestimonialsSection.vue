<script setup lang="ts">
const testimonials = [
  {
    quote:
      'O Jonatas traduziu em poucos traços tudo o que minha marca queria dizer. Virou outro patamar.',
    name: 'Marina Costa',
    role: 'Fundadora, Lumière',
    seed: 't1',
  },
  {
    quote:
      'Profissionalismo absurdo. Entregou estratégia, não só design bonito. Hoje somos referência.',
    name: 'Rafael Lima',
    role: 'CEO, Vértice',
    seed: 't2',
  },
  {
    quote:
      'Stylish é a palavra. Saí com uma marca autêntica, de alto padrão e com propósito claro.',
    name: 'Beatriz Andrade',
    role: 'Sócia, Nero Atelier',
    seed: 't3',
  },
  {
    quote:
      'Do nome ao universo visual, tudo conectado. Recebi elogios desde o primeiro dia do lançamento.',
    name: 'Diego Santos',
    role: 'Founder, Aurum',
    seed: 't4',
  },
]
</script>

<template>
  <section id="depoimentos" class="relative overflow-hidden bg-paper py-28 text-ink md:py-40">
    <div class="px-6 md:px-10">
      <div class="mx-auto mb-16 max-w-7xl">
        <UiRevealText
          as="h2"
          text="O que os clientes Stylish estão falando."
          class="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl"
          :stagger="0.05"
        />
      </div>
    </div>

    <UiMarquee :duration="42" :repeat="2">
      <div class="flex items-stretch gap-6 pr-6 md:gap-8 md:pr-8">
        <figure
          v-for="(t, i) in testimonials"
          :key="i"
          class="flex w-[80vw] shrink-0 flex-col justify-between border border-ink/15 bg-paper p-8 md:w-[28rem] md:p-10"
        >
          <blockquote class="font-display text-xl font-light leading-snug text-ink md:text-2xl">
            “{{ t.quote }}”
          </blockquote>
          <figcaption class="mt-8 flex items-center gap-4">
            <img
              :src="`https://picsum.photos/seed/${t.seed}/100/100?grayscale`"
              :alt="`Foto de ${t.name}`"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div class="font-medium text-ink">{{ t.name }}</div>
              <div class="text-xs uppercase tracking-[0.15em] text-ink/70">{{ t.role }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </UiMarquee>
  </section>
</template>
