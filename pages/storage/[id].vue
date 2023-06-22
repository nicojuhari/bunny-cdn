<script setup >
import { ref, computed, watchEffect } from "vue"
import useStorageZones, { storageFiles } from "../../use/useStorageZones";
// import UploadFileModal from "../components/UploadFileModal.vue";
// import BreadCrumbsComp from "../components/BreadCrumbsComp.vue";
// import ImageModal from "../components/ImageModal.vue";

import usePath from '../../use/usePath';
// import UiModal from "../components/ui/UiModal.vue";

const { currentPath, changePath } = usePath();

const showModal = ref(false)
const createFolder = ref(false)
const objectGuid = ref('');

const showImageModal = ref(false)
const showImages = ref(false)
const storageFullUrl = ref('');
const pullZones = ref([])
const pullZoneUrl = ref('')

const { getStorageInfo, storageInfo, getStorageFiles, isLoading } = useStorageZones();

//get Storage Info
getStorageInfo()

//get pull zones for storage
watchEffect(() => {
    storageInfo?.value?.PullZones.forEach(element => {

        if (element?.Hostnames) pullZones.value.push(element?.Hostnames?.[0].Value)

        pullZoneUrl.value = storageInfo?.value?.PullZones?.[0]?.Hostnames?.[0].Value
    });
})

// //get PullZone
// const pullZoneUrl = computed(() => storageInfo?.value?.PullZones?.[0]?.Hostnames?.[0].Value || null)

// //get Storage Files
watchEffect(() => {
    storageFiles.value = []
    // storageFullUrl.value = `https://${storageConfigs.value.url}/${storageConfigs.value.name}/${currentPath.value}`;
    getStorageFiles(currentPath.value)
})


const imgURL = computed(() => {
    return `https://${pullZoneUrl.value}/${currentPath.value}`
})



</script>
<template>
    <div class="container my-6">
        <StorageBreadCrumbs />
            <div class="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                    <UButton @click="showUploadFileModal" class="btn btn-success">
                        <Icon name="bx:image-add" class="w-6 h-6" />
                        Upload File
                    </UButton>
                    <UButton @click="showCreateFolderModal" class="btn btn-primary">
                        <Icon name="bx:bxs-folder-plus" class="w-6 h-6" />
                        Create a Folder
                    </UButton>
                    <UButton @click="refreshStorageFiles" class="btn btn-info bg-opacity-20 border-opacity-20">
                        <Icon name="bx:refresh" class="w-6 h-6" />
                        Refresh
                    </UButton>
                    <select class="select md:max-w-[200px] " v-model="pullZoneUrl">
                        <option disabled>Select Pull Zone</option>
                        <option v-for="item in pullZones" :key="item" :value="item">{{ item }}</option>

                    </select>
                    <div class="form-control ml-auto">
                        <label class="label cursor-pointer">
                            <span class="label-text mr-2">Show Images</span>
                            <input type="checkbox" class="toggle" v-model="showImages" />
                        </label>
                    </div>
                </div>

        <div v-if="!pullZoneUrl && !isLoading" class="my-6">
            <div class="alert alert-error text-white">
                Please connect your Bunny.net storage to a Pull Zone.
            </div>
            <!-- <img src="/bunny.net-connect-pull-zone.png" class="my-4 rounded-lg border"> -->
        </div>
        <UiLoading v-if="isLoading" />


        <section v-else class="my-4">


            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                v-if="storageFiles?.length && pullZoneUrl">
                <div v-for="item in storageFiles" class="rounded-sm overflow-hidden cursor-pointer" :key="item.Guid">
                    <div v-if="!item.IsDirectory" @click.prevent="() => { showImageModal = true; objectGuid = item.Guid }"
                        class="w-full h-full">
                        <StorageFileType v-if="showImages" :fileName="item.ObjectName" :fileUrl="imgURL"
                            :showFile="showImages"></StorageFileType>
                        <div v-else class="aspect-square flex flex-col justify-center p-2">
                            <Icon name="ph:image-light" class="w-2/3 mx-auto h-auto text-gray-300" />
                            <span class="truncate text-center text-md">{{ item.ObjectName }}</span>
                        </div>
                    </div>
                    <div v-else @click.prevent="changePath(item.ObjectName)"
                        class="w-full h-full aspect-square cursor-pointer text-xl flex flex-col relative justify-center">
                        <UiIconFolder class="w-2/3 mx-auto h-auto" />
                        <span class="truncate text-center text-md">{{ item.ObjectName }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="text-center my-16">No Files in This Directory!</div>
        </section>
        <!-- <UploadFileModal v-if="showModal" @uploaded="hadleUploaded" @close="showModal = false" :pathUrl="currentPath"
            :createFolder="createFolder">
        </UploadFileModal>

        <UiModal v-if="showImageModal" modalTitle="File Preview" @close="showImageModal = false">
            <ImageModal :objectGuid="objectGuid" :pullZoneUrl="pullZoneUrl" @close="showImageModal = false" />
        </UiModal> -->

    </div>
</template>