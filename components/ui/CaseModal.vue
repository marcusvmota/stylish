<script setup lang="ts">
interface Project {
  name: string
  cat: string
  year: string
  desc: string
  seed: string
}

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()

const panel = ref<HTMLElement | null>(null)
const isOpen = computed(() => props.project !== null)
const wa = 'https://wa.me/5583989120922'

useOverlay(isOpen, panel, () => emit('close'))

const gallery = computed(() =>
  props.project
    ? [props.project.seed, `${props.project.seed}-b`, `${props.project.seed}-c`].map(
        (s) => `/img/case/${s}.jpg`,
      )
    : [],
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="project"
        class="fixed inset-0 z-[190] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="`Projeto ${project.name}`"
      >
        <div class="absolute inset-0 bg-ink/85 backdrop-blur-sm" @click="emit('close')" />

        <div
          ref="panel"
          class="relative z-10 flex max-h-[88svh] w-full max-w-5xl flex-col overflow-hidden bg-ink ring-1 ring-paper/15"
        >
          <!-- header -->
          <div class="flex items-start justify-between gap-6 border-b border-paper/10 p-6 md:p-8">
            <div>
              <div class="mb-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-paper/60">
                <span>{{ project.cat }}</span>
                <span class="h-px w-6 bg-paper/30" />
                <span>{{ project.year }}</span>
              </div>
              <h3 class="font-display text-4xl font-light text-paper md:text-6xl">
                {{ project.name }}
              </h3>
            </div>
            <button
              class="shrink-0 rounded-full border border-paper/30 p-3 text-paper transition-colors hover:bg-paper hover:text-ink"
              aria-label="Fechar"
              data-cursor="fechar"
              @click="emit('close')"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </button>
          </div>

          <!-- scrollable body -->
          <div class="overflow-y-auto p-6 md:p-8" data-lenis-prevent>
            <p class="mb-8 max-w-2xl text-sm font-light leading-relaxed text-paper/70 md:text-base">
              {{ project.desc }} O projeto uniu estratégia de marca, naming e um sistema de
              identidade visual completo — do símbolo à aplicação — traduzindo a essência da marca
              num universo autêntico e de alto padrão.
            </p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <img
                v-for="(src, i) in gallery"
                :key="i"
                :src="src"
                :alt="`${project.name} — imagem ${i + 1}`"
                loading="lazy"
                class="w-full"
                :class="i === 0 ? 'sm:col-span-2' : ''"
              />
            </div>
          </div>

          <!-- footer CTA -->
          <div class="flex items-center justify-between gap-4 border-t border-paper/10 p-6 md:px-8">
            <span class="hidden text-[11px] uppercase tracking-[0.2em] text-paper/60 sm:block">
              Quer uma marca assim?
            </span>
            <a
              :href="wa"
              data-cursor="vamos"
              class="group inline-flex items-center gap-3 rounded-full border border-paper px-7 py-4 text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
            >
              Falar sobre um projeto
              <span class="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(24px) scale(0.98);
}
</style>
