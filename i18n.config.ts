export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
            home: "Main page",
            about: "About",
        },
        ru: {
            welcome: 'Привет',
            home: "Главная",
            about: "О нас",
        }
    }
}))