<script setup>
import { ref } from 'vue'

const { getStorageZones } = useStorageZones()

const emit = defineEmits(['close'])
const isLoading = ref(false)
const storageApiKey = ref('')
const fetchSuccess = ref(true)

const connectToStorage = async () => {
    isLoading.value = true
    fetchSuccess.value = await getStorageZones(storageApiKey.value)
    isLoading.value = false
    if (fetchSuccess.value) {
        emit('close')
    }
}
</script>
<template>
    <div>
        <UInput label="API key" type="text" class="w-full outline-none" v-model="storageApiKey" />
        <div class="alert alert-red text-sm" v-if="!fetchSuccess">Couldn't fetch, please check your API key and try again
        </div>
        <a class="flex items-center gap-2 my-4 text-blue-500" href="https://dash.bunny.net/account/settings?ref=kw3bknywrh"
            target="_blank">Get your API key from<br>Bunny.net => Dashboard => Account => Settings
            <Icon name="ph:arrow-fat-lines-right-light" class="w-6 h-6" />
        </a>
        <!-- <img src="/get-bunny-api-key.gif" class="max-w-full rounded-lg mt-2 mb-6 border h-auto" /> -->
        <UButton @click="connectToStorage"
            :disabled="storageApiKey.length < 50">Connect</UButton>
        <Loading v-if="isLoading" />
    </div>
</template>