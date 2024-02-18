// useGlobalError.ts
import { ref, readonly } from 'vue';

const errorMessage = ref('');
const showError = ref(false);

export const useGlobalError = () => {
    const setError = (message: string) => {
        errorMessage.value = message;
        showError.value = true;
    };

    const clearError = () => {
        errorMessage.value = '';
        showError.value = false;
    };

    return {
        error: readonly(errorMessage),
        showError: readonly(showError),
        setError,
        clearError
    };
};