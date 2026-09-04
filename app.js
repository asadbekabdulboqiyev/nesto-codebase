/* ============================================================
   NestoCodebase - app engine
   3D background, GSAP motion, tilt physics, syntax highlighter,
   favorites, recently viewed, command palette, auth, previews.
   ============================================================ */
'use strict';

/* ---------------- Icons ---------------- */
function svg(inner, w, h) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="' + (w || 16) + '" height="' + (h || w || 16) + '" aria-hidden="true">' + inner + '</svg>';
}
var ICONS = {
  rocket: svg('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'),
  document: svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'),
  lock: svg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>'),
  compass: svg('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),
  lightning: svg('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'),
  globe: svg('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>'),
  sparkle: svg('<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>'),
  palette: svg('<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.01 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-9.94-10-9.94z"/>'),
  building: svg('<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>'),
  search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
  copy: svg('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>'),
  code: svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
  download: svg('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
  info: svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
  heart: svg('<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>'),
  command: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/>'),
  arrowUp: svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
  check: svg('<path d="M20 6L9 17l-5-5"/>'),
  book: svg('<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>'),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>'),
  star: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  play: svg('<polygon points="5 3 19 12 5 21 5 3"/>'),
  folder: svg('<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>'),
  menu: svg('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'),
  key: svg('<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>')
};
var HEART_PATH = 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z';
var STAR_PATH = 'M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2';

function icon(name) { return ICONS[name] || ICONS.sparkle; }
function heartIcon(fav) {
  return '<svg viewBox="0 0 24 24" fill="' + (fav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true">' + HEART_PATH + '</svg>';
}
function starIcon(fav) {
  return '<svg viewBox="0 0 24 24" fill="' + (fav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" width="13" height="13" aria-hidden="true">' + STAR_PATH + '</svg>';
}

/* ---------------- Config ---------------- */
var CATEGORIES = [
  { id: 'favorites', n: 'Favorites', icon: 'heart' },
  { id: 'all', n: 'Barchasi', icon: 'sparkle' },
  { id: 'flutter', n: 'Flutter', icon: 'rocket' },
  { id: 'arduino', n: 'Arduino', icon: 'building' },
  { id: 'python', n: 'Python', icon: 'document' },
  { id: 'javascript', n: 'JavaScript', icon: 'globe' },
  { id: 'react', n: 'React', icon: 'sparkle' },
  { id: 'vue', n: 'Vue.js', icon: 'sparkle' },
  { id: 'nodejs', n: 'Node.js', icon: 'globe' },
  { id: 'html-css', n: 'HTML/CSS', icon: 'palette' },
  { id: 'starter', n: 'Starter', icon: 'rocket' },
  { id: 'pages', n: 'Sahifalar', icon: 'document' },
  { id: 'auth', n: 'Auth', icon: 'lock' },
  { id: 'navigation', n: 'Navigation', icon: 'compass' },
  { id: 'state', n: 'State Mgmt', icon: 'lightning' },
  { id: 'api', n: 'API & Backend', icon: 'globe' },
  { id: 'animations', n: 'Animations', icon: 'sparkle' },
  { id: 'ui', n: 'UI Widgets', icon: 'palette' },
  { id: 'advanced', n: 'Advanced', icon: 'building' }
];
var FLUTTER_CATS = ['starter', 'pages', 'auth', 'navigation', 'state', 'api', 'animations', 'ui', 'advanced'];

var LANGUAGES = {
  flutter: { name: 'Flutter', color: '#02569B' },
  arduino: { name: 'Arduino', color: '#00979D' },
  python: { name: 'Python', color: '#3776AB' },
  javascript: { name: 'JavaScript', color: '#F7DF1E' },
  react: { name: 'React', color: '#61DAFB' },
  vue: { name: 'Vue.js', color: '#4FC08D' },
  nodejs: { name: 'Node.js', color: '#339933' },
  'html-css': { name: 'HTML/CSS', color: '#E34F26' }
};
var LANG_COLORS = { flutter: '#02569B', arduino: '#00979D', python: '#3776AB', javascript: '#F7DF1E', react: '#61DAFB', vue: '#4FC08D', nodejs: '#339933', 'html-css': '#E34F26' };
var ICON_FOR_CATEGORY = { flutter: 'rocket', arduino: 'building', python: 'document', javascript: 'globe', react: 'sparkle', vue: 'sparkle', nodejs: 'globe', 'html-css': 'palette', starter: 'rocket', pages: 'document', auth: 'lock', navigation: 'compass', state: 'lightning', api: 'globe', animations: 'sparkle', ui: 'palette', advanced: 'building' };
var DIFF_COLORS = { easy: 'var(--green)', medium: 'var(--yellow)', hard: 'var(--red)', expert: 'var(--purple)' };

var KEYWORDS = {
  flutter: 'abstract as assert async await break case catch class const continue covariant default deferred do dynamic else enum export extends extension external factory false final finally for Function get hide if implements import in interface is late library mixin new null on operator part required rethrow return set show static super switch sync this throw true try typedef var void while with yield',
  python: 'and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield match case',
  javascript: 'as async await break case catch class const continue debugger default delete do else export extends false finally for from function get if import in instanceof let new null of return set static super switch this throw true try typeof undefined var void while with yield',
  arduino: 'void setup loop int long unsigned char boolean byte const static volatile if else for while switch case default break continue return true false HIGH LOW INPUT OUTPUT INPUT_PULLUP delay delayMicroseconds millis micros random randomSeed map constrain min max pow sqrt abs digitalWrite digitalRead analogWrite analogRead pinMode Serial println print begin',
  vue: 'export default data methods computed watch created mounted beforeDestroy props components template v-if v-for v-on v-bind v-model ref name props',
  react: 'import export from const function return if else for while new this super class extends render true false null undefined useState useEffect useRef useMemo useCallback props state',
  nodejs: 'require module exports process console log error const let var function return if else for while new this class extends true false null undefined require express',
  'html-css': 'html head body div span class id style script link meta title'
};

var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ---------------- State ---------------- */
var templates = [], category = 'all', query = '', difficulty = '', currentTemplate = null, currentFileIndex = 0, instructionsOpen = false;
var currentUser = null;
var favorites = loadFavs();
var recent = loadRecent();
var paletteResults = [], paletteIndex = 0;
var USERS_KEY = 'codebase_users', SESSION_KEY = 'codebase_session', FAVS_KEY = 'nesto_favs', RECENT_KEY = 'nesto_recent', THEME_KEY = 'nesto_theme';

var threeState = { renderer: null, camera: null, scene: null, shapes: [], knot: null, streaks: null, streakData: [], raf: 0, running: false, targetX: 0, targetY: 0, onResize: null };

/* ---------------- Helpers ---------------- */
function $(id) { return document.getElementById(id); }
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function loadScript(src, ok, err) {
  var s = document.createElement('script');
  s.src = src; s.async = true;
  s.onload = function () { ok && ok(); };
  s.onerror = function () { err && err(); };
  document.head.appendChild(s);
}
function safeWriteText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  return Promise.resolve();
}

/* ---------------- Storage / Auth ---------------- */
function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch (e) { return []; } }
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
function saveSession(s) { if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s)); else localStorage.removeItem(SESSION_KEY); }

