// plugins/vk-auth.client.ts
import { defineNuxtPlugin } from '#app'
import { useCookie } from '#imports'

export default defineNuxtPlugin(() => {
    const vkAppId = useRuntimeConfig().public.vkAppId
    const cookie = useCookie(`vk_app_${vkAppId}`) // Remove watch: true

    // Parse once during plugin initialization
    const token = ref(parseCookie(cookie.value))

    return {
        provide: { token }
    }
})

// Simple non-reactive parser (no need for watch)
function parseCookie(value?: string) {
    if (!value) return null
    return Object.fromEntries(new URLSearchParams(decodeURIComponent(value)))
}