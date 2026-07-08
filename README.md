# STYLISH — Landing Page · Jonatas Santiago

Landing page cinemática ("STYLISH — o filme") para o estrategista de marcas
**Jonatas Santiago**. O scroll é a câmera: 7 cenas full-screen com pin
(zoom-through no hero, title cards no manifesto, cortes de cena nos serviços,
finale montado letra a letra). Estética preto-e-branco, Bodoni Moda, a palavra
**STYLISH** como fio condutor. Indicador de capítulos lateral (01–07).
No mobile e com `prefers-reduced-motion`, as cenas viram fluxo empilhado sem pins.

## Stack

- **Nuxt 3** + Vue 3
- **GSAP** + ScrollTrigger — animações por scroll, revelações por máscara (clip-path)
- **Lenis** — smooth scroll (sincronizado ao GSAP)
- **Tailwind CSS**

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run generate # site estático (SSG) -> .output/public
```

## Estrutura

```
app.vue                      # cursor custom + header + smooth scroll
pages/index.vue              # composição das seções
components/
  sections/                  # uma seção por arquivo
    SiteHeader / HeroSection / ManifestoSection / AboutSection
    ServicesSection / PortfolioSection / TestimonialsSection
    CtaSection / SiteFooter / MarqueeStrip
  ui/                        # primitivos de motion reutilizáveis
    FluidCursor   # cursor de fluido WebGL (monocromático, mix-blend screen)
    CustomCursor  # dot + ring com labels contextuais (por cima do fluido)
    Spotlight     # grade de pontos que acende sob o mouse (estilo Inspira)
    RevealCurtain # transição de seção por clip-path + zoom no scroll
    Marquee       # marquee GSAP reativo à velocidade do Lenis (skew + speed)
    MagneticButton / RevealText / MaskImage
composables/
  useSmoothScroll.ts   # Lenis (lerp 0.075) + GSAP ticker + getScrollVelocity
  useMouseParallax.ts  # parallax de mouse por data-depth
  useFluidCursor.ts    # simulação de fluido WebGL (base Pavel Dobryakov, P&B)
assets/css/main.css          # base, fontes, utilitários (text-stroke, etc.)
```

## Substituir os placeholders pelas fotos/textos reais

As imagens usam `picsum.photos` (grayscale) como placeholder. Para trocar:

1. Coloque as fotos reais em `public/img/` (ex: `public/img/hero.jpg`).
2. Troque as URLs `https://picsum.photos/...` por `/img/hero.jpg` nos componentes:
   - **Hero:** `components/sections/HeroSection.vue` (retrato principal)
   - **Quem sou:** `components/sections/AboutSection.vue` (retrato + textos/fatos)
   - **Serviços:** `components/sections/ServicesSection.vue` (preview ao passar o mouse)
   - **Portfólio:** `components/sections/PortfolioSection.vue` (array `projects`: nome, categoria, imagem)
   - **Depoimentos:** `components/sections/TestimonialsSection.vue` (array `testimonials`)
3. Textos editáveis estão no topo de cada componente (arrays/consts) — sem precisar mexer no layout.

## Detalhes de marca

- Cores: preto `#0a0a0a` (ink) e off-white `#f5f4f0` (paper).
- Fontes: **Fraunces** (display serif) + **Inter** (sans). Carregadas via Google Fonts em `nuxt.config.ts`.
- WhatsApp do CTA: `wa.me/5583989120922` (em `CtaSection.vue` e `SiteFooter.vue`).
# stylish