function hashPassword(pass) {
  var hash = 0;
  for (var i = 0; i < pass.length; i++) {
    var chr = pass.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  var h = (Math.abs(hash) * 9301 + 49297).toString(16);
  for (var j = 0; j < pass.length; j++) {
    var c = pass.charCodeAt(j);
    h = ((parseInt(h, 16) << 3) + c + parseInt(h.slice(-2), 16)).toString(16).slice(-8);
  }
  return h;
}
function register(name, email, pass) {
  var users = getUsers();
  if (users.find(function (u) { return u.email === email; })) return { ok: false, msg: 'Email allaqachon ro\'yxatdan o\'tgan' };
  var user = { id: Date.now().toString(36), name: name, email: email, pass: hashPassword(pass), created: new Date().toISOString() };
  users.push(user); saveUsers(users);
  currentUser = { id: user.id, name: user.name, email: user.email };
  saveSession(currentUser);
  return { ok: true, msg: 'Muvaffaqiyatli ro\'yxatdan o\'tildi' };
}
function login(email, pass) {
  var users = getUsers();
  var user = users.find(function (u) { return u.email === email && u.pass === hashPassword(pass); });
  if (!user) return { ok: false, msg: 'Email yoki parol xato' };
  currentUser = { id: user.id, name: user.name, email: user.email };
  saveSession(currentUser);
  return { ok: true, msg: 'Xush kelibsiz, ' + user.name };
}
function logout() { currentUser = null; saveSession(null); updateUserUI(); showAuthModal(); }
function showAuthModal() { $('authOverlay').classList.add('on'); document.body.style.overflow = 'hidden'; }
function closeAuthModal() {
  $('authOverlay').classList.remove('on');
  $('authEmail').value = '';
  $('authPass').value = '';
  if ($('authName')) $('authName').value = '';
  if (!$('modal').classList.contains('on') && !$('instructionsOverlay').classList.contains('on') && !$('previewOverlay').classList.contains('on')) document.body.style.overflow = '';
}
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelector('.auth-tab[data-tab="' + tab + '"]').classList.add('active');
  $('nameField').hidden = tab !== 'register';
  $('authTitle').textContent = tab === 'register' ? "Ro'yxatdan o'tish" : 'Kirish';
}
function handleAuth(e) {
  e.preventDefault();
  var tab = document.querySelector('.auth-tab.active').dataset.tab;
  var email = $('authEmail').value.trim();
  var pass = $('authPass').value.trim();
  var name = $('authName') ? $('authName').value.trim() : '';
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) { showToast('To\'g\'ri email kiriting'); return; }
  if (pass.length < 6) { showToast('Parol kamida 6 ta belgi bo\'lishi kerak'); return; }
  var result;
  if (tab === 'register') {
    if (!name) { showToast('Ism kiriting'); return; }
    result = register(name, email, pass);
  } else {
    result = login(email, pass);
  }
  showToast(result.msg);
  if (result.ok) { closeAuthModal(); updateUserUI(); }
}
function updateUserUI() {
  var el = $('userSection');
  if (currentUser) {
    var initial = (currentUser.name || '?').charAt(0).toUpperCase();
    el.innerHTML = '<div class="s-item" style="cursor:default"><div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--cyan));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0">' + escapeHtml(initial) + '</div><div style="min-width:0"><div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(currentUser.name) + '</div><div style="font-size:10px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(currentUser.email) + '</div></div></div>' +
      '<button class="s-btn" onclick="logout()" style="color:var(--red);border-color:rgba(248,113,113,.4)">' + icon('lock') + 'Chiqish</button>';
  } else {
    el.innerHTML = '<button class="s-btn primary" onclick="showAuthModal()">' + icon('key') + 'Kirish / Ro\'yxatdan o\'tish</button>';
  }
}
function initAuth() {
  var session = getSession();
  if (session) currentUser = session;
  updateUserUI();
}

/* ---------------- Favorites & Recent ---------------- */
function loadFavs() { try { return new Set(JSON.parse(localStorage.getItem(FAVS_KEY)) || []); } catch (e) { return new Set(); } }
function saveFavs() { localStorage.setItem(FAVS_KEY, JSON.stringify(Array.from(favorites))); }
function toggleFav(id) {
  if (!id) return;
  var added = !favorites.has(id);
  if (added) favorites.add(id); else favorites.delete(id);
  saveFavs();
  updateFavBtn();
  if (category === 'favorites') { renderSidebar(); renderGrid(true); }
  else { renderSidebar(); var btn = document.querySelector('.card .fav-heart[data-id="' + id + '"]'); if (btn) btn.outerHTML = heartButtonHTML(id, added); }
  showToast(added ? 'Favoritesga qo\'shildi' : 'Favoritesdan olib tashlandi');
}
function updateFavBtn() {
  var btn = $('favBtn');
  if (!btn) return;
  var on = !!(currentTemplate && favorites.has(currentTemplate.id));
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-label', on ? 'Favoritesdan olib tashlash' : 'Favoritesga qo\'shish');
  btn.innerHTML = heartIcon(on) + (on ? 'Saqlangan' : 'Saqlash');
}

function loadRecent() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; } }
function saveRecent() { localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 8))); }
function trackRecent(id) { recent = recent.filter(function (x) { return x !== id; }); recent.unshift(id); saveRecent(); renderRecent(); }
function clearRecent() { recent = []; saveRecent(); renderRecent(); showToast('Tarix tozalandi'); }
function renderRecent() {
  var sec = $('recentSection'), row = $('recentRow');
  var items = recent.map(function (id) {
    var t = templates.find(function (x) { return x.id === id; });
    if (!t) return '';
    var color = LANG_COLORS[t.c] || '#4f8cff';
    var initial = escapeHtml((t.n || '?').charAt(0).toUpperCase());
    return '<div class="recent-item" role="button" tabindex="0" onclick="openModal(\'' + t.id + '\')" onkeydown="if(event.key===\'Enter\')openModal(\'' + t.id + '\')">' +
      '<div class="r-dot" style="background:linear-gradient(135deg,' + color + ',' + color + '66)">' + initial + '</div>' +
      '<div style="min-width:0"><div class="r-name">' + escapeHtml(t.n) + '</div><div class="r-lang">' + (LANGUAGES[t.c] ? LANGUAGES[t.c].name : t.c) + ' - ' + t.f.length + ' fayl</div></div></div>';
  }).join('');
  var any = recent.some(function (id) { return templates.find(function (x) { return x.id === id; }); });
  sec.hidden = !any;
  row.innerHTML = items;
  if (window.gsap && !REDUCED_MOTION) {
    gsap.from('.recent-item', { y: 14, opacity: 0, duration: .45, stagger: .05, ease: 'power3.out', clearProps: 'all' });
  }
}

