export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            index: "Home",
            title: "Vk.com album downloader",
            description: "Download you favorite photos form Vk.com for free",
            welcome: 'Welcome',
            home: "Main page",
            about: "About",
            login: 'Login in vk.com',
            logged: 'You are logged in Vk.com',
            logout: 'Logout',
            albums: 'albums',
            photos: 'photos',
            found: 'Found',
            clear: 'Clear',
            check: 'Check',
            error_find: 'Can`t find any anything by this URL',
            error_fetching: 'Error fetching albums',
            error_login: 'Error logging in',
            error_saved: 'We cant get you SAVED album. Use this tool to move your SAVED photos to another album',
            download_by_photos: 'Download all photos',
            download_by_album: 'Download all albums -- soon',
            done:'All done',
            url_not_url: 'URL is required',
            url_not_valid:'Must be valid URL',
            url_not_vk:'Must be VK.com URL',
            url_not_album:'Must contain `album` or `albums` in URL',
            url_not_https:'Must start with `https://',
            about_no_server: 'No files or any other personal data is sends into server. All images and cookies directly process ONlY in your browser',
            about_about:'Its free and open-source tool. Advises and bug-reports are appreciated and can be send at morovinger gmail.com or directly at github project',
            about_move_photo:'Before download 2k+ albums better to split it. For it you can use',
        },
        ru: {
            index: "Главная",
            title: "Скачать альбомы с Vk.com",
            description: "Скачайте ваши альбомы с Vk.com бесплатно",
            welcome: 'Привет',
            home: "Главная",
            about: "О нас",
            login: 'Войти через VK.com',
            logged: 'Вы вошли в Vk.com',
            logout: 'Выйти',
            albums: 'альбомов',
            photos: 'фото',
            found: 'Найдено',
            clear: 'Очистить',
            check: 'Проверить',
            error_find: 'Ничего не найдено по этомй ссылке',
            error_fetching: 'Невозможно получить',
            error_login: 'Ошибка логина',
            error_saved: 'Вы не сможете скачать альбом СОХРАНЕННОЕ. Используйте этот тул чтобы переместить фото из него в другой альбом',
            download_by_photos: 'Скачать все фото',
            download_by_album: 'Скачать все альбомы -- Скоро',
            done:'Все скачено',
            url_not_url: 'Вставьте URL',
            url_not_valid:'Должен быть валидный URL',
            url_not_vk:'Должен быть vk.com',
            url_not_album:'Url должен содержать album или albums',
            url_not_https:'Url должен начинатся с `https://`',
            about_no_server: 'Никакие файлы либо другие данные НЕ отправляются на сервер. Все картинки и куки обрабатываются прямо в вашем браузере',
            about_about:'Это бесплатная программа с открытым исходным кодом. Отзывы и баги можно отправить на morovinger gmail.com или на гит-хаб проекта',
            about_move_photo:'Чтобы сказать альбомы с 2к+ фото их лучше сначала разделить этой программой',
        }
    }
}))