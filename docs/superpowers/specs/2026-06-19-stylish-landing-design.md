# Landing Page — Jonatas Santiago / STYLISH

Data: 2026-06-19

## Visão
Landing page imersiva ("editorial em movimento") para o designer/estrategista de marcas
Jonatas Santiago (marca pessoal **STYLISH**). Estética revista de moda preto-e-branco,
alto contraste, tipografia serifada gigante e cinética, com a palavra **STYLISH** como
fio condutor. Objetivo duplo: mostrar autoridade/portfólio e converter no WhatsApp.

## Stack
- Nuxt 3 + Vue 3
- Inspira UI (componentes de motion/efeitos)
- GSAP + ScrollTrigger (animações por scroll, revelações por máscara/clip-path)
- Lenis (smooth scroll)
- Tailwind CSS
- Conteúdo em PT-BR. Placeholders de alta qualidade (substituíveis depois).

## Paleta / IDV
- Preto (#000) e branco (#fff), alto contraste.
- Tipografia: serifada display para títulos (estilo editorial), sans para corpo.
- Motivo recorrente: palavra "STYLISH".

## Estrutura (single-page)
1. **Hero** — tela cheia, tipografia cinética "STYLISH", silhueta revelada por máscara, scroll indicator.
2. **Manifesto** — texto "Atrás de uma pessoa existem muitos sonhos..." em tipografia gigante, reveal por scroll.
3. **Quem sou** — retrato anotado + stats animados (+10 anos, +1k marcas, +5 países).
4. **Serviços** — Naming · ID Visual · Branding (cards com hover de máscara).
5. **Portfólio** — grid/marquee de marcas com transições de imagem por clip-path.
6. **Depoimentos** — "O que os clientes Stylish estão falando" (carrossel/marquee).
7. **CTA final** — "Vamos criar algo Stylish?" → botão WhatsApp magnético (wa.me/5583989120922).
8. **Footer** — sociais, marca.

## Motion (diferencial)
- Transições de seção por máscara de revelação (clip-path), inspiradas em landonorris.com.
- Cursor customizado.
- Texto/botão magnético no CTA.
- Parallax sutil em fotos.
- Marquee infinito de "STYLISH" entre seções.
- Lenis para scroll suave; GSAP ScrollTrigger sincronizado com Lenis.

## Componentização
- `app.vue` / `pages/index.vue` — composição das seções.
- `components/sections/*` — uma seção por arquivo (Hero, Manifesto, About, Services, Portfolio, Testimonials, Cta, Footer).
- `components/ui/*` — primitivos reutilizáveis (MagneticButton, Marquee, RevealText, MaskImage, CustomCursor).
- `composables/useLenis.ts` — integração Lenis + GSAP ScrollTrigger.
- `assets/` — fontes, imagens placeholder, css base.

## Critérios de sucesso
- Experiência fluida (sem jank), responsiva (mobile-first nas seções críticas).
- Conversão clara para WhatsApp.
- Visual "fora da caixa", premium, fiel à IDV preto/branco.
