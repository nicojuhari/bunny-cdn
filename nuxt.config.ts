// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
        head: { 
            htmlAttrs: {
                    lang: 'en'
            },
            title: 'Manage your Bunny.net assets with ease',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: 'A better UI for bunny.net CDN API. Free and ease to use, no registration required' },
                
                { name: 'google-site-verification', content: "JmyDVPBCzxIuSYjRVpnFkZeD_Hm-bpKyrbpmHsfYNUw"}
            ],
        },
    },
  modules: ['nuxt-icon', '@nuxt/ui', '@vueuse/nuxt'],
  css: ['@/assets/css/styles.css'],
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    
    // Add cors headers on API routes
    '/api/**': { cors: true },
  },
  devtools: { enabled: false }
})