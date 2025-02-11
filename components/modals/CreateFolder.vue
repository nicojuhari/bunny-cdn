<script setup>
import { ref } from "vue";

// import { prepareFileName } from "../../utils";


const { uploadFileToServer } = useFiles();

const folderName = ref("");

const emit = defineEmits(['uploaded', 'close']);

const { currentPath } = usePath();

    const sendToServer = async () => {
        let result;

        if (folderName.value == "") return;

        result = await uploadFileToServer(currentPath.value + prepareFileName(folderName.value) + '/', null);

    if (result.HttpCode == 201) {

        folderName.value = "";

        setTimeout(() => {
            emit('uploaded');
        }, 300);
    }
};
</script>
<template>
    <div>
            <label>Folder Name</label>
            <UInput type="text" v-model="folderName" class="input w-full"/>
        <div class="text-right">
            <UButton @click.prevent="sendToServer" class="mt-6 btn btn-brand-600 ml-auto">Create</UButton>
        </div>
    </div>
</template>