import { createGlobalState, useStorage } from '@vueuse/core'
import {useCookie} from "#app";

// state
export const useGlobalToken = createGlobalState(
    () => useStorage('globalToken', 0),
)

const id = useGlobalId();

const cookies = useCookie(`vk_app_${id.value}`)
console.log(cookies,id)