<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
let introCtx: gsap.Context

useMouseParallax(root, { amplitude: 40, useWindow: true })

// Intro (plays once after preloader) — same as before
onMounted(() => {
  if (!motionOK()) return
  introCtx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 2.6 })
    tl.from('.hero-letter', { yPercent: 120, stagger: 0.06, duration: 1.1 })
      .fromTo(
        '.hero-portrait-inner',
        { clipPath: 'inset(0 0 100% 0)', scale: 1.15 },
        { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.3 },
        '-=0.8',
      )
      .from('.hero-meta', { y: 20, opacity: 0, stagger: 0.12, duration: 0.8 }, '-=0.6')
      .from('.hero-cue', { opacity: 0, duration: 0.6 }, '-=0.3')
      .add(startIdle)

    function startIdle() {
      gsap.to('.hero-portrait-inner', { y: -18, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.hero-portrait-img', { scale: 1.06, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.hero-letter', {
        yPercent: -4, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
        stagger: { each: 0.12, from: 'center' },
      })
      gsap.to('.hero-float', {
        y: -24, rotation: 20, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.8,
      })
    }
  }, root.value!)
})
onBeforeUnmount(() => introCtx?.revert())

// Cinematic zoom-through: pin the hero; the portrait grows to fill the
// viewport (camera dives into the photo) while the word scales past the
// edges and fades — the next scene is revealed underneath.
useScene(
  root,
  (tl) => {
    // pin the portrait's visual position before animating its size
    tl.set('.hero-portrait', { left: '50%', xPercent: -50 }, 0)
      .to('.hero-word', { scale: 2.4, opacity: 0, ease: 'power2.in', duration: 1 }, 0)
      .to('.hero-meta, .hero-cue, .hero-float', { opacity: 0, duration: 0.35 }, 0)
      .to(
        '.hero-portrait',
        { width: '100vw', height: '100svh', maxWidth: '100vw', bottom: 0, ease: 'power2.inOut', duration: 1 },
        0.12,
      )
      .to('.hero-portrait-img', { scale: 1.15, ease: 'none', duration: 1 }, 0.12)
      // dive past the photo: it fades to black at the end, handing off to the next scene
      .to('.hero-portrait', { opacity: 0, ease: 'power1.in', duration: 0.35 }, 0.8)
  },
  { length: '+=160%', scrub: 0.6 },
)

const word = ['S', 'T', 'Y', 'L', 'I', 'S', 'H']
</script>

<template>
  <section
    id="top"
    ref="root"
    class="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink"
  >
    <!-- floating decorative marks -->
    <span
      class="hero-float pointer-events-none absolute left-[12%] top-[24%] font-display text-3xl text-paper/20"
      data-depth="0.6"
      >✦</span
    >
    <span
      class="hero-float pointer-events-none absolute right-[14%] top-[60%] font-display text-2xl text-paper/15"
      data-depth="0.9"
      >✶</span
    >
    <span
      class="hero-float pointer-events-none absolute left-[20%] bottom-[18%] h-2 w-2 rounded-full bg-paper/20"
      data-depth="1.1"
    />

    <!-- meta corners -->
    <div
      class="hero-meta absolute left-6 top-24 hidden max-w-[10rem] text-[11px] uppercase leading-relaxed tracking-[0.2em] text-paper/60 md:left-10 md:top-32 md:block"
      data-depth="0.5"
    >
      Estrategista<br />de marcas
    </div>
    <div
      class="hero-meta absolute right-6 top-24 hidden text-right text-[11px] uppercase leading-relaxed tracking-[0.2em] text-paper/60 md:right-10 md:top-32 md:block"
      data-depth="0.5"
    >
      +10 anos<br />+1k marcas
    </div>

    <!-- Kinetic STYLISH word + portrait -->
    <div class="hero-stage relative flex h-full w-full flex-col items-center justify-center">
      <div class="hero-word" data-depth="0.12">
        <h1
          class="pointer-events-none relative z-0 flex select-none justify-center font-display font-semibold leading-none tracking-tightest text-paper"
          style="font-size: clamp(4.5rem, 22vw, 22rem)"
          aria-label="Jonatas Santiago — Estrategista de marcas. Naming, identidade visual e branding Stylish."
        >
          <span
            v-for="(l, i) in word"
            :key="i"
            aria-hidden="true"
            class="hero-letter inline-block"
            >{{ l }}</span
          >
        </h1>
      </div>

      <!-- portrait: becomes the camera target on scroll -->
      <div
        class="hero-portrait absolute bottom-[-2%] z-10 h-[58vh] w-[54vw] max-w-[420px] md:h-[82vh] md:w-[42vw]"
        data-depth="0.28"
      >
        <div class="hero-portrait-inner h-full w-full overflow-hidden">
          <img
            src="/image%203.png"
            alt="Jonatas Santiago, estrategista de marcas, retrato em preto e branco"
            width="700"
            height="1100"
            fetchpriority="high"
            decoding="async"
            class="hero-portrait-img h-full w-full object-cover"
          />
        </div>
      </div>

      <p
        class="hero-meta absolute bottom-10 left-6 z-20 hidden max-w-[12rem] text-[11px] uppercase tracking-[0.2em] text-paper/60 md:left-10 md:block"
        data-depth="0.5"
      >
        Naming · ID Visual · Branding
      </p>
    </div>

    <!-- scroll cue -->
    <div
      class="hero-cue absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-paper/70"
    >
      <span>Role</span>
      <span class="hero-cue-line h-10 w-px bg-paper/40" />
    </div>
  </section>
</template>

<style scoped>
.hero-cue-line {
  transform-origin: top;
  animation: cue 2s ease-in-out infinite;
}
@keyframes cue {
  0%,
  100% {
    transform: scaleY(0.3);
    opacity: 0.3;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-cue-line {
    animation: none;
  }
}
</style>
