import { defineNuxtPlugin } from '#app'
import { createGlobalState } from '@vueuse/core'

export default defineNuxtPlugin(() => {
    const id = useGlobalId() // Assuming this is another composable you've defined

    const cookie = useCookie(`vk_app_${id.value}`, {
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

    const useGlobalToken = createGlobalState(() => {
        return cookie.value ? parseCookie(cookie.value) : ''
    })

    console.log(useGlobalToken)

    return {
        provide: {
            globalToken: useGlobalToken
        }
    }

})