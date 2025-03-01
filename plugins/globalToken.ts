// plugins/vk-auth.client.ts
import { defineNuxtPlugin } from '#app'
import { useCookie } from '#imports'

export default defineNuxtPlugin(() => {
    const vkAppId = useRuntimeConfig().public.vkAppId
    const cookie = useCookie(`vk_app_${vkAppId}`, {
        watch: true,
    })

    function parseCookie(queryString: string) {
        const decodedString = decodeURIComponent(queryString)
        const params = new URLSearchParams(decodedString)
        const result = {}
        for (const [key, value] of params.entries()) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            result[key] = value
        }
        return result
    }

    return {
        provide: {
            token: cookie.value ? parseCookie(cookie.value) : ''
        }
    }
})