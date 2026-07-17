<script setup lang="ts">
const { scrollTo } = useSmoothScroll()
const open = ref(false)
const hidden = ref(false)
const active = ref('#top')
const menu = ref<HTMLElement | null>(null)

useOverlay(open, menu, () => (open.value = false))

const links = [
  { label: 'Quem sou', id: '#sobre' },
  { label: 'Serviços', id: '#servicos' },
  { label: 'Portfólio', id: '#portfolio' },
  { label: 'Contato', id: '#contato' },
]

function go(id: string) {
  open.value = false
  // useOverlay stops Lenis while the menu is open and only restarts it in a
  // watcher; scrolling in the same tick would be ignored by a stopped Lenis.
  nextTick(() => scrollTo(id, { offset: 0 }))
}

let lastY = 0
function onScroll() {
  const y = window.scrollY
  // hide when scrolling down past the hero, show when scrolling up
  hidden.value = y > 160 && y > lastY && !open.value
  lastY = y
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const ids = ['#top', ...links.map((l) => l.id)]
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = '#' + e.target.id
      })
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  ids.forEach((id) => {
    const el = document.querySelector(id)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[170] flex items-center justify-between px-6 py-5 mix-blend-difference transition-transform duration-500 ease-out md:px-10"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <a
      href="#top"
      data-cursor="topo"
      class="font-display text-xl font-semibold tracking-tightest text-paper"
      @click.prevent="go('#top')"
    >
      JS<span class="align-super text-[0.6em]">®</span>
    </a>

    <nav class="hidden items-center gap-8 md:flex">
      <button
        v-for="l in links"
        :key="l.id"
        class="group relative text-xs uppercase tracking-[0.2em] text-paper transition-opacity"
        :class="active === l.id ? 'opacity-100' : 'opacity-70'"
        @click="go(l.id)"
      >
        {{ l.label }}
        <span
          class="absolute -bottom-1 left-0 h-px bg-paper transition-all duration-300 group-hover:w-full"
          :class="active === l.id ? 'w-full' : 'w-0'"
        />
      </button>
    </nav>

    <button
      class="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
      aria-label="Menu"
      @click="open = !open"
    >
      <span
        class="block h-px bg-paper transition-all duration-300"
        :class="open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'"
      />
      <span
        class="block h-px bg-paper transition-all duration-300"
        :class="open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'"
      />
    </button>
  </header>

  <Transition name="menu">
    <div
      v-if="open"
      ref="menu"
      class="menu-panel fixed inset-0 z-[165] flex flex-col justify-between overflow-hidden bg-ink px-6 pb-10 pt-24 md:hidden"
    >
      <!-- depth: soft top light so the black isn't flat -->
      <div
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style="background: radial-gradient(80% 50% at 50% -10%, rgba(245, 244, 240, 0.09), transparent 60%)"
      />

      <nav class="relative flex flex-col" aria-label="Menu principal">
        <button
          v-for="(l, i) in links"
          :key="l.id"
          class="menu-item group flex items-baseline justify-between border-b border-paper/10 py-6 text-left"
          :style="{ '--i': i }"
          @click="go(l.id)"
        >
          <span class="flex items-baseline gap-5">
            <span class="font-display text-sm" :class="active === l.id ? 'text-paper' : 'text-paper/40'">
              0{{ i + 1 }}
            </span>
            <span
              class="font-display text-[2.6rem] font-light leading-none tracking-tight"
              :class="active === l.id ? 'italic text-paper' : 'text-paper/90'"
            >
              {{ l.label }}
            </span>
          </span>
          <span
            class="text-lg text-paper/40 transition-transform duration-300 group-active:translate-x-1"
            aria-hidden="true"
            >→</span
          >
        </button>
      </nav>

      <div class="menu-item relative flex flex-col gap-6" :style="{ '--i': links.length }">
        <div class="flex gap-7">
          <a
            href="https://instagram.com/jonatassantiagos"
            target="_blank"
            rel="noopener"
            class="text-[11px] uppercase tracking-[0.25em] text-paper/60"
            >Instagram</a
          >
          <a
            href="https://wa.me/5583989120922"
            target="_blank"
            rel="noopener"
            class="text-[11px] uppercase tracking-[0.25em] text-paper/60"
            >WhatsApp</a
          >
        </div>
        <div class="flex items-baseline justify-between border-t border-paper/10 pt-5">
          <span class="font-display text-lg font-semibold tracking-tightest text-paper"
            >Jonatas Santiago<span class="align-super text-[0.55em]">®</span></span
          >
          <span class="text-[10px] uppercase tracking-[0.25em] text-paper/40"
            >Estrategista de marcas</span
          >
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* panel: curtain wipe from the top */
.menu-enter-active {
  transition: clip-path 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.menu-leave-active {
  transition: clip-path 0.4s cubic-bezier(0.55, 0, 0.55, 0.2), opacity 0.4s ease;
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0 0 0% 0);
}
.menu-leave-to {
  opacity: 0;
}

/* items: staggered rise, driven by --i */
.menu-item {
  opacity: 1;
  transform: none;
}
.menu-enter-active .menu-item {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(0.16s + var(--i) * 0.06s);
}
.menu-enter-from .menu-item {
  opacity: 0;
  transform: translateY(22px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active,
  .menu-enter-active .menu-item {
    transition: none !important;
  }
}
</style>
