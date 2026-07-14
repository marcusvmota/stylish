<script setup lang="ts">
const wa = "https://wa.me/5583989120922";
const agency = "JS Studio";

useHead({
  title: "Proposta de Parceria — Landing Pages | Jonatas Santiago",
  meta: [
    {
      name: "description",
      content:
        "Parceria white-label: landing pages de alto padrão para o pacote da sua agência de branding."
    }
  ]
});

const steps = [
  {
    n: "01",
    title: "A agência fecha o projeto",
    desc: "Você inclui a landing page no seu pacote de branding e vende pro cliente com a sua margem."
  },
  {
    n: "02",
    title: "Me repassa o material",
    desc: "Identidade visual + conteúdo (textos e imagens). Simples, por um briefing curto."
  },
  {
    n: "03",
    title: "Crio e coloco no ar",
    desc: "Entrego em 3–5 dias, aprovo com você e subo."
  }
];

const criacao = [
  {
    tier: "Standard",
    price: "R$250",
    unit: "/ landing",
    items: [
      "1 página, estrutura validada",
      "Identidade do cliente aplicada",
      "Formulário de contato",
      "Responsivo + SEO básico",
      "Entrega em 3–5 dias úteis"
    ]
  },
  {
    tier: "Custom",
    price: "a partir de R$500",
    unit: "/ landing",
    items: [
      "Estrutura sob medida",
      "Seções extras (depoimentos, galeria, FAQ)",
      "Copy revisado junto",
      "Animações e efeitos avançados",
      "Prazo conforme escopo"
    ]
  }
];

const manutencao = [
  {
    tier: "Básica",
    price: "R$150",
    unit: "/ mês",
    items: [
      "Hospedagem + domínio + SSL",
      "Uptime e monitoramento",
      "Até 2 alterações de conteúdo / mês",
      "Suporte técnico"
    ]
  },
  {
    tier: "Plus",
    price: "R$250",
    unit: "/ mês",
    items: [
      "Tudo da Básica",
      "Até 5 alterações / mês",
      "Relatório simples de acessos",
      "Prioridade no suporte"
    ]
  }
];

const beneficios = [
  "Novo item no media kit sem contratar equipe técnica.",
  "Margem sua na criação + recorrência na manutenção.",
  "Entrega rápida: landing no ar em poucos dias.",
  "White-label: sai como serviço da sua agência.",
  "Padrão alto — o mesmo nível da landing que você está vendo.",
  "Escala: quanto mais volume, melhor o preço."
];

const condicoes = [
  ["Pagamento da criação", "50% no início, 50% na entrega."],
  ["Manutenção", "Recorrente mensal, direto com o estúdio (Pix)."],
  [
    "White-label",
    `Entrego no nome da ${agency}; não apareço pro cliente final.`
  ],
  ["Alteração extra", "Além das inclusas: R$50 por alteração."],
  ["Cancelamento", "Aviso de 30 dias, sem multa."],
  ["Volume", "A partir de 5 landings/mês: 10% off na criação."]
];
</script>

