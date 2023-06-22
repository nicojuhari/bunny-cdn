import { ref } from "vue";
// import { useRoute, useRouter } from "vue-router";

const currentPath = ref(null);

export default function usePath() {
    const route = useRoute();
    const router = useRouter();

    currentPath.value = route.hash.replace("#", "");
    //console.log(currentPath.value)

    const changePath = (val, staticVal = false) => {
        console.log(val);
        if (val == currentPath.value) return;
        let newHash = "";

        if (staticVal) {
            newHash = val;
        } else {
            newHash = currentPath.value + val + "/";
        }
        currentPath.value = newHash;

        if (newHash.indexOf("#") != 0 && newHash != "") newHash = "#" + newHash;
        router.replace({ hash: newHash });
    };

    return {
        currentPath,
        changePath,
    };
}
