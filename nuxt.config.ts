// https://nuxt.com/docs/api/configuration/nuxt-config


const appConfig = {
    metaTitle: "Your Business Website Title",
    metaDescription: "Your business website description",
    googleSiteVerification: "xxx",
    domainName: "https://nicojuhari.com",
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
          // { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
          // { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
          // { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
      ],
      meta: [
            { name: 'description', content: appConfig.metaDescription as string },
          // { name: 'google-site-verification', content: appConfig.googleSiteVerification as string},
      ],
    },
  },
  runtimeConfig: {
    web3formsAccessKey: '9073abb9-1e1e-44dc-8cbf-03d564fdc9df',
    public: {
      siteUrl: appConfig.domainName as string,
      storyblok_mode: process.env.storyblok_mode as 'draft' | 'published',
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
})