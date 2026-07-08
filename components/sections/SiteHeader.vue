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
  scrollTo(id, { offset: 0 })
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

  <Transition name="fade">
    <div
      v-if="open"
      ref="menu"
      class="fixed inset-0 z-[165] flex flex-col items-center justify-center gap-8 bg-ink md:hidden"
    >
      <button
        v-for="l in links"
        :key="l.id"
        class="font-display text-4xl font-light text-paper"
        @click="go(l.id)"
      >
        {{ l.label }}
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
