// app.js — главный скрипт StayFind
// Авторизация, поиск, бронирование, личный кабинет

// ---- Данные отелей по умолчанию (если XML не загрузился) ----
const DEFAULT_HOTELS_DATA = [
  { id: 1, name: 'Four Seasons Resort', city: 'Mahé', stars: 5, rating: 9.7, price: 42000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'breakfast'], address: 'Petite Anse, Mahé', description: 'Бесконечный бассейн с видом на океан и вилла на склоне горы.' },
  { id: 2, name: 'Constance Lemuria', city: 'Praslin', stars: 5, rating: 9.6, price: 55000, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'parking', 'breakfast'], address: 'Anse Kerlan, Praslin', description: 'Резорт у пляжа Anse Georgette — один из лучших в мире.' },
  { id: 3, name: 'North Island Lodge', city: 'North Island', stars: 5, rating: 9.8, price: 120000, image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'breakfast'], address: 'North Island', description: 'Частный остров только для 11 вилл. Абсолютное уединение.' },
  { id: 4, name: 'Fregate Island Private', city: 'Fregate', stars: 5, rating: 9.5, price: 95000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'parking'], address: 'Fregate Island', description: 'Частный остров с виллами и нетронутой природой.' },
  { id: 5, name: 'Maia Luxury Resort & Spa', city: 'Mahé', stars: 5, rating: 9.4, price: 38000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'breakfast'], address: 'Anse Louis, Mahé', description: 'Виллы с бассейном на юго-западе Махэ.' },
  { id: 6, name: 'Anantara Maia Seychelles', city: 'Mahé', stars: 5, rating: 9.3, price: 28000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', amenities: ['wifi', 'pool', 'parking'], address: 'Anse Boileau, Mahé', description: 'Уединённый бутик-резорт на берегу тихой бухты.' },
  { id: 7, name: 'Raffles Seychelles', city: 'Praslin', stars: 5, rating: 9.5, price: 48000, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'breakfast'], address: 'Anse Takamaka, Praslin', description: 'Роскошные виллы с прямым выходом на пляж.' },
  { id: 8, name: 'Bird Island Lodge', city: 'Bird Island', stars: 4, rating: 9.0, price: 18000, image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80', amenities: ['wifi', 'breakfast'], address: 'Bird Island', description: 'Экологический резорт на острове птиц. Черепахи и кораллы.' },
  { id: 9, name: "Le Domaine de L'Orangeraie", city: 'La Digue', stars: 5, rating: 9.2, price: 32000, image: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?w=600&q=80', amenities: ['wifi', 'pool', 'spa'], address: 'Anse Severe, La Digue', description: "Виллы среди пальм в 5 минутах от Anse Source d'Argent." },
  { id: 10, name: 'Kempinski Seychelles', city: 'Mahé', stars: 5, rating: 9.1, price: 22000, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', amenities: ['wifi', 'pool', 'parking', 'breakfast'], address: 'Baie Lazare, Mahé', description: 'Пляж Baie Lazare — спокойные воды и коралловые рифы.' },
  { id: 11, name: 'Hilton Seychelles Labriz', city: 'Silhouette', stars: 5, rating: 9.3, price: 35000, image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'breakfast'], address: 'Silhouette Island', description: 'Остров Силуэт — нетронутые леса и белейшие пляжи.' },
  { id: 12, name: 'Banyan Tree Seychelles', city: 'Mahé', stars: 5, rating: 9.4, price: 40000, image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'parking'], address: 'Anse Intendance, Mahé', description: 'Бесконечный вид на горизонт Индийского океана.' },
  { id: 13, name: 'Coral Strand Hotel', city: 'Mahé', stars: 3, rating: 8.2, price: 12000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', amenities: ['wifi', 'pool', 'breakfast'], address: 'Beau Vallon, Mahé', description: 'Уютный отель на пляже Бо-Валлон с видом на закат.' },
  { id: 14, name: 'Berjaya Praslin Resort', city: 'Praslin', stars: 3, rating: 7.9, price: 9500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', amenities: ['wifi', 'pool'], address: 'Anse Volbert, Praslin', description: 'Бюджетный вариант на побережье Кот-д\'Ор.' },
  { id: 15, name: 'La Digue Island Lodge', city: 'La Digue', stars: 3, rating: 8.0, price: 11000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', amenities: ['wifi', 'breakfast'], address: 'Anse Reunion, La Digue', description: 'Тропический лодж среди пальм в сердце Ла-Диг.' }
];

let HOTELS_DATA = DEFAULT_HOTELS_DATA;

// Словарь удобств
const AMENITY_LABELS = { wifi: 'Wi-Fi', pool: 'Бассейн', spa: 'Спа', parking: 'Парковка', breakfast: 'Завтрак' };

// ---- Вспомогательные функции ----

// Получить элемент по id (сокращение для document.getElementById)
const $ = (id) => document.getElementById(id);

// Работа с localStorage
function getUsers() { return JSON.parse(localStorage.getItem('sf_users') || '[]'); }
function saveUsers(users) { localStorage.setItem('sf_users', JSON.stringify(users)); }
function getCurrentUser() { return JSON.parse(localStorage.getItem('sf_currentUser') || 'null'); }
function setCurrentUser(user) { localStorage.setItem('sf_currentUser', JSON.stringify(user)); }

// Сохранить текущего пользователя и в общий массив тоже
// (вызывается при бронировании, смене пароля, обновлении профиля и т.д.)
function syncUser(user) {
  setCurrentUser(user);
  const users = getUsers();
  const i = users.findIndex((u) => u.id === user.id);
  if (i >= 0) { users[i] = user; saveUsers(users); }
}

// Показать всплывающее уведомление
function showToast(msg, type = 'success') {
  const t = $('toast');
  if (!t) return;
  t.textContent = (type === 'error' ? 'Ошибка: ' : '') + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ---- Загрузка отелей из XML ----

async function loadHotelsFromXml() {
  try {
    const resp = await fetch('data/hotels.xml', { cache: 'no-cache' });
    if (!resp.ok) return DEFAULT_HOTELS_DATA;
    const doc = new DOMParser().parseFromString(await resp.text(), 'application/xml');
    if (doc.querySelector('parsererror')) return DEFAULT_HOTELS_DATA;

    const hotels = Array.from(doc.querySelectorAll('hotel')).map((h) => ({
      id: Number(h.getAttribute('id')),
      name: h.querySelector('name')?.textContent.trim() || '',
      city: h.querySelector('city')?.textContent.trim() || '',
      stars: Number(h.querySelector('stars')?.textContent || 0),
      rating: Number(h.querySelector('rating')?.textContent || 0),
      price: Number(h.querySelector('price')?.textContent || 0),
      image: h.querySelector('image')?.textContent.trim() || '',
      address: h.querySelector('address')?.textContent.trim() || '',
      description: h.querySelector('description')?.textContent.trim() || '',
      amenities: Array.from(h.querySelectorAll('amenity')).map((a) => a.textContent.trim())
    })).filter((h) => h.id && h.name);

    return hotels.length > 0 ? hotels : DEFAULT_HOTELS_DATA;
  } catch (e) {
    return DEFAULT_HOTELS_DATA;
  }
}

// ---- Splash-экран (Вход / Регистрация) ----

// Переключение табов
function sfTab(tab) {
  $('stab-login')?.classList.toggle('active', tab === 'login');
  $('stab-reg')?.classList.toggle('active', tab === 'reg');
  const login = $('sf-login'), reg = $('sf-reg');
  if (login) login.style.display = tab === 'login' ? 'flex' : 'none';
  if (reg) reg.style.display = tab === 'reg' ? 'flex' : 'none';
  $('sfLoginErr')?.classList.remove('visible');
  $('sfRegErr')?.classList.remove('visible');
}

// Показ/скрытие пароля
function sfTogglePwd() {
  const inp = $('sfPwd'), icon = $('sfEye');
  if (!inp || !icon) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  icon.className = inp.type === 'password' ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
}

// Показать ошибку
function sfErr(id, msg) {
  const el = $(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
}

// Демо-вход через соцсеть (Facebook / Google)
function sfSocialLogin(provider) {
  const name = provider === 'facebook' ? 'Facebook User' : 'Google User';
  const email = provider + '@demo.stayfind.com';
  const users = getUsers();
  let user = users.find((u) => u.email === email);
  if (!user) {
    user = { id: Date.now(), name, email, password: 'social', phone: '', city: '', bookings: [], favorites: [] };
    users.push(user);
    saveUsers(users);
  }
  setCurrentUser(user);
  hideSplash();
  updateAuthUI();
  showToast('Вход через ' + (provider === 'facebook' ? 'Facebook' : 'Google') + '!');
}

// Восстановление пароля (демо)
function sfForgotPassword() {
  const email = $('sfEmail')?.value.trim().toLowerCase();
  if (!email) { sfErr('sfLoginErr', 'Введите email для восстановления.'); return; }
  const user = getUsers().find((u) => u.email === email);
  if (!user) { sfErr('sfLoginErr', 'Аккаунт с таким email не найден.'); return; }
  showToast('Письмо для восстановления отправлено на ' + email);
}

// Скрыть splash
function hideSplash() {
  const s = $('splashScreen');
  if (!s) return;
  s.classList.add('hidden');
  setTimeout(() => { s.style.display = 'none'; }, 680);
}

// Вход
function sfLogin() {
  const email = $('sfEmail')?.value.trim().toLowerCase();
  const pwd = $('sfPwd')?.value;
  if (!email || !pwd) { sfErr('sfLoginErr', 'Заполните все поля.'); return; }

  const user = getUsers().find((u) => u.email === email && u.password === pwd);
  if (!user) { sfErr('sfLoginErr', 'Неверный email или пароль.'); return; }

  setCurrentUser(user);
  hideSplash();
  updateAuthUI();
  showToast('С возвращением, ' + user.name + '!');
}

// Регистрация
function sfRegister() {
  const name = $('sfRegName')?.value.trim();
  const email = $('sfRegEmail')?.value.trim().toLowerCase();
  const pwd = $('sfRegPwd')?.value;
  const confirm = $('sfRegConfirm')?.value;

  if (!name || !email || !pwd || !confirm) { sfErr('sfRegErr', 'Заполните все поля.'); return; }
  if (pwd.length < 6) { sfErr('sfRegErr', 'Пароль — не менее 6 символов.'); return; }
  if (pwd !== confirm) { sfErr('sfRegErr', 'Пароли не совпадают.'); return; }

  const users = getUsers();
  if (users.find((u) => u.email === email)) { sfErr('sfRegErr', 'Email уже зарегистрирован.'); return; }

  const user = { id: Date.now(), name, email, password: pwd, phone: '', city: '', bookings: [], favorites: [] };
  users.push(user);
  saveUsers(users);
  setCurrentUser(user);
  hideSplash();
  updateAuthUI();
  showToast('Добро пожаловать, ' + name + '!');
}

// ---- UI авторизации ----

function updateAuthUI() {
  const user = getCurrentUser();
  const link = $('authLink');

  if (link) {
    if (user) {
      link.textContent = user.name;
      link.href = 'account.html';
      link.onclick = null;
    } else {
      link.textContent = 'Войти';
      link.href = '#';
      link.onclick = (e) => {
        e.preventDefault();
        const s = $('splashScreen');
        if (s) { s.style.display = 'flex'; s.classList.remove('hidden'); sfTab('login'); }
        else window.location.href = 'index.html';
      };
    }
  }

  // Страница аккаунта — заполняем профиль
  if (window.location.pathname.endsWith('account.html')) {
    if (!user) { window.location.href = 'index.html'; return; }
    const fields = { accountName: 'name', profileName: 'name', profileEmail: 'email', profilePhone: 'phone', profileCity: 'city' };
    for (const [id, key] of Object.entries(fields)) {
      const el = $(id);
      if (el) el[el.tagName === 'INPUT' ? 'value' : 'textContent'] = user[key] || '';
    }
    renderBookings();
    renderFavorites();
  }
}

function handleLogout() {
  localStorage.removeItem('sf_currentUser');
  updateAuthUI();
  showToast('Вы вышли из аккаунта');
  setTimeout(() => { window.location.href = 'index.html'; }, 600);
}

// ---- Поиск ----

function handleSearch(event) {
  event.preventDefault();
  const params = new URLSearchParams();
  const city = $('city')?.value.trim() || $('stickyCity')?.value.trim();
  const checkin = $('checkin')?.value || $('stickyCheckin')?.value;
  const checkout = $('checkout')?.value || $('stickyCheckout')?.value;
  const guests = $('guests')?.value;

  if (city) params.set('city', city);
  if (checkin) params.set('checkin', checkin);
  if (checkout) params.set('checkout', checkout);
  if (guests) params.set('guests', guests);
  window.location.href = 'search.html?' + params.toString();
}

// ---- Результаты поиска ----

function renderSearchResults(hotels) {
  const box = $('resultsList');
  if (!box) return;

  if (hotels.length === 0) {
    box.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>По вашему запросу ничего не найдено.<br>Попробуйте изменить параметры поиска.</p></div>';
    return;
  }

  box.innerHTML = hotels.map((h) => `
    <div class="result-card" data-id="${h.id}" onclick="openHotelModal(${h.id})" role="button" tabindex="0">
      <div class="result-image"><img src="${h.image}" alt="${h.name}" loading="lazy"></div>
      <div class="result-info">
        <div class="result-top">
          <div><div class="result-name">${h.name}</div><div class="hotel-stars">${'★'.repeat(h.stars)}${'☆'.repeat(5 - h.stars)}</div></div>
          <div class="hotel-rating"><span>⭐</span> ${h.rating}</div>
        </div>
        <div class="result-location">📍 ${h.address}, ${h.city}</div>
        <p class="result-description">${h.description}</p>
        <div class="result-amenities">${h.amenities.map((a) => `<span class="amenity-tag">${AMENITY_LABELS[a] || a}</span>`).join('')}</div>
        <div class="result-bottom"><div class="result-price">${h.price.toLocaleString('ru-RU')} ₽ <span>/ ночь</span></div><button class="btn-primary" onclick="event.stopPropagation();bookHotel(${h.id})">Забронировать</button></div>
      </div>
    </div>
  `).join('');
}

// ---- Фильтры ----

function applyFilters() {
  const params = new URLSearchParams(window.location.search);
  const city = (params.get('city') || $('city')?.value || '').toLowerCase();
  let list = HOTELS_DATA;

  if (city) list = list.filter((h) => h.city.toLowerCase().includes(city));

  const maxPrice = Number($('priceMax')?.value) || Infinity;
  list = list.filter((h) => h.price <= maxPrice);

  const stars = Array.from(document.querySelectorAll('.filters-panel input[type="checkbox"]:checked')).map((c) => Number(c.value));
  if (stars.length) list = list.filter((h) => stars.includes(h.stars));

  renderSearchResults(list);
}

function resetFilters() {
  document.querySelectorAll('.filters-panel input').forEach((inp) => {
    if (inp.type === 'checkbox') inp.checked = false;
    if (inp.type === 'number') inp.value = '';
  });
  applyFilters();
}

// ---- Модальное окно отеля ----

function openHotelModal(hotelId) {
  const hotel = HOTELS_DATA.find((h) => h.id === hotelId);
  if (!hotel) return;

  const modal = $('hotelModal');
  const body = $('hotelModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <img class="modal-hero-img" src="${hotel.image}" alt="${hotel.name}">
    <div class="modal-body">
      <div class="modal-title">${hotel.name}</div>
      <div class="modal-stars">${'★'.repeat(hotel.stars)}${'☆'.repeat(5 - hotel.stars)} <span style="color:#ccc;font-size:0.9rem">(${hotel.rating}/10)</span></div>
      <div class="modal-location">📍 ${hotel.address}, ${hotel.city}</div>
      <p class="modal-desc">${hotel.description}</p>
      <div class="modal-amenities">${hotel.amenities.map((a) => `<span class="amenity-tag">${AMENITY_LABELS[a] || a}</span>`).join('')}</div>
      <div class="modal-bottom">
        <div class="modal-price">${hotel.price.toLocaleString('ru-RU')} ₽ <span>/ ночь</span></div>
        <button class="btn-primary" onclick="closeHotelModal();bookHotel(${hotel.id})">Забронировать</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeHotelModal() {
  const modal = $('hotelModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Бронирование ----

async function bookHotel(hotelId) {
  const user = getCurrentUser();
  if (!user) {
    showToast('Войдите в аккаунт для бронирования', 'error');
    const s = $('splashScreen');
    if (s) s.style.display = 'flex';
    return;
  }

  const hotel = HOTELS_DATA.find((h) => h.id === hotelId);
  if (!hotel) return;

  user.bookings = user.bookings || [];
  user.bookings.push({
    hotelId: hotel.id, hotelName: hotel.name, city: hotel.city, image: hotel.image,
    checkin: $('checkin')?.value || '2026-05-10',
    checkout: $('checkout')?.value || '2026-05-15',
    status: 'confirmed', statusLabel: 'Подтверждено',
    totalPrice: hotel.price * 5
  });
  syncUser(user);
  showToast('Отель «' + hotel.name + '» успешно забронирован!');
}

// ---- Бронирования (отображение) ----

function renderBookings() {
  const box = $('bookingsList');
  if (!box) return;
  const user = getCurrentUser();
  if (!user?.bookings?.length) {
    box.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><p>У вас пока нет бронирований</p></div>';
    return;
  }
  box.innerHTML = user.bookings.map((b) => `
    <div class="booking-card">
      <div class="booking-thumb"><img src="${b.image}" alt="${b.hotelName}"></div>
      <div class="booking-details"><h4>${b.hotelName}</h4><p>📍 ${b.city} · 📅 ${b.checkin} — ${b.checkout}</p><p class="booking-price">${b.totalPrice?.toLocaleString('ru-RU')} ₽</p></div>
      <div class="booking-status ${b.status}">${b.statusLabel}</div>
    </div>
  `).join('');
}

// ---- Избранное ----

function renderFavorites() {
  const box = $('favoritesList');
  if (!box) return;
  const user = getCurrentUser();
  const favs = HOTELS_DATA.filter((h) => user?.favorites?.includes(h.id));
  if (!favs.length) {
    box.innerHTML = '<div class="empty-state empty-state-wide"><div class="empty-icon">❤️</div><p>Список избранного пуст.</p></div>';
    return;
  }
  box.innerHTML = favs.map((h) => `
    <div class="fav-card"><div class="fav-card-image"><img src="${h.image}" alt="${h.name}"></div><div class="fav-card-info"><h4>${h.name}</h4><p class="text-muted">${h.city}</p></div><div class="fav-card-footer"><span>${h.price.toLocaleString('ru-RU')} ₽ / ночь</span><button class="danger-link" onclick="removeFavorite(${h.id})">Удалить</button></div></div>
  `).join('');
}

function removeFavorite(hotelId) {
  const user = getCurrentUser();
  if (!user) return;
  user.favorites = (user.favorites || []).filter((id) => id !== hotelId);
  syncUser(user);
  renderFavorites();
  showToast('Удалено из избранного');
}

// ---- Профиль и настройки ----

function saveProfile() {
  const user = getCurrentUser();
  if (!user) return;
  user.name = $('profileName')?.value.trim() || user.name;
  user.phone = $('profilePhone')?.value.trim() || '';
  user.city = $('profileCity')?.value.trim() || '';
  syncUser(user);
  updateAuthUI();
  showToast('Профиль обновлён');
}

function changePassword() {
  const pwd = $('newPassword')?.value;
  const confirm = $('confirmNewPassword')?.value;
  const user = getCurrentUser();
  if (!user) return;

  if (!pwd || pwd.length < 6) { showToast('Пароль должен быть не менее 6 символов', 'error'); return; }
  if (pwd !== confirm) { showToast('Пароли не совпадают', 'error'); return; }

  user.password = pwd;
  syncUser(user);
  $('newPassword').value = '';
  $('confirmNewPassword').value = '';
  showToast('Пароль успешно изменён');
}

function deleteAccount() {
  if (!confirm('Вы уверены? Все данные будут удалены навсегда.')) return;
  const user = getCurrentUser();
  if (!user) return;
  saveUsers(getUsers().filter((u) => u.id !== user.id));
  localStorage.removeItem('sf_currentUser');
  showToast('Аккаунт удалён');
  setTimeout(() => { window.location.href = 'index.html'; }, 1000);
}

// Переключение вкладок аккаунта
function switchAccountTab(event, section) {
  event?.preventDefault();
  document.querySelectorAll('.account-nav a').forEach((a) => a.classList.remove('active'));
  event?.currentTarget?.classList.add('active');
  document.querySelectorAll('.account-section').forEach((s) => s.classList.remove('active'));
  $('section-' + section)?.classList.add('active');
}

// ---- Инициализация ----

function setDefaultDates() {
  const ci = $('checkin') || $('stickyCheckin');
  const co = $('checkout') || $('stickyCheckout');
  if (!ci || !co) return;
  const d = new Date();
  const d1 = new Date(d); d1.setDate(d1.getDate() + 1);
  const d2 = new Date(d); d2.setDate(d2.getDate() + 3);
  ci.value = d1.toISOString().split('T')[0];
  co.value = d2.toISOString().split('T')[0];
}

function initSearchPage() {
  if (!window.location.pathname.endsWith('search.html')) return;
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city') || '';
  if (city) {
    const inp = $('city');
    if (inp) inp.value = city;
    const count = HOTELS_DATA.filter((h) => h.city.toLowerCase().includes(city.toLowerCase())).length;
    const t = $('searchPageTitle'), s = $('searchPageSubtitle');
    if (t) t.textContent = 'Отели: ' + city;
    if (s) s.textContent = 'Найдено ' + count + ' предложений';
  }
  ['checkin', 'checkout', 'guests'].forEach((name) => {
    const el = $(name);
    if (el && params.get(name)) el.value = params.get(name);
  });
  applyFilters();
}

function initHomePage() {
  const splash = $('splashScreen');
  if (splash && getCurrentUser()) splash.style.display = 'none';

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !splash || splash.classList.contains('hidden') || splash.style.display === 'none') return;
    $('sf-login').style.display !== 'none' ? sfLogin() : sfRegister();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  const bar = $('stickySearch'), hero = document.querySelector('.hero');
  if (bar && hero) {
    window.addEventListener('scroll', () => {
      bar.classList.toggle('visible', window.scrollY > hero.offsetHeight - 100);
    });
  }
}

function initMobileNav() {
  document.querySelectorAll('.navbar').forEach((nav) => {
    if (!nav.querySelector('.nav-toggle')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-toggle';
      btn.setAttribute('aria-label', 'Открыть меню');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span></span>';
      nav.appendChild(btn);
    }

    const btn = nav.querySelector('.nav-toggle');
    const closeMenu = () => {
      nav.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Открыть меню');
    };

    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.navbar.menu-open').forEach((nav) => nav.querySelector('.nav-toggle')?.click());
  });
}

// Запуск
document.addEventListener('DOMContentLoaded', async () => {
  HOTELS_DATA = await loadHotelsFromXml();
  initMobileNav();
  updateAuthUI();
  setDefaultDates();
  initHomePage();
  initSearchPage();
});
