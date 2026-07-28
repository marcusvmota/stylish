const SITE_URL = 'https://www.jonatassantiago.com.br'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'JONATASSANTIAGO — Estrategista de Marcas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Jonatas Santiago — Estrategista de Marcas. Naming, Identidade Visual e Branding de alto padrão. +10 anos, +1k marcas, +5 países. Crie algo Stylish.',
        },
        { property: 'og:title', content: 'Jonatas Santiago — STYLISH' },
        {
          property: 'og:description',
          content: 'Marcas autênticas, com estilo, propósito e estratégia.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: SITE_URL + '/' },
        { property: 'og:site_name', content: 'Jonatas Santiago — STYLISH' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:image', content: SITE_URL + '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Jonatas Santiago — Estrategista de Marcas' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Jonatas Santiago — STYLISH' },
        {
          name: 'twitter:description',
          content: 'Marcas autênticas, com estilo, propósito e estratégia.',
        },
        { name: 'twitter:image', content: SITE_URL + '/og.png' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
        { rel: 'canonical', href: SITE_URL + '/' },
        // fontes auto-hospedadas: preload das duas que pintam primeiro (hero)
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/bodoni-moda-600-latin.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/archivo-400-latin.woff2',
          crossorigin: 'anonymous',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                '@id': SITE_URL + '/#jonatas',
                name: 'Jonatas Santiago',
                jobTitle: 'Estrategista de Marcas',
                description:
                  'Estrategista de marcas com mais de 10 anos de experiência em naming, identidade visual e branding de alto padrão.',
                url: SITE_URL,
                image: SITE_URL + '/hero-jonatas.webp',
                sameAs: [
                  'https://instagram.com/jonatassantiagos',
                  'https://instagram.com/studiojonatassantiago',
                ],
                knowsAbout: ['Naming', 'Identidade Visual', 'Branding', 'Estratégia de Marca'],
                alumniOf: { '@type': 'CollegeOrUniversity', name: 'UFCG' },
              },
              {
                '@type': 'ProfessionalService',
                '@id': SITE_URL + '/#studio',
                name: 'STYLISH — Studio Jonatas Santiago',
                description:
                  'Estúdio de branding: naming, identidade visual e estratégia de marca para marcas de alto padrão.',
                url: SITE_URL,
                image: SITE_URL + '/og.png',
                founder: { '@id': SITE_URL + '/#jonatas' },
                priceRange: '$$$',
                areaServed: 'BR',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Campina Grande',
                  addressRegion: 'PB',
                  addressCountry: 'BR',
                },
                telephone: '+5583989120922',
                serviceType: ['Naming', 'Identidade Visual', 'Branding'],
              },
              {
                '@type': 'WebSite',
                '@id': SITE_URL + '/#website',
                url: SITE_URL,
                name: 'Jonatas Santiago — STYLISH',
                inLanguage: 'pt-BR',
                publisher: { '@id': SITE_URL + '/#studio' },
              },
            ],
          }),
        },
      ],
    },
  },
})
