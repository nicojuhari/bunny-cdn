<script setup lang="ts">
defineProps({
  error: Object,
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
    <div class="relative min-h-screen flex">
        <div class="container m-auto h-full flex flex-col justify-center items-center">
            <h1 class="text-2xl font-bold text-red-500">{{ error?.message }}</h1>
            <UButton @click="handleError" color="error" class="mt-10"> Clear the error</UButton>
        </div>
    </div>
</template>