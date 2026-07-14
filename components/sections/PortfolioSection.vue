<script setup lang="ts">
const projects = [
  {
    name: 'Lumière',
    cat: 'Branding · Cosméticos',
    year: '2024',
    desc: 'Da estratégia ao símbolo: uma marca de skincare luminosa, sofisticada e atemporal.',
    seed: 'p1',
  },
  {
    name: 'Nero Atelier',
    cat: 'Identidade Visual · Moda',
    year: '2024',
    desc: 'Uma grife autoral com presença forte, tipografia marcante e direção de arte em preto.',
    seed: 'p2',
  },
  {
    name: 'Aurum',
    cat: 'Naming · Joalheria',
    year: '2023',
    desc: 'Nome, conceito e universo visual para joias de alto padrão — ouro em cada detalhe.',
    seed: 'p3',
  },
  {
    name: 'Vértice',
    cat: 'Branding · Arquitetura',
    year: '2023',
    desc: 'Posicionamento e sistema visual para um estúdio de arquitetura de linhas precisas.',
    seed: 'p4',
  },
  {
    name: 'Sól',
    cat: 'Identidade Visual · Gastronomia',
    year: '2022',
    desc: 'Calor, sabor e brasilidade traduzidos numa marca apetitosa e cheia de personalidade.',
    seed: 'p5',
  },
  {
    name: 'Mont Blanc Co.',
    cat: 'Branding · Lifestyle',
    year: '2022',
    desc: 'Uma marca de lifestyle premium, minimalista e aspiracional, do conceito ao detalhe.',
    seed: 'p6',
  },
]

// color source — grayscale is applied via CSS so hover can reveal the original
// self-hosted under /public/img/work so mobile networks don't depend on picsum
const imgUrl = (seed: string) => `/img/work/${seed}.jpg`

const activeIndex = ref<number | null>(null)
const openCase = (i: number) => (activeIndex.value = i)
const closeCase = () => (activeIndex.value = null)

// Warm the browser cache in the background so images are ready before the user
// scrolls here (picsum's redirect adds ~1s of latency on first fetch).
onMounted(() => {
  const preload = () => projects.forEach((p) => (new Image().src = imgUrl(p.seed)))
  if ('requestIdleCallback' in window) {
    ;(window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
      preload,
    )
  } else {
    setTimeout(preload, 1500)
  }
})
</script>

<template>
  <section id="portfolio" class="relative bg-ink px-6 py-28 md:px-10 md:py-40">
    <div class="mx-auto max-w-7xl">
      <div class="mb-16 flex flex-col gap-4 md:mb-28">
        <h2
          class="font-display text-4xl font-light leading-[1.05] tracking-tight text-paper md:text-7xl"
        >
          Marcas que viraram <span class="italic">Stylish</span>.
        </h2>
      </div>

      <div class="flex flex-col gap-24 md:gap-40">
        <article
          v-for="(p, i) in projects"
          :key="i"
          class="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
        >
          <!-- image -->
          <a
            href="#contato"
            data-cursor="ver case"
            class="group relative block cursor-pointer overflow-hidden md:col-span-7"
            :class="i % 2 === 1 ? 'md:order-2' : 'md:order-1'"
            @click.prevent="openCase(i)"
          >
            <UiMaskImage
              :src="imgUrl(p.seed)"
              :alt="`Projeto ${p.name} — ${p.cat}, por Jonatas Santiago`"
              class="aspect-[4/3] w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              :parallax="8"
              :direction="i % 2 === 1 ? 'right' : 'left'"
              color-on-hover
            />
            <span
              class="pointer-events-none absolute right-5 top-5 font-display text-sm text-paper/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >↗</span
            >
          </a>

          <!-- text -->
          <div
            class="flex flex-col md:col-span-5"
            :class="i % 2 === 1 ? 'md:order-1 md:pr-6' : 'md:order-2 md:pl-6'"
          >
            <div class="mb-5 flex items-baseline gap-4">
              <span class="font-display text-sm text-paper/60">0{{ i + 1 }}</span>
              <span class="h-px flex-1 bg-paper/15" />
              <span class="text-[11px] uppercase tracking-[0.2em] text-paper/60">{{ p.year }}</span>
            </div>

            <h3
              class="font-display text-4xl font-light leading-[1.02] tracking-tight text-paper md:text-6xl"
            >
              {{ p.name }}
            </h3>
            <span class="mt-3 text-[11px] uppercase tracking-[0.25em] text-paper/70">{{
              p.cat
            }}</span>

            <p class="mt-6 max-w-md text-sm font-light leading-relaxed text-paper/60 md:text-base">
              {{ p.desc }}
            </p>

            <a
              href="#contato"
              data-cursor="ver case"
              class="group/link mt-8 inline-flex w-fit cursor-pointer items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper"
              @click.prevent="openCase(i)"
            >
              Ver projeto
              <span
                class="inline-block transition-transform duration-500 group-hover/link:translate-x-2"
                >→</span
              >
              <span
                class="block h-px w-0 bg-paper transition-all duration-500 group-hover/link:w-10"
              />
            </a>
          </div>
        </article>
      </div>
    </div>

    <UiCaseModal
      :project="activeIndex !== null ? projects[activeIndex] : null"
      @close="closeCase"
    />
  </section>
</template>