<template>
  <div class="relative min-h-screen bg-ink text-paper">
    <!-- depth: diagonal base gradient + glow + dot texture + vignette so the black isn't flat -->
    <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <!-- diagonal tone shift (the main un-flattener) -->
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            158deg,
            #1c1c20 0%,
            #101012 34%,
            #0a0a0b 66%,
            #050506 100%
          );
        "
      />
      <!-- soft top light -->
      <div
        class="absolute inset-0"
        style="
          background: radial-gradient(
            72% 55% at 50% -10%,
            rgba(245, 244, 240, 0.12),
            transparent 62%
          );
        "
      />
      <!-- faint dot grid texture, masked to fade at edges -->
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            rgba(245, 244, 240, 0.5) 1px,
            transparent 1px
          );
          background-size: 32px 32px;
          opacity: 0.05;
          -webkit-mask-image: radial-gradient(
            90% 70% at 50% 30%,
            #000 0%,
            transparent 80%
          );
          mask-image: radial-gradient(
            90% 70% at 50% 30%,
            #000 0%,
            transparent 80%
          );
        "
      />
      <!-- vignette -->
      <div
        class="absolute inset-0"
        style="
          background: radial-gradient(
            115% 90% at 50% 38%,
            transparent 42%,
            rgba(0, 0, 0, 0.65)
          );
        "
      />
    </div>

    <!-- minimal header -->
    <header
      class="fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10"
    >
      <NuxtLink
        to="/"
        class="font-display text-xl font-semibold tracking-tightest text-paper"
        data-cursor="landing"
      >
        JS<span class="align-super text-[0.6em]">®</span>
      </NuxtLink>
    </header>

    <main id="main" class="relative z-10">
      <!-- hero -->
      <section
        class="relative flex min-h-[92svh] flex-col justify-center px-6 py-32 md:px-10"
      >
        <div class="mx-auto w-full max-w-6xl">
          <span
            class="mb-8 block text-[11px] uppercase tracking-[0.3em] text-paper/60"
          >
            Proposta de parceria · White-label
          </span>
          <UiRevealText
            as="h1"
            text="Landing pages de alto padrão no pacote da sua agência."
            class="max-w-4xl font-display font-light leading-[1.02] tracking-tight text-paper"
            :style="{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }"
            :stagger="0.03"
          />
          <p
            class="mt-10 max-w-2xl text-lg font-light leading-relaxed text-paper/70"
          >
            Você entrega o branding. Eu entrego a landing — no seu nome, no seu
            media kit. Você revende com a margem que quiser, sem contratar
            equipe técnica.
          </p>
          <div class="mt-12 flex flex-wrap items-center gap-5">
            <UiMagneticButton :href="wa" :strength="0.4">
              <span
                class="group inline-flex items-center gap-3 rounded-full border border-paper px-8 py-4 text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
                data-cursor="vamos"
              >
                Fechar parceria
                <span
                  class="transition-transform duration-500 group-hover:translate-x-1"
                  >→</span
                >
              </span>
            </UiMagneticButton>
            <NuxtLink
              to="/"
              class="text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-paper"
              data-cursor="exemplo"
            >
              Ver um exemplo real →
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- how it works -->
      <section class="border-t border-paper/10 px-6 py-24 md:px-10 md:py-36">
        <div class="mx-auto max-w-6xl">
          <UiRevealText
            as="h2"
            text="Como funciona."
            class="mb-16 font-display text-4xl font-light tracking-tight text-paper md:text-6xl"
          />
          <div class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            <div v-for="s in steps" :key="s.n">
              <div class="mb-5 flex items-baseline gap-4">
                <span class="font-display text-2xl text-paper/50">{{
                  s.n
                }}</span>
                <span class="h-px flex-1 bg-paper/15" />
              </div>
              <h3 class="font-display text-2xl font-light text-paper">
                {{ s.title }}
              </h3>
              <p class="mt-4 text-sm font-light leading-relaxed text-paper/70">
                {{ s.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- investment -->
      <section class="border-t border-paper/10 px-6 py-24 md:px-10 md:py-36">
        <div class="mx-auto max-w-6xl">
          <UiRevealText
            as="h2"
            text="Investimento."
            class="font-display text-4xl font-light tracking-tight text-paper md:text-6xl"
          />
          <p
            class="mb-16 mt-6 max-w-2xl text-sm font-light leading-relaxed text-paper/60"
          >
            Valores de <span class="text-paper">fornecedor</span> — o que você
            paga ao desenvolvedor. A {{ agency }} define livremente o preço
            final ao cliente e fica com a diferença.
          </p>

          <h3 class="mb-6 text-[11px] uppercase tracking-[0.3em] text-paper/50">
            Criação
          </h3>
          <div class="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="p in criacao"
              :key="p.tier"
              class="flex flex-col border border-paper/12 bg-paper/[0.025] p-8 shadow-[inset_0_1px_0_rgba(245,244,240,0.06)] md:p-10"
            >
              <div class="flex items-baseline justify-between gap-4">
                <span class="font-display text-3xl font-light text-paper">{{
                  p.tier
                }}</span>
                <span class="text-right">
                  <span class="font-display text-2xl text-paper">{{
                    p.price
                  }}</span>
                  <span
                    class="block text-[11px] uppercase tracking-[0.2em] text-paper/50"
                    >{{ p.unit }}</span
                  >
                </span>
              </div>
              <ul class="mt-8 flex flex-col gap-3">
                <li
                  v-for="(it, i) in p.items"
                  :key="i"
                  class="flex items-start gap-3 text-sm font-light text-paper/70"
                >
                  <span class="mt-2 h-px w-4 shrink-0 bg-paper/40" />
                  {{ it }}
                </li>
              </ul>
            </div>
          </div>

          <h3 class="mb-6 text-[11px] uppercase tracking-[0.3em] text-paper/50">
            Manutenção mensal
          </h3>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="p in manutencao"
              :key="p.tier"
              class="flex flex-col border border-paper/12 bg-paper/[0.025] p-8 shadow-[inset_0_1px_0_rgba(245,244,240,0.06)] md:p-10"
            >
              <div class="flex items-baseline justify-between gap-4">
                <span class="font-display text-3xl font-light text-paper">{{
                  p.tier
                }}</span>
                <span class="text-right">
                  <span class="font-display text-2xl text-paper">{{
                    p.price
                  }}</span>
                  <span
                    class="block text-[11px] uppercase tracking-[0.2em] text-paper/50"
                    >{{ p.unit }}</span
                  >
                </span>
              </div>
              <ul class="mt-8 flex flex-col gap-3">
                <li
                  v-for="(it, i) in p.items"
                  :key="i"
                  class="flex items-start gap-3 text-sm font-light text-paper/70"
                >
                  <span class="mt-2 h-px w-4 shrink-0 bg-paper/40" />
                  {{ it }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- why -->
      <section class="border-t border-paper/10 px-6 py-24 md:px-10 md:py-36">
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <UiRevealText
              as="h2"
              text="Por que vale pra sua agência."
              class="font-display text-4xl font-light leading-[1.05] tracking-tight text-paper md:text-5xl"
            />
          </div>
          <ul class="flex flex-col gap-5 lg:col-span-7">
            <li
              v-for="(b, i) in beneficios"
              :key="i"
              class="flex items-start gap-4 border-b border-paper/10 pb-5 text-base font-light text-paper/80"
            >
              <span class="font-display text-sm text-paper/40"
                >0{{ i + 1 }}</span
              >
              {{ b }}
            </li>
          </ul>
        </div>
      </section>

      <!-- terms -->
      <section class="border-t border-paper/10 px-6 py-24 md:px-10 md:py-36">
        <div class="mx-auto max-w-6xl">
          <UiRevealText
            as="h2"
            text="Condições."
            class="mb-14 font-display text-4xl font-light tracking-tight text-paper md:text-6xl"
          />
          <dl class="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            <div
              v-for="([term, val], i) in condicoes"
              :key="i"
              class="border-t border-paper/10 pt-5"
            >
              <dt class="text-[11px] uppercase tracking-[0.2em] text-paper/50">
                {{ term }}
              </dt>
              <dd class="mt-2 text-base font-light text-paper/80">{{ val }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- CTA -->
      <section
        class="relative overflow-hidden border-t border-paper/10 px-6 py-32 text-center md:py-48"
      >
        <span
          class="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display font-semibold tracking-tightest text-paper/[0.04]"
          style="font-size: clamp(8rem, 26vw, 26rem)"
          aria-hidden="true"
          >STYLISH</span
        >
        <div class="relative mx-auto max-w-3xl">
          <h2
            class="font-display font-light leading-[0.98] tracking-tightest text-paper"
            :style="{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }"
          >
            Vamos montar esse pacote juntos?
          </h2>
          <p class="mx-auto mt-8 max-w-xl text-base font-light text-paper/70">
            Vamos alinhar os detalhes da parceria — rápido e sem burocracia.
          </p>
        </div>
      </section>

      <!-- footer -->
      <footer class="border-t border-paper/10 px-6 py-12 md:px-10">
        <div
          class="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-[11px] uppercase tracking-[0.2em] text-paper/50"
        >
          <span>Marcus Vinicius® · Desenvolvedor de Software</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
@media print {
  .fixed {
    display: none !important;
  }
}
</style>