/* ---------------- Rendering ---------------- */
function heartButtonHTML(id, fav) {
  return '<button class="fav-heart ' + (fav ? 'on' : '') + '" data-id="' + id + '" aria-label="' + (fav ? 'Olib tashlash' : 'Saqlash') + '" onclick="event.stopPropagation();toggleFav(\'' + id + '\')">' + heartIcon(fav) + '</button>';
}
function cardHTML(t) {
  var color = LANG_COLORS[t.c] || '#4f8cff';
  var fav = favorites.has(t.id);
  return '<div class="card" role="button" tabindex="0" aria-label="' + escapeHtml(t.n) + '" onclick="openModal(\'' + t.id + '\')" onkeydown="if(event.key===\'Enter\')openModal(\'' + t.id + '\')">' +
    '<div class="card-top">' +
      '<div class="card-icon" style="background:' + color + '1f"><span class="lang-tile" style="background:' + color + '"></span></div>' +
      '<div class="card-top-right">' + heartButtonHTML(t.id, fav) + '<span class="diff diff-' + t.diff + '">' + t.diff + '</span></div>' +
    '</div>' +
    '<h3>' + escapeHtml(t.n) + '</h3><p>' + escapeHtml(t.d) + '</p>' +
    '<div class="tags"><span class="tag" style="background:' + color + '1f;color:' + color + '">' + (LANGUAGES[t.c] ? LANGUAGES[t.c].name : t.c) + '</span>' + t.t.slice(0, 2).map(function (x) { return '<span class="tag">' + escapeHtml(x) + '</span>'; }).join('') + '</div>' +
    '<div class="card-actions">' +
      '<button class="c-btn copy" aria-label="Copy ' + escapeHtml(t.n) + '" onclick="event.stopPropagation();copyTemplate(\'' + t.id + '\')">' + icon('copy') + '<span>Copy</span></button>' +
      '<button class="c-btn view" aria-label="View ' + escapeHtml(t.n) + ' code" onclick="event.stopPropagation();openModal(\'' + t.id + '\')">' + icon('code') + '<span>Code</span></button>' +
      '<button class="c-btn download" aria-label="Download ' + escapeHtml(t.n) + '" onclick="event.stopPropagation();downloadTemplate(\'' + t.id + '\')">' + icon('download') + '<span>Save</span></button>' +
      '<button class="c-btn info" aria-label="Show ' + escapeHtml(t.n) + ' instructions" onclick="event.stopPropagation();openInstructions(\'' + t.id + '\')">' + icon('info') + '<span>Info</span></button>' +
    '</div></div>';
}

function renderSidebar() {
  var nav = $('sidebarNav');
  var html = '<div class="s-section">Kategoriyalar</div>';
  CATEGORIES.forEach(function (c) {
    var count;
    if (c.id === 'favorites') count = favorites.size;
    else if (c.id === 'all') count = templates.length;
    else if (c.id === 'flutter') count = templates.filter(function (t) { return FLUTTER_CATS.indexOf(t.c) > -1 || t.t.indexOf('flutter') > -1; }).length;
    else count = templates.filter(function (t) { return t.c === c.id; }).length;
    var active = category === c.id;
    html += '<div class="s-item ' + (active ? 'active' : '') + '" role="button" tabindex="0" aria-pressed="' + active + '" onclick="setCategory(\'' + c.id + '\')" onkeydown="if(event.key===\'Enter\')setCategory(\'' + c.id + '\')">' + icon(c.icon) + c.n + '<span class="count">' + count + '</span></div>';
  });
  html += '<div class="s-section">Qiyinlik</div>';
  ['easy', 'medium', 'hard', 'expert'].forEach(function (d) {
    var count = templates.filter(function (t) { return t.diff === d; }).length;
    if (count > 0) html += '<div class="s-item ' + (difficulty === d ? 'active' : '') + '" role="button" tabindex="0" aria-pressed="' + (difficulty === d) + '" onclick="filterDifficulty(\'' + d + '\')" onkeydown="if(event.key===\'Enter\')filterDifficulty(\'' + d + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="' + DIFF_COLORS[d] + '"><circle cx="12" cy="12" r="6"/></svg>' + d.charAt(0).toUpperCase() + d.slice(1) + '<span class="count">' + count + '</span></div>';
  });
  nav.innerHTML = html;
}

function renderTabs() {
  $('tabs').innerHTML = CATEGORIES.map(function (c) {
    return '<button class="tab-btn ' + (c.id === category ? 'active' : '') + '" role="tab" aria-selected="' + (c.id === category) + '" onclick="setCategory(\'' + c.id + '\')">' + icon(c.icon) + c.n + '</button>';
  }).join('');
}

function getFiltered() {
  return templates.filter(function (t) {
    var q = query.toLowerCase();
    var matchQ = !query || t.n.toLowerCase().indexOf(q) > -1 || t.d.toLowerCase().indexOf(q) > -1 || t.t.some(function (x) { return x.toLowerCase().indexOf(q) > -1; });
    var matchC;
    if (category === 'favorites') matchC = favorites.has(t.id);
    else if (category === 'all') matchC = true;
    else if (category === 'flutter') matchC = FLUTTER_CATS.indexOf(t.c) > -1 || t.t.indexOf('flutter') > -1;
    else matchC = t.c === category;
    var matchD = !difficulty || t.diff === difficulty;
    return matchQ && matchC && matchD;
  });
}

function renderGrid(animate) {
  animate = animate !== false;
  var filtered = getFiltered();
  var grid = $('grid');
  var catName = category === 'all' ? 'Barcha templates' : category === 'favorites' ? 'Favorites' : (CATEGORIES.find(function (c) { return c.id === category; }) || {}).n || 'Templates';
  $('headerTitle').textContent = catName;
  $('countBar').innerHTML = filtered.length ? '<span>' + filtered.length + '</span> ta template topildi' : '';
  $('subCount').textContent = templates.length + ' templates';
  if (!filtered.length) {
    if (category === 'favorites') {
      grid.innerHTML = '<div class="empty" role="status">' + heartIcon() + '<p>Favorites hali bo\'sh</p><p style="font-size:11px;margin-top:4px">Karta ustidagi yurak belgisini bosib qo\'shing</p></div>';
    } else {
      grid.innerHTML = '<div class="empty" role="status">' + icon('search') + '<p>Hech narsa topilmadi</p></div>';
    }
    return;
  }
  grid.innerHTML = filtered.map(cardHTML).join('');
  initTilt();
  if (animate) playGridEntrance();
}

