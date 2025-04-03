export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            index: "Home",
            title: "Free Vk.com album downloader",
            use: "Login to VK, paste the link to your albums and the photos will be packaged and downloaded directly in your browser!",
            cookie: "We use cookie",
            description: "Download you favorite photos form Vk.com for free",
            welcome: 'Welcome',
            home: "Main page",
            about: "About & FAQ",
            login: 'Login in vk.com',
            logged: 'You are logged in Vk.com',
            logout: 'Logout',
            album: 'in album',
            albums: 'albums',
            photos: 'photos',
            found: 'Found',
            clear: 'Clear',
            check: 'Check',
            download: 'download',
            done:'All done',
            preparing_download: 'Preparing download...',
            fetching_photos_for: 'Fetching photos for album',
            downloading: 'Downloading',
            error_find: 'Can`t find anything by this URL',
            error_fetching: 'Error fetching albums',
            error_login: 'Error logging in',
            error_saved: 'We cant get you SAVED album. Use this tool to move your SAVED photos to another album',
            error_no_result:'No results found for this',
            error_creating_zip:'Error creating ZIP',
            download_process: 'You images is downloading and packaging, wait for it',
            download_by_photos: 'Download all photos',
            download_by_album: 'Select albums to download',
            download_all_albums_select: 'Select all',
            download_all_albums_deselect: 'De-Select all',
            download_all_too_many: 'Download 10+ albums could take a lot of time, dont turn off you PC, dont close the tab',
            download_archive_too_many: 'Archive more than 1000 of photos could take a lot of time, dont turn off you PC, dont close the tab',
            url_not_url: 'URL is required',
            url_not_valid:'Must be valid URL',
            url_not_vk:'Must be VK.com URL',
            url_not_album:'Must contain `album` or `albums` in URL',
            url_not_https:'Must start with `https://',
            about_small_photos:'Sometimes album could be found or all photos in it very small. At this case try to create new album and move your photos using',
            about_no_server: 'No files or any other personal data is sends into server. All images and cookies directly process ONlY in your browser',
            about_about:'Its free and open-source tool. Advises and bug-reports are appreciated and can be send at morovinger gmail.com or directly at github project',
            about_move_photo:'To download albums with 2k+ images its better to split it up first. For it you can use',
        },
        ru: {
            index: "Главная",
            title: "Скачать альбомы с Vk.com бесплатно",
            use: "Зайдите в вк, вставьте ссылку на ваши альбомы и фото упакуются и скачаются прямо в вашем браузере!",
            cookie: "Мы используем куки",
            description: "Скачайте ваши альбомы с Vk.com бесплатно",
            welcome: 'Привет',
            home: "Главная",
            about: "О нас & FAQ",
            login: 'Войти через VK.com',
            logged: 'Вы вошли в Vk.com',
            logout: 'Выйти',
            album: 'в альбоме',
            albums: 'альбомов',
            photos: 'фото',
            found: 'Найдено',
            clear: 'Очистить',
            check: 'Проверить',
            download: 'скачать',
            done:'Все скачено',
            preparing_download: 'Подготовка к скачиванию...',
            fetching_photos_for: 'Получение фотографий для альбома',
            downloading: 'Скачивание',
            error_find: 'Ничего не найдено по этой ссылке',
            error_fetching: 'Невозможно получить',
            error_login: 'Ошибка логина',
            error_saved: 'Вы не сможете скачать альбом СОХРАНЕННОЕ. Используйте этот тул чтобы переместить фото из него в другой альбом',
            error_no_result:'Результатов для этого URL не найдено',
            error_creating_zip:'Ошибка создания архива',
            download_process: 'Ваши фото скачаиваются и архив создается, ожидайте',
            download_by_photos: 'Скачать все фото',
            download_by_album: 'Выберите альбомы',
            download_all_albums_select: 'Выбрать все',
            download_all_albums_deselect: 'Снять выделение',
            download_all_too_many: 'При скачивании более 10 альбомов может потребоватся много времени, не выключайте пк, не закрывайте вкладку',
            download_archive_too_many: 'Упаковать больше 1000 фото может потребоватся много времени, не выключайте пк, не закрывайте вкладку',
            url_not_url: 'Вставьте URL',
            url_not_valid:'Должен быть валидный URL',
            url_not_vk:'Должен быть vk.com',
            url_not_album:'Url должен содержать album или albums',
            url_not_https:'Url должен начинатся с `https://`',
            about_small_photos:'Иногда альбом не качается или все картинки в нем маленькие. Такое бывает с очень старыми альбомами. Попробуйте перенести свои фото в новый альбом используя',
            about_no_server: 'Никакие файлы либо другие данные НЕ отправляются на сервер. Все картинки и куки обрабатываются прямо в вашем браузере',
            about_about:'Это бесплатная программа с открытым исходным кодом. Отзывы и баги можно отправить на morovinger gmail.com или на гит-хаб проекта',
            about_move_photo:'Чтобы сказать альбомы с 2к+ фото их лучше сначала разделить этой программой',
        }
    }
}))