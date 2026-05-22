# StayFind

Статический демо-сайт сервиса бронирования отелей StayFind.

## Структура

- `index.html` — главная страница сайта.
- `search.html` — коллекция отелей и фильтры.
- `account.html` — личный кабинет.
- `assets/scss/index.scss` — основной Sass-файл.
- `assets/css/index.css` — скомпилированный CSS для браузера.
- `data/hotels.xml` — XML-каталог отелей, который загружается в `app.js`.
- `sitemap.xml` — XML-карта страниц.

## Команды

```bash
npm install
npm run build:sass
npm run lint
```

Для локальной проверки откройте проект через статический сервер, чтобы браузер мог загрузить XML-файл:

```bash
python3 -m http.server 8000
```
