

import { ref } from 'vue'


const showImages = ref(false)


export default function useFiles() {
    
    const toggleShowImages = () => showImages.value != showImages.value


    return {
        showImages,
        toggleShowImages
    }

}