function renderSkeletons() {
  var html = '';
  for (var i = 0; i < 8; i++) {
    html += '<div class="skeleton-card" aria-hidden="true"><div class="skel skel-l1"></div><div class="skel skel-l2"></div><div class="skel skel-l3"></div><div class="skel skel-l4"></div></div>';
  }
  $('grid').innerHTML = html;
}

function updateStats() {
  var total = $('totalCount'), lang = $('langCount');
  total.dataset.count = templates.length;
  lang.dataset.count = new Set(templates.map(function (t) { return t.c; })).size;
  animateCounter(total);
  animateCounter(lang);
}

function animateCounter(el) {
  var end = parseInt(el.dataset.count, 10) || 0;
  if (window.gsap && !REDUCED_MOTION) {
    var o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.4, delay: .5, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
  } else {
    el.textContent = end;
  }
}

function setCategory(id) {
  category = id; difficulty = '';
  $('sidebar').classList.remove('open');
  renderTabs(); renderSidebar(); renderGrid(true);
}
function filterDifficulty(d) { difficulty = difficulty === d ? '' : d; renderSidebar(); renderGrid(true); }

/* ---------------- Modal ---------------- */
function openModal(id) {
  currentTemplate = templates.find(function (t) { return t.id === id; });
  if (!currentTemplate) return;
  currentFileIndex = 0;
  renderModal();
  $('modal').classList.add('on');
  document.body.style.overflow = 'hidden';
  trackRecent(id);
}
function closeModal() {
  $('modal').classList.remove('on');
  if (!$('instructionsOverlay').classList.contains('on') && !$('previewOverlay').classList.contains('on') && !$('authOverlay').classList.contains('on')) document.body.style.overflow = '';
  currentTemplate = null;
  $('previewSection').hidden = true;
  showCode();
}
function selectFile(i) { currentFileIndex = i; renderModal(); }
function renderModal() {
  if (!currentTemplate) return;
  var t = currentTemplate, f = t.f[currentFileIndex];
  $('mName').textContent = t.n;
  $('mDesc').textContent = t.d;
  $('mTabs').innerHTML = t.f.map(function (file, i) {
    return '<button class="m-tab ' + (i === currentFileIndex ? 'on' : '') + '" role="tab" aria-selected="' + (i === currentFileIndex) + '" onclick="selectFile(' + i + ')">' + icon('document') + escapeHtml(file.n) + '</button>';
  }).join('');
  $('mPath').textContent = f.p;
  $('mFoot').innerHTML = t.f.map(function (file) { return '<span>' + escapeHtml(file.n) + '</span>'; }).join('');
  updateFavBtn();
  hidePreview();
  setCode(f.c);
}
function hideCode() { $('mTabs').hidden = true; document.querySelector('.m-bar').hidden = true; document.querySelector('.m-code').hidden = true; }
function showCode() { $('mTabs').hidden = false; document.querySelector('.m-bar').hidden = false; document.querySelector('.m-code').hidden = false; }
function hidePreview() { $('previewSection').hidden = true; showCode(); }
function showPreview() {
  if (!currentTemplate) return;
  var ps = $('previewSection');
  if (!ps.hidden) { ps.hidden = true; showCode(); return; }
  var t = currentTemplate, content = $('previewContent');
  if (t.preview) {
    var img = new Image();
    img.onload = function () { content.innerHTML = ''; content.appendChild(img); };
    img.onerror = function () { content.innerHTML = '<div class="modal-placeholder">' + icon('info') + '<p>Preview yuklanmadi</p></div>'; };
    img.src = t.preview;
    img.alt = t.n + ' preview';
    img.style.cssText = 'max-width:100%;max-height:480px;border-radius:var(--r-md);box-shadow:var(--shadow-2)';
  } else {
    content.innerHTML = '<div class="modal-placeholder">' + icon('info') + '<p>Preview mavjud emas</p></div>';
  }
  ps.hidden = false;
  hideCode();
}
function showInstructions() {
  if (!currentTemplate) return;
  $('previewSection').hidden = true;
  showCode();
  openInstructions(currentTemplate.id);
}

