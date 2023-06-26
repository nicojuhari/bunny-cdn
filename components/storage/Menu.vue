<script setup>
import { ref } from "vue"
import useStorageZones, { pullZones, activePullZoneURL } from "../../use/useStorageZones";
import usePath from '../../use/usePath';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const { currentPath } = usePath();
const { getStorageFiles } = useStorageZones();

const showCreateFolderModal = ref(false)

const refreshStorageFiles = () => {
    showCreateFolderModal.value = false
    getStorageFiles(currentPath.value)
}

const showUploadFileModal = () => {
    showModal.value = true
    createFolder.value = false
}

</script>
<template>
    <div class="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                <UButton @click="showUploadFileModal" class="btn btn-success">
                    <Icon name="bx:image-add" class="w-6 h-6" />
                    Upload File
                </UButton>
                <UButton @click="showCreateFolderModal = true" class="btn btn-primary">
                    <Icon name="bx:bxs-folder-plus" class="w-6 h-6" />
                    Create a Folder
                </UButton>
                <UButton @click="refreshStorageFiles" class="btn btn-info bg-opacity-20 border-opacity-20">
                    <Icon name="bx:refresh" class="w-6 h-6" />
                    Refresh
                </UButton>
                <select class="select md:max-w-[200px] " v-model="activePullZoneURL">
                    <option disabled>Select Pull Zone</option>
                    <option v-for="item in pullZones" :key="item" :value="item">{{ item }}</option>
                </select>
                <div class="form-control ml-auto">
                    <label class="label cursor-pointer">
                        <span class="label-text mr-2">Show Images</span>
                        <input type="checkbox" class="toggle" :value="modelValue"  @change="(e) => emit('update:modelValue', e.target.value)" />
                    </label>
                </div>
            </div>
            <UModal v-model="showCreateFolderModal">
                <ModalsCreateFolder @close="showCreateFolderModal = false" @uploaded="refreshStorageFiles"/>
            </UModal>
</template>