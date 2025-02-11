<script setup>
import useStorageZones, { pullZones, activePullZoneURL } from "../../../composables/useStorageZones";

const { showImages } = useConfigs() 

const { currentPath } = usePath();
const { getStorageFiles } = useStorageZones();

const showCreateFolderModal = ref(false)
const showUploadFileModal = ref(false)

const refreshStorageFiles = () => {
    showCreateFolderModal.value = false
    showUploadFileModal.value = false
    getStorageFiles(currentPath.value)
}

</script>
<template>
    <div class="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
        <UButton @click="showUploadFileModal = true" color="primary">
            <Icon name="i-ph-plus-light" class="w-6 h-6" />
            Upload File
        </UButton>
        <UButton @click="showCreateFolderModal = true" color="neutral">
            <Icon name="i-ph-folder-simple-plus" class="w-6 h-6" />
            Create a Folder
        </UButton>
        
        <UButton @click="refreshStorageFiles" variant="outline">
            <Icon name="bx:refresh" class="w-6 h-6" />
            Refresh
        </UButton>
        <USelect class="select md:max-w-[200px] h-9" v-model="activePullZoneURL" :items="pullZones">
        </USelect>
        <div class="form-control ml-auto flex gap-4 items-center shrink-0 cursor-pointer">
            <UCheckbox v-model="showImages" id="show-images" class="cursor-pointer"/>
            <label for="show-images" class="cursor-pointer">Show Images</label>
        </div>
    </div>
    <UModal v-model:open="showCreateFolderModal" title="Create a Folder"> 
        <template #body>
            <ModalsCreateFolder @close="showCreateFolderModal = false" @uploaded="refreshStorageFiles"/>
        </template>
    </UModal>
    <UModal v-model:open="showUploadFileModal" title="Upload a File">
        <template #body>
            <ModalsUploadFile @close="showUploadFileModal = false" @uploaded="refreshStorageFiles" />
        </template>
    </UModal>
</template>