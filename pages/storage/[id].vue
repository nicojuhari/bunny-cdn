<script setup >
import { ref, computed, watch, watchEffect, onBeforeUnmount } from "vue"
import useStorageZones, { storageFiles, pullZones, activePullZoneURL } from "../../use/useStorageZones";

import usePath from '../../use/usePath';

const { currentPath, changePath } = usePath();

const objectGuid = ref('');

const showImageModal = ref(false)
const showImages = ref(false)


const { getStorageInfo, storageInfo, getStorageFiles, isLoading } = useStorageZones();

getStorageInfo()
// getStorageFiles()
// //get Storage Files
// watchEffect(() => {
//     // storageFiles.value = []
//     getStorageFiles(currentPath.value)
// })

watch(currentPath, () => {
    console.log('currentPath changed')
    getStorageFiles(currentPath.value)
}, { immediate: true })

watchEffect(() => {
    storageInfo?.value?.PullZones.forEach((element) => {
        if (element?.Hostnames) pullZones.value.push(element?.Hostnames?.[0].Value);

        activePullZoneURL.value = storageInfo?.value?.PullZones?.[0]?.Hostnames?.[0].Value;
    });
});

onBeforeUnmount(() => {
    storageFiles.value = [];
    pullZones.value = [];
    activePullZoneURL.value = "";
});

const imgURL = computed(() => {
    return `https://${activePullZoneURL.value}/${currentPath.value}`
})

</script>
<template>
    <div class="container my-6">
        <ClientOnly>
            <StorageBreadCrumbs />
            <StorageMenu v-model="showImages"/>
            <div v-if="!activePullZoneURL && !isLoading" class="my-6">
                <div class="alert alert-error text-white">
                    Please connect your Bunny.net storage to a Pull Zone.
                </div>
                <!-- <img src="/bunny.net-connect-pull-zone.png" class="my-4 rounded-lg border"> -->
            </div>
            <UiLoading v-if="isLoading" />
            <section v-else class="my-4">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    v-if="storageFiles?.length && activePullZoneURL">
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
        </ClientOnly>
        <!-- <UploadFileModal v-if="showModal" @uploaded="hadleUploaded" @close="showModal = false" :pathUrl="currentPath"
            :createFolder="createFolder">
        </UploadFileModal>

        <UiModal v-if="showImageModal" modalTitle="File Preview" @close="showImageModal = false">
            <ImageModal :objectGuid="objectGuid" :pullZoneUrl="pullZoneUrl" @close="showImageModal = false" />
        </UiModal> -->

    </div>
</template>