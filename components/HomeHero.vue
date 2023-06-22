<script setup>



const listOfFeatures = [
    'Upload and delete files.',
    'Rename your files before uploading.',
    'Navigate through your folders.',
    'Get a shareable link to your files.',
]



</script>

<template>
    <section>
        <div class="container">
            <div class="mt-16 md:mt-24 text-center py-4 max-w-[600px] mx-auto">
                <div class="text-xl md:text-3xl font-bold">Manage your <a class="text-brand-color text-3xl md:text-5xl"
                        href="https://bunny.net?ref=kw3bknywrh" target="_blank">bunny.net</a> assets<br>more easily with a
                    better UI.</div>
                <div class="flex justify-center mt-8">
                    <ul class="grid grid-cols-2 mx-auto gap-2">
                        <li v-for="feature in listOfFeatures" class="flex gap-2 items-center">
                            <Icon name="ph:check-circle-light" class="w-5 h-5 text-green-600" /> {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <StoragesView v-if="storageZones?.length" /> -->
            

            
        </div>
</section>
</template>
          