// composables/useGlobalState.js
import { createGlobalState } from '@vueuse/core';

export const useGlobalUserState = createGlobalState(() => {
    return {
        accessToken: null,
        userName: null
    };
});
