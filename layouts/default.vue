<script setup>
useHead({
    title: 'A better UI for Bunny CDN',
    meta: [
        { name: 'description', content: 'Enhance your Bunny CDN experience with our user-friendly UI. Effortlessly manage all your bunny.net assets from one convenient page.' }
    ],
})
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <header class="container py-4 flex items-center justify-between">
            <NuxtLink to="/" class="logo flex items-center gap-2">
                <Icon name="logos:bunny-net-icon" class="w-8 h-8" />
                <div class="font-medium text-xl"><i>Bunny</i> CDN</div>
            </NuxtLink>
        </header>
        <div class="flex-auto">
            <slot></slot>
        </div>
        <footer class="border-t">
            <div class="h-14 flex items-center container text-center justify-center gap-1">
                Created with <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" viewBox="0 0 256 256"><path fill="currentColor" d="M236 92c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a8.1 8.1 0 0 1-7.8 0C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36Z"/></svg> by <a href="https://nicojuhari.com" alt="Web design by Nick"> Nick</a>
            </div>
        </footer>
    </div>
</template>