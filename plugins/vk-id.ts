export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vkid/sdk@latest/dist-sdk/umd/index.js';
        script.onload = () => {
            // SDK is loaded and available
            console.log('VKID SDK is loaded');
        };
        document.head.appendChild(script);
    }
});