/* ---------------- Syntax highlighting ---------------- */
function setCode(code) {
  highlightCode($('mCode'), code, currentTemplate.c);
}
function highlightCode(el, code, lang) {
  var kws = KEYWORDS[lang] || KEYWORDS.flutter;
  var inBlock = false;
  var lines = code.split('\n');
  var html = lines.map(function (line, i) {
    var n = i + 1;
    var body = escapeHtml(line);
    var wrap = function (c) { return '<div class="code-line"><span class="ln">' + n + '</span><span class="lc">' + c + '</span></div>'; };
    if (inBlock) {
      var be = body.indexOf('*/');
      if (be > -1) { inBlock = false; body = '<span class="tok-com">' + body.slice(0, be + 2) + '</span>' + hlTokens(body.slice(be + 2), kws); }
      else body = '<span class="tok-com">' + body + '</span>';
      return wrap(body);
    }
    var bs = body.indexOf('/*');
    if (bs > -1) {
      var e2 = body.indexOf('*/', bs + 2);
      if (e2 > -1) {
        body = body.slice(0, bs) + '<span class="tok-com">' + body.slice(bs, e2 + 2) + '</span>' + hlTokens(body.slice(e2 + 2), kws);
      } else {
        inBlock = true;
        body = body.slice(0, bs) + '<span class="tok-com">' + body.slice(bs) + '</span>';
      }
      return wrap(body);
    }
    var ci = body.indexOf('//');
    var codePart = body, comPart = '';
    if (ci > -1) { codePart = body.slice(0, ci); comPart = '<span class="tok-com">' + body.slice(ci) + '</span>'; }
    return wrap(hlTokens(codePart, kws) + comPart);
  }).join('');
  el.innerHTML = '<pre>' + html + '</pre>';
}
function hlTokens(line, kws) {
  var map = [], i = 0;
  var strRe = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\\n]|\\.)*`/g;
  line = line.replace(strRe, function (m) { var ph = '__STR' + i + '__'; map.push({ ph: ph, h: '<span class="tok-str">' + m + '</span>' }); i++; return ph; });
  var kwPattern = kws.split(' ').filter(Boolean).join('|');
  if (kwPattern) line = line.replace(new RegExp('\\b(' + kwPattern + ')\\b', 'g'), '<span class="tok-kw">$1</span>');
  line = line
    .replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="tok-type">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>')
    .replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, '<span class="tok-fn">$1</span>');
  return line.replace(/__STR(\d+)__/g, function (_, n) { return map[+n].h; });
}

/* ---------------- Copy / Download / Export ---------------- */
function copyCode() { if (!currentTemplate) return; safeWriteText(currentTemplate.f[currentFileIndex].c).then(function () { showToast('Nusxalandi'); }).catch(function () { showToast('Xatolik'); }); }
function copyAll() {
  if (!currentTemplate) return;
  var all = currentTemplate.f.map(function (f) { return '// ' + f.p + '\n' + f.c; }).join('\n\n');
  safeWriteText(all).then(function () { showToast('Barcha fayllar nusxalandi'); }).catch(function () { showToast('Xatolik'); });
}
function copyTemplate(id) {
  var t = templates.find(function (x) { return x.id === id; });
  if (!t) return;
  var all = t.f.map(function (f) { return '// ' + f.p + '\n' + f.c; }).join('\n\n');
  safeWriteText(all).then(function () { showToast('Nusxalandi'); }).catch(function () { showToast('Xatolik'); });
}
function downloadFile() {
  if (!currentTemplate) return;
  var f = currentTemplate.f[currentFileIndex];
  var blob = new Blob([f.c], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = f.n; document.body.appendChild(a); a.click();
  setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
  showToast('Yuklab olindi');
}
function downloadTemplate(id) {
  var t = templates.find(function (x) { return x.id === id; });
  if (!t) return;
  t.f.forEach(function (f) {
    var blob = new Blob([f.c], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = f.n; document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
  });
  showToast('Barcha fayllar yuklab olindi');
}
function exportAll() {
  var data = templates.map(function (t) { return { name: t.n, description: t.d, category: t.c, difficulty: t.diff, tags: t.t, instructions: t.instructions, files: t.f.map(function (f) { return { name: f.n, path: f.p, code: f.c }; }) }; });
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'nesto-templates.json'; document.body.appendChild(a); a.click();
  setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
  showToast('Exported');
}

/* ---------------- Instructions ---------------- */
function toggleInstructions() {
  instructionsOpen = !instructionsOpen;
  $('instHeader').classList.toggle('open', instructionsOpen);
  $('instBody').classList.toggle('open', instructionsOpen);
  $('instHeader').setAttribute('aria-expanded', instructionsOpen);
}
function openInstructions(id) {
  var t = templates.find(function (x) { return x.id === id; });
  if (!t) return;
  $('instTitle').textContent = t.n + ' - Qo\'llanma';
  $('instBody2').innerHTML = renderMarkdown(t.instructions || 'Qo\'llanma mavjud emas.');
  $('instructionsOverlay').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeInstructions() {
  $('instructionsOverlay').classList.remove('on');
  if (!$('modal').classList.contains('on') && !$('previewOverlay').classList.contains('on') && !$('authOverlay').classList.contains('on')) document.body.style.overflow = '';
}
function renderMarkdown(md) {
  return escapeHtml(md)
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^```(?:bash|sh|shell)?\n([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, function (m) { return '<ul>' + m + '</ul>'; })
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

/* ---------------- Live previews ---------------- */
function runLivePreview() {
  if (!currentTemplate) return;
  var code = currentTemplate.f[currentFileIndex].c;
  var lang = currentTemplate.c;
  var content = $('previewContent2');
  if (lang === 'html-css' || lang === 'javascript' || lang === 'react' || lang === 'vue') {
    var iframe = document.createElement('iframe');
    iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:8px;background:#fff';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    if (lang === 'html-css') iframe.srcdoc = code;
    else if (lang === 'javascript') iframe.srcdoc = '<!DOCTYPE html><html><head><script>' + code + '<\/script></head><body><div id="app"></div><script>try{init(document.getElementById(\'app\'))}catch(e){document.body.innerHTML=\'<pre>\'+e+\'</pre>\'}<\/script></body></html>';
    else if (lang === 'react') iframe.srcdoc = '<!DOCTYPE html><html><head><script src="https://unpkg.com/react@18/umd/react.development.js"><\/script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script><script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script><style>body{margin:0;font-family:sans-serif}</style></head><body><div id="app"></div><script type="text/babel">' + code + '<\/script><script>try{ReactDOM.render(React.createElement(App),document.getElementById(\'app\'))}catch(e){document.body.innerHTML=\'<pre>\'+e+\'</pre>\'}<\/script></body></html>';
    else if (lang === 'vue') iframe.srcdoc = '<!DOCTYPE html><html><head><script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script><style>body{margin:0;font-family:sans-serif}</style></head><body><div id="app"></div><script>try{const{createApp}=Vue;const app=createApp({template:`<div>' + code.replace(/`/g, '\\`') + '</div>`});app.mount(\'#app\')}catch(e){document.body.innerHTML=\'<pre>\'+e+\'</pre>\'}<\/script></body></html>';
    content.innerHTML = '';
    content.appendChild(iframe);
  } else if (lang === 'python') {
    runPythonPreview(code, content);
  } else if (lang === 'arduino') {
    runArduinoPreview(code, content);
  } else {
    content.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text3)">' + icon('info') + '<p style="margin-top:14px;font-size:13px">Live preview hali mavjud emas</p><p style="font-size:11px;margin-top:6px">Kodni nusxalang va lokal muhitda ishga tushiring</p></div>';
  }
  $('previewOverlay').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closePreviewOverlay() {
  $('previewOverlay').classList.remove('on');
  if (!$('modal').classList.contains('on') && !$('instructionsOverlay').classList.contains('on') && !$('authOverlay').classList.contains('on')) document.body.style.overflow = '';
}
function runPythonPreview(code, content) {
  content.innerHTML = '<div style="height:100%;display:flex;flex-direction:column">' +
    '<div style="padding:10px 16px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px"><span style="font-size:12px;font-weight:600;color:var(--text)">Python Terminal</span><span style="font-size:10px;color:var(--text3)">Pyodide yuklanmoqda...</span></div>' +
    '<div id="pythonOutput" style="flex:1;padding:16px;font-family:var(--mono);font-size:12px;line-height:1.6;overflow:auto;background:#0b0b12;color:#d4d4d4;white-space:pre-wrap"></div></div>';
  var output = $('pythonOutput');
  if (!window.loadPyodide) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    script.onload = function () { executePython(code, output); };
    script.onerror = function () { output.innerHTML = '<span style="color:var(--red)">Pyodide yuklashda xatolik. Internetni tekshiring.</span>'; };
    document.head.appendChild(script);
  } else {
    executePython(code, output);
  }
}
async function executePython(code, output) {
  try {
    output.innerHTML = '<span style="color:var(--green)">&gt;&gt;&gt; Pyodide yuklandi. Bajarilmoqda...</span>\n\n';
    var pyodide = await loadPyodide();
    var outputBuffer = '';
    pyodide.setStdout({ batched: function (text) { outputBuffer += text; } });
    pyodide.setStderr({ batched: function (text) { outputBuffer += text; } });
    await pyodide.runPythonAsync(code);
    output.innerHTML += outputBuffer || '<span style="color:var(--green)">&gt;&gt;&gt; Kod muvaffaqiyatli bajarildi (stdout yo\'q)</span>';
  } catch (e) {
    output.innerHTML += '\n<span style="color:var(--red)">Xatolik: ' + escapeHtml(e.message) + '</span>';
  }
}
function runArduinoPreview(code, content) {
  var setupMatch = code.match(/void\s+setup\s*\(\s*\)\s*\{([\s\S]*?)\}/);
  var loopMatch = code.match(/void\s+loop\s*\(\s*\)\s*\{([\s\S]*?)\}/);
  var setupCode = setupMatch ? setupMatch[1].trim() : '';
  var loopCode = loopMatch ? loopMatch[1].trim() : '';
  var pins = {}, serialOutput = [];
  function parseLine(line) {
    line = line.trim();
    if (line.indexOf('//') === 0 || line.indexOf('/*') === 0 || line.indexOf('*') === 0) return;
    var pinMatch = line.match(/pinMode\s*\(\s*(\w+)\s*,\s*(OUTPUT|INPUT)\s*\)/);
    if (pinMatch) { pins[pinMatch[1]] = { mode: pinMatch[2], value: 0 }; return; }
    var dw = line.match(/digitalWrite\s*\(\s*(\w+)\s*,\s*(HIGH|LOW)\s*\)/);
    if (dw) { var pin = dw[1]; if (pins[pin]) pins[pin].value = dw[2] === 'HIGH' ? 1 : 0; serialOutput.push('digitalWrite(' + pin + ', ' + dw[2] + ')'); return; }
    var sl = line.match(/Serial\.println\s*\(\s*['"](.+?)['"]\s*\)/);
    if (sl) { serialOutput.push(sl[1]); return; }
    var dl = line.match(/delay\s*\(\s*(\d+)\s*\)/);
    if (dl) { serialOutput.push('delay(' + dl[1] + 'ms)'); return; }
  }
  setupCode.split('\n').forEach(parseLine);
  for (var i = 0; i < 3; i++) loopCode.split('\n').forEach(parseLine);
  var pinHTML = Object.keys(pins).map(function (name) {
    var pin = pins[name];
    return '<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--border)">' +
      '<div style="width:11px;height:11px;border-radius:50%;background:' + (pin.value ? 'var(--green)' : 'var(--border3)') + ';box-shadow:' + (pin.value ? '0 0 10px var(--green)' : 'none') + '"></div>' +
      '<span style="font-size:11px;font-family:var(--mono)">' + name + '</span>' +
      '<span style="font-size:10px;color:var(--text3);margin-left:auto">' + pin.mode + ' - ' + (pin.value ? 'HIGH' : 'LOW') + '</span></div>';
  }).join('');
  content.innerHTML = '<div style="height:100%;display:flex;flex-direction:column">' +
    '<div style="padding:10px 16px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px"><span style="font-size:12px;font-weight:600;color:var(--text)">Arduino Simulator</span><span style="font-size:10px;color:var(--text3)">Simulyatsiya - haqiqiy hardware emas</span></div>' +
    '<div style="flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:16px">' +
      '<div><h4 style="font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Pin Holati</h4><div style="display:flex;flex-direction:column;gap:4px">' + (pinHTML || '<div style="color:var(--text3);font-size:12px">Pin aniqlanmadi</div>') + '</div></div>' +
      '<div><h4 style="font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Serial Monitor</h4>' +
      '<div style="background:#0b0b12;border-radius:8px;padding:12px;font-family:var(--mono);font-size:11px;line-height:1.6;color:#d4d4d4;max-height:300px;overflow:auto">' +
      (serialOutput.map(function (line) { return '<div style="color:' + (line.indexOf('delay') === 0 ? 'var(--yellow)' : line.indexOf('digitalWrite') === 0 ? 'var(--green)' : '#d4d4d4') + '">' + escapeHtml(line) + '</div>'; }).join('') || '<div style="color:var(--border3)">Serial output yo\'q</div>') + '</div></div>' +
      '<div style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px"><p style="font-size:11px;color:var(--text3);line-height:1.6"><strong style="color:var(--text)">Eslatma:</strong> Bu simulyatsiya. Haqiqiy Arduino uchun kodni Arduino IDE da yuklang.</p></div>' +
    '</div></div>';
}

/* ---------------- Command palette ---------------- */
function openPalette() {
  paletteIndex = 0;
  $('paletteInput').value = '';
  renderPalette();
  $('paletteOverlay').classList.add('on');
  document.body.style.overflow = 'hidden';
  setTimeout(function () { $('paletteInput').focus(); }, 30);
}
function closePalette() {
  $('paletteOverlay').classList.remove('on');
  if (!$('modal').classList.contains('on') && !$('instructionsOverlay').classList.contains('on') && !$('previewOverlay').classList.contains('on') && !$('authOverlay').classList.contains('on')) document.body.style.overflow = '';
}
function paletteQuery() { return $('paletteInput').value.trim().toLowerCase(); }
function markMatch(s) {
  var q = paletteQuery();
  var out = escapeHtml(s);
  if (!q) return out;
  var idx = out.toLowerCase().indexOf(q);
  if (idx < 0) return out;
  return out.slice(0, idx) + '<mark>' + out.slice(idx, idx + q.length) + '</mark>' + out.slice(idx + q.length);
}
function renderPalette() {
  var q = paletteQuery();
  var list = templates.filter(function (t) {
    return !q || t.n.toLowerCase().indexOf(q) > -1 || t.d.toLowerCase().indexOf(q) > -1 || t.t.some(function (x) { return x.toLowerCase().indexOf(q) > -1; });
  }).slice(0, 50);
  paletteResults = list;
  if (paletteIndex >= list.length) paletteIndex = 0;
  var box = $('paletteResults');
  if (!list.length) { box.innerHTML = '<div class="palette-empty">Hech narsa topilmadi</div>'; return; }
  box.innerHTML = list.map(function (t, i) {
    var color = LANG_COLORS[t.c] || '#4f8cff';
    var fav = favorites.has(t.id);
    var active = i === paletteIndex;
    return '<div class="palette-item ' + (active ? 'active' : '') + '" data-idx="' + i + '" role="option" aria-selected="' + active + '" onclick="openTemplateFromPalette(' + i + ')" onmouseenter="paletteIndex=' + i + ';renderPaletteActive()">' +
      '<div class="p-icon" style="background:' + color + '22;color:' + color + '">' + icon(ICON_FOR_CATEGORY[t.c] || 'sparkle') + '</div>' +
      '<div class="p-main"><div class="p-name">' + markMatch(t.n) + '</div><div class="p-desc">' + markMatch(t.d) + '</div></div>' +
      '<div class="p-meta"><span class="tag" style="background:' + color + '22;color:' + color + '">' + (LANGUAGES[t.c] ? LANGUAGES[t.c].name : t.c) + '</span>' +
      '<span class="diff diff-' + t.diff + '">' + t.diff + '</span>' +
      '<span class="p-star ' + (fav ? 'on' : '') + '">' + starIcon(fav) + '</span></div></div>';
  }).join('');
  var activeEl = box.querySelector('.palette-item.active');
  if (activeEl && activeEl.scrollIntoView) activeEl.scrollIntoView({ block: 'nearest' });
}
function renderPaletteActive() {
  document.querySelectorAll('.palette-item').forEach(function (el, i) {
    el.classList.toggle('active', i === paletteIndex);
    el.setAttribute('aria-selected', i === paletteIndex);
  });
}
function openTemplateFromPalette(i) {
  var t = paletteResults[i];
  if (!t) return;
  closePalette();
  openModal(t.id);
}

/* ---------------- Theme ---------------- */
function updateThemeIcon() {
  var light = document.body.getAttribute('data-theme') === 'light';
  $('themeIcon').innerHTML = light
    ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
}
function initTheme() {
  var saved = localStorage.getItem(THEME_KEY);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var light = saved ? saved === 'light' : !prefersDark;
  document.body.setAttribute('data-theme', light ? 'light' : '');
  updateThemeIcon();
}
function toggleTheme() {
  var light = document.body.getAttribute('data-theme') === 'light';
  document.body.setAttribute('data-theme', light ? '' : 'light');
  localStorage.setItem(THEME_KEY, light ? 'dark' : 'light');
  updateThemeIcon();
  sync3DTheme();
}
function getAccent() { return getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#4f8cff'; }
function hexToRgb(hex) { var m = hex.replace('#', ''); return { r: parseInt(m.slice(0, 2), 16), g: parseInt(m.slice(2, 4), 16), b: parseInt(m.slice(4, 6), 16) }; }

/* ---------------- 3D background (Three.js) ---------------- */
function init3D() {
  if (threeState.renderer) return;
  var canvas = $('bg3d');
  if (!canvas) return;
  var boot = function () {
    if (!window.THREE) return;
    var isMobile = window.innerWidth < 768;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .1, 200);
    camera.position.set(0, 0, 9);
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    var accent = hexToRgb(getAccent());
    var accentHex = accent.r << 16 | accent.g << 8 | accent.b;

    var knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.6, .55, 110, 18),
      new THREE.MeshBasicMaterial({ color: accentHex, wireframe: true, transparent: true, opacity: .28, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    knot.position.set(0, 0, -5);
    knot.rotation.x = .65;
    knot.rotation.y = -.35;
    scene.add(knot);

    var streakCount = isMobile ? 45 : 110;
    var sPos = new Float32Array(streakCount * 6);
    var streaksArr = new Array(streakCount);
    for (var i = 0; i < streakCount; i++) {
      var sx = (Math.random() - .5) * 16;
      var sy = (Math.random() - .5) * 9;
      var sz = (Math.random() - .5) * 12 - 4;
      var sl = .6 + Math.random() * 1.6;
      var dir = Math.atan2(Math.random() - .5, Math.random() - .5);
      sPos[i * 6] = sx; sPos[i * 6 + 1] = sy; sPos[i * 6 + 2] = sz;
      sPos[i * 6 + 3] = sx + Math.cos(dir) * sl; sPos[i * 6 + 4] = sy + Math.sin(dir) * sl; sPos[i * 6 + 5] = sz + sl * .5;
      streaksArr[i] = { speed: .008 + Math.random() * .03, len: sl };
    }
    var sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    var sMat = new THREE.LineBasicMaterial({ color: accentHex, transparent: true, opacity: .32, blending: THREE.AdditiveBlending, depthWrite: false });
    var streaks = new THREE.LineSegments(sGeo, sMat);
    scene.add(streaks);

    var shapes = [];
    var shapeMat = new THREE.MeshBasicMaterial({ color: accent.r << 16 | accent.g << 8 | accent.b, wireframe: true, transparent: true, opacity: .14 });
    var shapeCount = isMobile ? 2 : 6;
    for (var s = 0; s < shapeCount; s++) {
      var geo = new THREE.IcosahedronGeometry(.6 + Math.random() * .9, 1);
      var mesh = new THREE.Mesh(geo, shapeMat);
      mesh.position.set((Math.random() - .5) * 15, (Math.random() - .5) * 8, (Math.random() - .5) * 6 - 4);
      mesh.userData = { vx: (Math.random() - .5) * .004, vy: (Math.random() - .5) * .004, vz: (Math.random() - .5) * .004 };
      scene.add(mesh); shapes.push(mesh);
    }

    threeState.scene = scene; threeState.camera = camera; threeState.renderer = renderer;
    threeState.knot = knot; threeState.streaks = streaks; threeState.streakData = streaksArr;
    threeState.shapes = shapes;

    window.addEventListener('pointermove', function (e) {
      threeState.targetX = (e.clientX / window.innerWidth - .5) * 2;
      threeState.targetY = (e.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });

    threeState.onResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', threeState.onResize);

    var frame = function () {
      if (!threeState.running) return;
      camera.position.x += ((threeState.targetX * 1.15) - camera.position.x) * .035;
      camera.position.y += ((-threeState.targetY * .75) - camera.position.y) * .035;
      camera.lookAt(0, 0, -2);
      knot.rotation.y += .0016;
      knot.rotation.z += .0006;
      var sAttr = streaks.geometry.attributes.position;
      var sArr = sAttr.array;
      for (var i = 0; i < streakCount; i++) {
        sArr[i * 6 + 2] += streaksArr[i].speed;
        sArr[i * 6 + 5] += streaksArr[i].speed;
        if (sArr[i * 6 + 2] > 6) {
          sArr[i * 6 + 2] = -10;
          sArr[i * 6 + 5] = -10 + streaksArr[i].len * .5;
        }
      }
      sAttr.needsUpdate = true;
      shapes.forEach(function (sh) { sh.rotation.x += sh.userData.vx; sh.rotation.y += sh.userData.vy; sh.rotation.z += sh.userData.vz; });
      renderer.render(scene, camera);
      threeState.raf = requestAnimationFrame(frame);
    };

    if (REDUCED_MOTION) {
      camera.position.x = 1; camera.lookAt(0, 0, -2);
      renderer.render(scene, camera);
    } else {
      threeState.running = true;
      frame();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { threeState.running = false; cancelAnimationFrame(threeState.raf); }
      else if (!REDUCED_MOTION) { threeState.running = true; frame(); }
    });
  };
  if (!window.THREE) {
    loadScript('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js', boot, function () {});
  } else {
    boot();
  }
}
function sync3DTheme() {
  if (!threeState.renderer) return;
  var accent = getAccent();
  var rgb = hexToRgb(accent);
  var hex = rgb.r << 16 | rgb.g << 8 | rgb.b;
  threeState.shapes.forEach(function (sh) { sh.material.color.setHex(hex); });
  if (threeState.knot) threeState.knot.material.color.setHex(hex);
  if (threeState.streaks) threeState.streaks.material.color.setHex(hex);
}

/* ---------------- Motion (GSAP) ---------------- */
function playGridEntrance() {
  if (REDUCED_MOTION || !window.gsap) return;
  var cards = document.querySelectorAll('#grid .card');
  if (!cards.length) return;
  gsap.from(cards, { y: 24, opacity: 0, duration: .5, stagger: .03, ease: 'power3.out', delay: .05, clearProps: 'all', overwrite: 'auto' });
}
function initTilt() {
  if (REDUCED_MOTION || TOUCH) return;
  document.querySelectorAll('.card').forEach(function (card) {
    if (card.dataset.tilt) return;
    card.dataset.tilt = '1';
    var raf = null;
    card.addEventListener('pointermove', function (e) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.classList.add('tilting');
        card.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg');
      });
    });
    card.addEventListener('pointerleave', function () {
      if (raf) cancelAnimationFrame(raf);
      card.classList.remove('tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
function initMotion() {
  if (REDUCED_MOTION || !window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var heroTl = gsap.timeline({ delay: .15 });
  heroTl
    .from('#heroBadge', { y: 16, opacity: 0, duration: .55, ease: 'power3.out' })
    .from('#heroTitle', { y: 26, opacity: 0, duration: .7, ease: 'power3.out' }, '-=.15')
    .from('#heroSub', { y: 18, opacity: 0, duration: .6, ease: 'power3.out' }, '-=.25')
    .from('.hero-stat', { y: 20, opacity: 0, duration: .5, stagger: .08, ease: 'power3.out' }, '-=.35');
  if (!TOUCH) {
    var chips = gsap.utils.toArray('.chip');
    chips.forEach(function (c, i) {
      gsap.to(c, { y: gsap.utils.random(-7, 7), x: gsap.utils.random(-9, 9), rotation: gsap.utils.random(-4, 4), duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .3 });
    });
  }
  if (window.ScrollTrigger) {
    ScrollTrigger.create({ trigger: document.body, start: 'top -100', onUpdate: function (self) { $('mHeader').classList.toggle('scrolled', self.scroll() > 40); } });
    ScrollTrigger.create({ trigger: document.body, start: 'top -500', onUpdate: function (self) { $('fab').classList.toggle('show', self.scroll() > 560); } });
  } else {
    document.addEventListener('scroll', function () {
      $('mHeader').classList.toggle('scrolled', window.scrollY > 40);
      $('fab').classList.toggle('show', window.scrollY > 560);
    }, { passive: true });
  }
}

/* ---------------- UI ---------------- */
function showToast(msg) {
  var t = $('toast');
  $('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () { t.classList.remove('show'); }, 2000);
}
function showShortcuts() { $('shortcutsOverlay').classList.add('on'); }
function closeShortcuts() { $('shortcutsOverlay').classList.remove('on'); }
function toggleSidebar() { $('sidebar').classList.toggle('open'); }

/* ---------------- Loader ---------------- */
function animateLoader() {
  var bar = $('loaderBar');
  setTimeout(function () { bar.style.width = '55%'; }, 80);
  setTimeout(function () { bar.style.width = '82%'; }, 400);
}
function hideLoader() {
  var bar = $('loaderBar');
  bar.style.width = '100%';
  var el = $('loader');
  setTimeout(function () { el.classList.add('done'); }, 350);
  setTimeout(function () { el.remove(); }, 950);
}

/* ---------------- Events ---------------- */
$('search').addEventListener('input', function (e) {
  clearTimeout($('search')._db);
  $('search')._db = setTimeout(function () {
    query = e.target.value;
    difficulty = '';
    renderSidebar();
    renderGrid(false);
  }, 120);
});
$('paletteInput').addEventListener('input', function () { paletteIndex = 0; renderPalette(); });
$('modal').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeModal(); });

document.addEventListener('keydown', function (e) {
  var paletteOpen = $('paletteOverlay').classList.contains('on');
  if (e.key === 'Escape') {
    if (paletteOpen) { closePalette(); return; }
    closeModal(); closeShortcuts(); closeInstructions(); closePreviewOverlay(); closeAuthModal();
  }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (paletteOpen) closePalette(); else openPalette(); }
  if ((e.metaKey || e.ctrlKey) && e.key === 'c' && currentTemplate) {
    var sel = window.getSelection();
    if (sel && sel.toString().length === 0) { e.preventDefault(); copyCode(); }
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 's' && currentTemplate) { e.preventDefault(); downloadFile(); }
  if ((e.metaKey || e.ctrlKey) && e.key === 'd') { e.preventDefault(); toggleTheme(); }
  if ((e.metaKey || e.ctrlKey) && e.key === 'e') { e.preventDefault(); exportAll(); }
  if (paletteOpen && document.activeElement === $('paletteInput')) {
    if (e.key === 'ArrowDown') { e.preventDefault(); paletteIndex = Math.min(paletteIndex + 1, paletteResults.length - 1); renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); paletteIndex = Math.max(paletteIndex - 1, 0); renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); openTemplateFromPalette(paletteIndex); }
  } else if (currentTemplate && !$('modal').classList.contains('on')) {
    if (e.key === 'ArrowRight' && currentFileIndex < currentTemplate.f.length - 1) { currentFileIndex++; renderModal(); }
    if (e.key === 'ArrowLeft' && currentFileIndex > 0) { currentFileIndex--; renderModal(); }
  }
  if (e.key === '?' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') showShortcuts();
});

/* ---------------- Init ---------------- */
function init() {
  initTheme();
  animateLoader();
  renderSkeletons();
  (async function load() {
    try {
      var res = await fetch('templates.json');
      if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + res.statusText);
      var data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid template data');
      templates = data;
      renderSidebar(); renderTabs(); renderGrid(true); renderRecent();
      updateStats();
      initAuth();
    } catch (e) {
      $('grid').innerHTML = '<div class="empty" role="alert">' + icon('search') + '<p>Templates yuklashda xatolik: ' + escapeHtml(e.message) + '. Sahifani yangilang.</p></div>';
    }
    hideLoader();
    initMotion();
    if ('requestIdleCallback' in window) requestIdleCallback(function () { init3D(); }, { timeout: 1800 });
    else setTimeout(init3D, 600);
  })();

  window.addEventListener('beforeunload', function () {
    if (threeState.running) { threeState.running = false; cancelAnimationFrame(threeState.raf); }
    if (threeState.renderer) { threeState.renderer.dispose(); threeState.renderer = null; }
    if (threeState.scene) { threeState.scene.traverse(function (obj) { if (obj.geometry) obj.geometry.dispose(); if (obj.material) obj.material.dispose(); }); threeState.scene = null; }
    if (threeState.onResize) { window.removeEventListener('resize', threeState.onResize); threeState.onResize = null; }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var selectors = ['.modal-overlay.on', '.auth-overlay.on', '.instructions-overlay.on', '.preview-overlay.on', '.shortcuts-overlay.on', '.palette-overlay.on'];
    var activeOverlay = null;
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el) { activeOverlay = el; break; }
    }
    if (!activeOverlay) return;
    var focusable = activeOverlay.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), a[href], textarea:not([disabled])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
}

init();
