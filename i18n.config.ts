export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
            home: "Main page",
            about: "About",
            login: 'Login in vk.com',
            logged: 'You are logged in Vk.com',
            logout: 'Logout',
            albums: 'albums',
            photos: 'photos',
            found: 'Found',
            error_find: 'Can`t find any anything by this URL',
            error_fetching: 'Error fetching albums',
            error_login: 'Error logging in',
            download_by_photos: 'Download all photos',
            download_by_album: 'Download all albums -- soon'
        },
        ru: {
            welcome: 'Привет',
            home: "Главная",
            about: "О нас",
            login: 'Войти через VK.com',
            logged: 'Вы вошли в Vk.com',
            logout: 'Выйти',
            albums: 'альбомов',
            photos: 'фото',
            found: 'Найдено',
            error_find: 'Ничего не найдено по этомй ссылке',
            error_fetching: 'Невозможно получить',
            error_login: 'Ошибка логина',
            download_by_photos: 'Скачать все фото',
            download_by_album: 'Скачать все альбомы -- Скоро'
        }
    }
}))