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
pages/index.vue              # composição das seções (rota única)
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

## Deploy

Hospedado na **Vercel**, deploy automático a cada push na `main`.
Domínio: **www.jonatassantiago.com.br** (DNS no Registro.br — registro `A`
para a raiz e `CNAME` para o `www`, ambos apontando para a Vercel).

## Imagens

Todas as imagens são auto-hospedadas em `public/` — nenhuma depende de
serviço externo (o site funciona em rede móvel lenta e offline).

```
public/
  hero-jonatas.webp   # retrato do hero (LCP) — WebP, 24KB
  image 2.jpg         # retrato da seção "Quem sou" (proporção 4:5)
  img/work/           # portfólio (p1–p6)
  img/case/           # galeria do modal de case
  img/services/       # serviços
  img/avatars/        # fotos dos depoimentos
```

As de `img/` ainda são **placeholders**; ao receber o material real do
cliente, basta substituir os arquivos mantendo os nomes. Textos ficam em
arrays no topo de cada componente de seção — não é preciso mexer no layout.

Foto nova para "Quem sou": proporção **4:5**, mínimo **1000×1250px**
(é recortada com `object-cover`, então o assunto deve estar centralizado).

## SEO

- `robots.txt` e `sitemap.xml` em `public/`
- JSON-LD (`Person`, `ProfessionalService`, `WebSite`) em `nuxt.config.ts`
- canonical, Open Graph e Twitter Card completos
- SSG via `npm run generate` — o conteúdo vem renderizado no HTML

## Detalhes de marca

- Cores: preto `#0a0a0a` (ink) e off-white `#f5f4f0` (paper).
- Fontes: **Bodoni Moda** (display serif) + **Archivo** (sans), via Google
  Fonts em `nuxt.config.ts`.
- WhatsApp do CTA: `wa.me/5583989120922` (em `CtaSection.vue` e `SiteFooter.vue`).

## Acessibilidade

Texto sobre fundo escuro usa no mínimo `text-paper/50` (4.94:1, passa WCAG
AA). Opacidades abaixo disso reprovam e são reservadas a elementos
decorativos. Toda animação respeita `prefers-reduced-motion` via `motionOK()`
(`composables/useMotion.ts`).
