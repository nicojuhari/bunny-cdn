// https://nuxt.com/docs/api/configuration/nuxt-config


const appConfig = {
    metaTitle: "Better UI for Bunny CDN",
    metaDescription: "Simple Bunny CDN Asset Management Upload, Organize, and Share. Take Control of Your Bunny.net CDN Assets from a sinlge UI.",
    domainName: "https://bunny-cdn.netlify.app/",
}

export default defineNuxtConfig({
  app: {
    head: { 
      htmlAttrs: {
          lang: 'en'
      },
      title: appConfig.metaTitle as string,
      titleTemplate: '%pageTitle',
      link: [
          { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
          { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
          { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
          { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
      ],
      meta: [
            { name: 'description', content: appConfig.metaDescription as string },
          // { name: 'google-site-verification', content: appConfig.googleSiteVerification as string},
      ],
      script: [
              { src:"https://cdn.splitbee.io/sb.js", async: ''}
            ]
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: appConfig.domainName as string,
    }
  },
  site: {
    url: appConfig.domainName as string,
    name: appConfig.metaTitle as string,
    title: appConfig.metaTitle as string,
    titleTemplate: '%pageTitle',
    description: appConfig.metaDescription as string,
    keywords: ['business', 'website', 'nuxt'],
    openGraph: {
      type: 'website',
      image: '/default-og-image.jpg',
      site_name: appConfig.metaTitle as string,
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   site: '@nicojuhari',
    // },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/seo', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'neutral', 'error', 'success']
    },
    colorMode: false
  },
  routeRules: {
    '/': { prerender: true },
  },
})