import { ref, readonly } from 'vue';
import { defineStore } from "pinia";


const mainStore = defineStore("main", () => {

    //state
    const state = ref(0);


    const increase = (value: number) => {
        state.value += value;
    }




    return {
        state,
        increase
    };
    
});

export default mainStore;