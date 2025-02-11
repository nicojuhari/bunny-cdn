<script setup lang="ts">
    import config from "@/config";
	const appConfig = useAppConfig()
</script>
<template>
    <footer class="border-t border-gray-200"> 
			<div class="container py-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="w-72 flex items-center gap-4">
						<nuxt-link
							to="/"
							aria-current="page"
							class="flex gap-2 justify-center md:justify-start items-center"
						>
						<img
							src="/logo.svg"
							:alt="`${appConfig.appName} logo`"
							class="w-8 h-auto"
						/>
						
						</nuxt-link>
						<p class="text-sm md:text-base">
							{{ appConfig.appDescription }}
						</p>
					</div>
					<div class="flex flex-col gap-6 md:flex-row md:justify-end">
						<nuxt-link to="/terms-and-conditions" title="Terms and Conditions">Terms and Conditions</nuxt-link>
						<nuxt-link to="/privacy-policy" title="Privacy Policy">Privacy Policy</nuxt-link>
					</div>
				</div>
				<div class="grid text-sm grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<div class="text-center md:text-left">
						&copy; {{ new Date().getFullYear() }} - 
						<strong class="tracking-tight font-semibold">
							{{ appConfig.appName }}
						</strong>
					</div>
					<div class="gap-2.5 inline-flex items-center text-center justify-center md:text-right md:justify-end">Created with <UIcon name="i-ph-heart-fill" class="text-red-600 h-4"></UIcon><nuxt-link to="https://nicojuhari.com/" target="_blank" external>by Nick</nuxt-link></div>
				</div>
			</div>
		</footer>
</template>
