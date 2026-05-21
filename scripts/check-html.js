// ==============================================================
// check-html.js — скрипт проверки (линтер) HTML и XML файлов
// Проверяет, что все ключевые файлы проекта существуют и корректны.
// Запуск: node scripts/check-html.js  (или npm run check:html)
// ==============================================================

const fs = require('node:fs');
const path = require('node:path');

// Корневая папка проекта (на уровень выше от scripts/)
const root = path.resolve(__dirname, '..');

// Список обязательных файлов, которые должны существовать и быть непустыми
const files = ['index.html', 'search.html', 'account.html', 'data/hotels.xml'];
let hasError = false;

// 1) Проверяем, что каждый файл не пуст
for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!content.trim()) {
    console.error(`${file} is empty`);
    hasError = true;
  }
}

// 2) Проверяем, что HTML-файлы подключают скомпилированный CSS
//    и не содержат инлайновых стилей (<style> или style="...")
for (const file of ['index.html', 'search.html', 'account.html']) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!content.includes('assets/css/index.css')) {
    console.error(`${file} does not use compiled Sass output`);
    hasError = true;
  }
  if (/<style[\s>]/i.test(content) || /\sstyle="/i.test(content)) {
    console.error(`${file} still contains inline styles`);
    hasError = true;
  }
}

// 3) Проверяем, что в XML-каталоге есть минимум 10 отелей
const xml = fs.readFileSync(path.join(root, 'data/hotels.xml'), 'utf8');
const hotelsCount = (xml.match(/<hotel\s/g) || []).length;
if (hotelsCount < 10) {
  console.error(`Expected at least 10 hotels in XML, found ${hotelsCount}`);
  hasError = true;
}

// Если хотя бы одна проверка не прошла — завершаем с ошибкой
if (hasError) process.exit(1);
console.log('Static HTML, Sass links, and XML data look valid.');
