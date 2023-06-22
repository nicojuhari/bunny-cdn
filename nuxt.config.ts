// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthq/ui', 'nuxt-icon', '@vueuse/nuxt'],
  css: ['@/assets/css/styles.css'],
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    
    // Add cors headers on API routes
    '/api/**': { cors: true },
  },
  devtools: { enabled: true }
})
