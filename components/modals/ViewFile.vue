<script setup>
import { ref, computed } from "vue"
import useFiles from '../../use/useFiles';
import usePath from '../../use/usePath';
import { storageFiles, activePullZoneURL } from '../../use/useStorageZones';
import { getImageDimensions, checkFileType } from '../../utils'


const { deleteFileFromServer } = useFiles()
const { currentPath } = usePath();

const props = defineProps({
    objectGuid: {
        required: true,
        type: String
    }
})

const emit = defineEmits(['close']);

const isLoading = ref(false)
const imgDimensions = ref({ width: 0, height: 0 })

const imgObj = computed(() => storageFiles?.value.find(img => img.Guid == props?.objectGuid))
const imgSize = computed(() => {
    if (!imgObj?.value) return 0;
    if (imgObj?.value?.Length >= 1000000) return (imgObj?.value?.Length / 1000000).toFixed(2) + ' Mb'
    else return (imgObj?.value?.Length / 1000).toFixed(2) + ' Kb'
})
const imgURL = computed(() => `https://${activePullZoneURL.value}/${currentPath.value}${imgObj?.value?.ObjectName}`)
if(checkFileType(imgObj?.value?.ObjectName) == 'image') getImageDimensions(imgURL.value).then(val => { imgDimensions.value = val })

const copyToClipboard = () => {
    isLoading.value = true;
    navigator.clipboard.writeText(imgURL);

    setTimeout(() => {
        isLoading.value = false;
    }, 800);
}

const deleteImage = async () => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    let result = await deleteFileFromServer(currentPath.value + imgObj?.value.ObjectName);

    if (result.HttpCode == 200) {


        setTimeout(() => {
            // remove object from array 
            emit('close');

            const idx = storageFiles.value.indexOf(imgObj.value)
            storageFiles.value.splice(idx, 1)

        }, 600);

    }
}
</script>
<template>
    <div class="p-4">
        <div class="flex justify-between my-2">
                    <div class="font-medium">{{ imgObj?.ObjectName }}</div>
                    <Icon name="ph:x-light" class="w-6 h-6 shrink-0 ml-auto cursor-pointer" @click="$emit('close')"/>
                </div>
        <StorageFileType :fileName="imgObj?.ObjectName" :fileUrl="imgURL"></StorageFileType>
        <div class="flex gap-4 justify-between">
            <div class="flex flex-col text-center"><span class="text-sm">Size </span><strong>{{ imgSize }}</strong></div>
            <div class="flex flex-col text-center" v-if="checkFileType(imgObj?.ObjectName) == 'image'"><span class="text-sm">W x H </span><strong>{{ imgDimensions.width }}px x {{ imgDimensions.height }}px </strong></div>
            <div class="flex flex-col text-center"><span class="text-sm">Created at </span><strong>{{ new Date(imgObj?.DateCreated).toLocaleDateString() }}</strong> </div>
        </div>
        
        <div class="flex mt-4 w-full gap-4 justify-end">
            <UButton variant="outline" color="red" square @click="deleteImage">
                <Icon name="ph:trash-light" class="w-6 h-6" />
            </UButton>
            <UButton  color="teal" @click="copyToClipboard">
                Copy URL
                <Icon v-if="isLoading" name="svg-spinners:180-ring" class="w-6 h-6" />
                <Icon v-else name="ph:copy-light" class="w-6 h-6" />
            </UButton>
        </div>
    </div>
</template>