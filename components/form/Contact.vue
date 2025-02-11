<script setup>
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Must be at least 10 characters"),
});

const formData = reactive({
    name: '',
    email: '',
    message: ''
})

    const sendSuccess = ref(false)
    const sendError = ref(false)
    const loading = ref(false)

    const submitForm = async () => {
        loading.value = true
        try {
            
            formData.subject = formData.name + ' sent an message';
            formData.from_name = 'Website Contact Form';
            
            let response = await $fetch('/api/contact', {
                method: 'POST',
                body: formData
            })
            
            if (response.success) {
                sendSuccess.value = true
                formData.name = ''
                formData.email = ''
                formData.message = ''
            }
        } catch (e) {
            console.error(e)
            sendError.value = true
        } finally {
           
            setTimeout(() => {
                 loading.value = false
            }, 600)

            setTimeout(() => {
                sendError.value = false
                sendSuccess.value = false
            }, 3000)
            
        }
    }
</script>
<template>
    <form type="form" @submit.prevent="submitForm">
        <div class="px-4 py-6 rounded-md bg-white shadow-md flex flex-col gap-6 border border-gray-200 relative">
            <div v-if="sendSuccess" class="text-green-600 my-2 text-sm">
                Your message has been submitted.<br>
                Will respond to you within <strong>48 hours.</strong>
            </div>
            <div v-if="sendError" class="text-red-600 my-2 text-sm">
                Error, we coudn't send your message.<br>
                Try again or send an email.
            </div>
            <UForm :schema="schema" :state="formData" @submit.prevent="submitForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UFormField label="Name" name="name">  
                            <UInput v-model="formData.name"/>
                        </UFormField>
                        <UFormField label="Email" name="email">  
                            <UInput v-model="formData.email"/>
                        </UFormField>
                        <UFormField label="Message" name="message" class="md:col-span-2"> 
                            <UTextarea v-model="formData.message" autoresize :rows="6"/>
                        </UFormField>
                    </div>
                    <UButton type="submit" label="Send" color="primary" block class="w-full mt-4" />
            </UForm>
            <div v-if="loading" class="bg-black flex items-center justify-center bg-opacity-10 p-2 rounded absolute w-full left-0 top-0 h-full">
                Loading ...
            </div>
        </div>
    </form>
</template>