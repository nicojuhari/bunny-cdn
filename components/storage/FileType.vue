<script setup>
import { computed } from "vue"

const props = defineProps({
    fileName: {
        required: true,
        type: String
    },
    fileUrl: {
        type: String,
        default: ''
    },
    showFile: {
        type: Boolean,
        default: false
    },
    fileFullUrl: {
        type: String,
        default: ''
    },
})
const checkFileType = (name) => {
    const ext = name.split('.').pop();
    const imgFormats = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'jfif', 'pjpeg', 'pjp', 'avif']
    const videoFormats = ['mp4', 'webm', 'ogg', 'ogv', 'avi', 'mov', 'wmv', 'flv', 'swf', 'avchd']
    const audioFormats = ['mp3', 'wav', 'flac', 'aac', 'wma', 'm4a', 'aiff', 'ape', 'opus']

    if (imgFormats.includes(ext)) return 'image'
    if (videoFormats.includes(ext)) return 'video'
    if (audioFormats.includes(ext)) return 'audio'
    if (ext == 'pdf') return "pdf";
    return false
}

const fileType = checkFileType(props.fileName)
const classNames = "w-full h-full object-cover aspect-square border rounded grid place-items-center"

const fileSrc = computed(() => {
    if (props.fileFullUrl) return props.fileFullUrl
    return `${props.fileUrl}${props.fileName}`
})

</script>
<template>
    <img v-if="fileType == 'image'" :class="classNames" :src="fileSrc" />
    <video v-if="fileType == 'video'" :class="classNames" autoplay="" muted="" playsinline="" loop="">
        <source :src="fileSrc">
    </video>
    <audio v-if="fileType == 'audio'" :class="classNames" class="p-2" muted="true" controls>
        <source :src="fileSrc">
    </audio>
    <div v-if="fileType == 'pdf'" :class="classNames" class="p-2">
        <div class="text-2xl p-2">PDF</div>
        <div class="truncate text-center text-md w-full">{{ fileName }}</div>
    </div>
    <div v-if="!fileType && fileName != ''" :class="classNames">
        <div>Not supported </div>
        <div class="truncate text-center text-md w-full">{{ fileName }}</div>
    </div>
</template>