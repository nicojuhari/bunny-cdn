<script setup>
import { computed, ref } from "vue";
import usePath from "../../use/usePath"
import useStorageZones from '../../use/useStorageZones';

const { currentPath, changePath } = usePath();
const { deleteFileFromServer } = useStorageZones()

const breadCrumbs = computed(() => {
    let crumbs = []
    let path = currentPath.value ? currentPath.value.replace('#', '') : '/'
    let paths = path.split('/')
    paths.forEach((crumb, index) => {
        if (crumb) {
            crumbs.push({
                name: crumb,
                path: paths.slice(0, index + 1).join('/')
            })
        }
    })
    return crumbs
})

const deleteFolder = async (folder) => {

    if (!currentPath.value) return;
    if (!confirm("Are you sure you want to delete this folder?")) return;
    // let url = `https://${storageConfigs.value.url}/${storageConfigs.value.name}/${currentPath.value}`;
    let url = '';
    let result = await deleteFileFromServer(url);

    if (result.HttpCode == 200) {
        let newVal = currentPath.value.replace(folder.name + '/', '')
        //currentPath.value = newVal

        changePath(newVal, true)
    }
}

</script>
<template>
    <section>
        <div class="flex py-3 border-t border-b items-center overflow-scroll">
            <div @click="changePath('', true)" class="cursor-pointer flex gap-2 items-center">
                <Icon name="ph:house-light" class="w-6 h-6" /> Home
            </div>
            <div v-for="crumb in breadCrumbs" class="pl-3 shrink-0">
                <div class="flex items-center">
                    <span class="mr-3 text-2xl">&#8250;</span>
                    <UiIconFolder class="w-6 h-6 mr-1 cursor-pointer" />
                    <span class="cursor-pointer text-gray-500" @click="changePath(crumb.path + '/', true)">{{ crumb.name
                    }}</span>
                </div>
            </div>
            <div v-if="breadCrumbs.length" class="ml-auto pl-4">
                <UButton color="red" class="ml-auto !text-white cursor-pointer"
                    @click="deleteFolder(breadCrumbs[breadCrumbs.length - 1])" title="Delete this folder">
                    <Icon name="ph:trash-light" class="w-6 h-6" />
                </UButton>
            </div>
        </div>
    </section>
</template>