import { createGlobalState } from '@vueuse/core'
import {useCookie} from "#app";

//extract and check global token from cookie and put it at global if valid
//cookie itself is settings up by vk open api on response itself

const id = useGlobalId();

export const cookie = useCookie(
    `vk_app_${id.value}`,
    {
        watch: true,
    }
)

function parseCookie(queryString: string) {
    const decodedString = decodeURIComponent(queryString);
    const params = new URLSearchParams(decodedString);
    const result = {};
    for (const [key, value] of params.entries()) {
        // @ts-ignore
        result[key] = value;
    }
    return result;
}

export const useGlobalToken = createGlobalState(
    () => {
        return cookie.value ? parseCookie(cookie.value) : ''
    }
)