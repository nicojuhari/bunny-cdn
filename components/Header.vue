<script setup lang="ts">
    import { onClickOutside } from '@vueuse/core'
    const route = useRoute();
    const appConfig = useAppConfig();
    const isOpen = ref(false);
    const mobileMenu = ref(null);
    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    };
    const links = [
        {
            href: "/about",
            label: "About",
        },
        {
            href: "/blog",
            label: "Blog",
        },
        {
            href: "/contact",
            label: "Contact",
        },
    ];

    //on router change, close the menu
    watch(() =>route.fullPath, () => {
        isOpen.value = false;
    });

    onClickOutside(mobileMenu, () => {
        isOpen.value = false;
    })
</script>
<template>
    <header class="bg-white border-b border-gray-200">
        <nav class="container flex items-center justify-between h-14">
            <!-- Logo -->
            <nuxt-link to="/" :title="`${appConfig.appName} hompage`">
                <img src="/logo.svg" :alt="`${appConfig.appName} logo`" class="h-8" />
            </nuxt-link>
            <!-- Mobile menu button -->
            <UButton class="text-black cursor-pointer lg:hidden" icon="i-ph-list" variant="ghost" color="neutral" square @click="toggleMenu"></UButton>
            <!-- Desktop menu -->
            <div class="hidden lg:flex justify-center gap-12 items-center">
                <nuxt-link v-for="link in links" :key="link.href" :to="link.href" :title="link.label">{{ link.label }}</nuxt-link>
                <MainCTA/>
            </div>
        </nav>

        <!-- Mobile menu -->
        <div class="fixed inset-0 bg-black/50 z-50" :class="{'hidden': !isOpen}">
            <div class="fixed inset-y-0 bg-white right-0 z-10 w-full px-8 py-4 overflow-y-auto sm:max-w-sm shadow-lg transform origin-right transition ease-in-out duration-300" ref="mobileMenu">
        
                <!-- Logo -->
                <div class="flex items-center justify-between">
                    <nuxt-link
                        class="flex items-center gap-2 shrink-0 "
                        :title="`${appConfig.appName} hompage`"
                        to="/"
                        >
                        <img
                            src="/logo.svg"
                            :alt="`${appConfig.appName} logo`"
                            class="w-8"
                        />
                    <span class="font-extrabold text-lg">{{ appConfig.appName }}</span>
                </nuxt-link>
                <!-- Close button -->
                 <UButton class="text-black cursor-pointer lg:hidden" icon="i-ph-x" variant="ghost" color="neutral" square @click="toggleMenu"></UButton>
            </div>

            <div class="flow-root mt-6">
                <div class="py-4">
                <div class="flex flex-col gap-y-4 items-start">
                    <nuxt-link
                    v-for="link in links"
                        :to="link.href"
                        :key="link.href"
                        class="link link-hover"
                        :title="link.label"
                    >
                        {{ link.label }}
                    </nuxt-link>
                </div>
                </div>
                <!-- Divider -->
                <div class="border-t border-gray-200 mb-4"></div>
                <!-- CTA -->
                <MainCTA/>
            </div>
            </div>
        </div>
    </header>
</template>

