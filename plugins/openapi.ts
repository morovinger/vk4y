export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const script = document.createElement('script');
        script.src = 'https://vk.com/js/api/openapi.js';
        script.onload = () => {
            // SDK is loaded and available
            console.log('VK openapi is loaded');
        };
        document.head.appendChild(script);
    }
});