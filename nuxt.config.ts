// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
        head: { 
            htmlAttrs: {
                    lang: 'en'
            },
            title: 'Manage your Bunny.net assets with ease',
            meta: [
                { name: 'description', content: 'A better UI for bunny.net. Free and ease to use, no registration required' },
                
                { name: 'google-site-verification', content: "JmyDVPBCzxIuSYjRVpnFkZeD_Hm-bpKyrbpmHsfYNUw"}
            ],
        },
    },
  modules: ['@nuxthq/ui', 'nuxt-icon', '@vueuse/nuxt'],
  css: ['@/assets/css/styles.css'],
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    
    // Add cors headers on API routes
    '/api/**': { cors: true },
  },
  devtools: { enabled: false }
})