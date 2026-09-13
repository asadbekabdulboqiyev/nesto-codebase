# Flutter Templates Playground

> 180+ premium Flutter shablonlari — haqiqiy simulator screenshots, qadam-baqadam ko'rsatmalar va nusxa olishga tayyor kod.

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=flat-square&logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.x-0175C2?style=flat-square&logo=dart)](https://dart.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Imkoniyatlar

- **180+ Shablon** — Auth, Navigation, State Management, API, Animations, UI Widgets va boshqalar
- **Haqiqiy Simulator Screenshots** — Har bir shablonni ishlatishdan oldin qanday ko'rinishini ko'ring
- **Nusxa olishga tayyor** — Bir bosish bilan istalgan shablon kodini nusxalang
- **Qadam-baqadam ko'rsatmalar** — Har bir shablon uchun boshlang'ichlarga tushunarli qo'llanma
- **Qorong'i/Yorug' rejim** — Temalarni almashtiring
- **Klaviatura qisqartmalari** — `Ctrl+K`, `Ctrl+C`, `Ctrl+S` bilan tezroq harakatlaning
- **Hammasini export qilish** — Barcha shablonlarni JSON sifatida yuklab oling

---

## Jonli demo

**[Flutter Templates Playground](https://asadbekabdulboqiyev.github.io/flutter-templates-playground/)**

---

## Kategoriyalar

| Kategoriya | Soni | Tavsif |
|------------|------|--------|
| Starter | 6 | Asosiy loyiha tuzilmasi |
| Sahifalar | 27 | Home, Profile, Settings va boshqalar |
| Auth | 6 | Login, Register, Google Auth, OTP |
| Navigation | 6 | Bottom Nav, Drawer, Tab Bar, Router |
| State Management | 8 | Provider, BLoC, Riverpod, GetX |
| API & Backend | 11 | Dio, REST, GraphQL, WebSocket, Firebase |
| Animatsiyalar | 33 | Implicit, Explicit, Custom Painter |
| UI Widgets | 73 | Cards, Forms, Lists, Tables |
| Advanced | 10 | Clean Architecture, Platform Channels |

---

## Mashhur ilova klonlari

| Ilova | Tarkibi | Fayllar |
|-------|---------|---------|
| Instagram Clone | Feed, Stories, Profile, Search, Reels | 5 fayl |
| WhatsApp Clone | Chatlar, Qo'ng'iroqlar, Holat | 3 fayl |
| Spotify Clone | Home, Search, Library, Player | 5 fayl |
| Telegram Clone | Chatlar, Xabarlar | 2 fayl |
| Netflix Clone | Home, Search, Profile | 4 fayl |
| TikTok Clone | Feed, Discover, Profile | 4 fayl |
| Google-Style Login | Login, Register, Auth Service | 3 fayl |

---

## Tez boshlash

### Usul 1: Onlayn foydalanish
[Jonli demo](https://asadbekabdulboqiyev.github.io/flutter-templates-playground/) ga tashrif buyuring va istalgan shablonni nusxalang.

### Usul 2: Clone va ishga tushirish
```bash
# Repozitoriyani clone qiling
git clone https://github.com/asadbekabdulboqiyev/flutter-templates-playground.git
cd flutter-templates-playground

# Brauzerda oching
open index.html
```

### Usul 3: Shablon ishlatish
```bash
# Yangi Flutter loyiha yarating
flutter create my_app
cd my_app

# Shablonni nusxalang (masalan, Instagram Clone)
# Keyin ishga tushiring:
flutter run
```

---

## Klaviatura qisqartmalari

| Qisqartma | Amal |
|-----------|------|
| `Ctrl+K` | Shablonlarni qidirish |
| `Ctrl+C` | Kodni nusxalash |
| `Ctrl+S` | Faylni saqlash |
| `Ctrl+D` | Temani almashtirish |
| `Ctrl+E` | Hammasini export qilish |
| `→` / `←` | Fayllar orasida harakatlanish |
| `?` | Qisqarmalarni ko'rsatish |
| `Esc` | Modalni yopish |

---

## Loyiha tuzilmasi

```
flutter-templates-playground/
├── index.html          # Asosiy sayt
├── templates.json      # Barcha shablonlar ma'lumotlari
├── code_info/          # Simulator screenshots
│   ├── instagram-clone.png
│   ├── whatsapp-clone.png
│   ├── spotify-clone.png
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions
└── README.md
```

---

## O'z shabloningizni qanday qo'shish

1. `templates.json` ga shablon ma'lumotlarini qo'shing:
```json
{
  "id": "my-template",
  "n": "Mening shablonim",
  "i": "my-icon",
  "diff": "medium",
  "c": "ui",
  "t": ["widget", "custom"],
  "d": "Shablon tavsifi",
  "icon": "palette",
  "instructions": "Qadam-baqadam ko'rsatma...",
  "preview": "code_info/my-template.png",
  "f": [
    {
      "n": "main.dart",
      "p": "lib/main.dart",
      "c": "import 'package:flutter/material.dart';\n..."
    }
  ]
}
```

2. Simulator screenshot oling va `code_info/my-template.png` sifatida saqlang

3. GitHub ga push qiling — sayt avtomatik deploy bo'ladi!

---

## TEP (Teno Event Protocol)

NestoCodebase TEP imzolangan eventlar uchun **minimal demo** bilan keladi —
backend shart emas, hammasi browser'da (WebCrypto HMAC-SHA256).

- **`tep-demo.js`** — mustaqil TEP klient: `TepDemo.emitTepEvent(type, payload)`
- **`tep-demo.test.js`** — Node verifikatsiya testi (`node tep-demo.test.js`)
- Tema almashtirilganda `theme.published` event yaratilib, imzo konsolga
  chiqariladi.
- Canonical imzo: `tep\n1.0\n<event_id>\n<timestamp>\n<source>\n<type>\n<payload>`
- Imzo: HMAC-SHA256 `base64url`, `v1.` prefiks — spec: Teno Event Protocol (`spec/TEP.md`)

Event turlari (namuna): `theme.published`, `template.selected`.

---

## Hissa qo'shish

Hissa qo'shishlar qabul qilinadi! Qanday:

1. Repozitoriyani forking
2. Yangi branch yarating (`git checkout -b feature/amazing-template`)
3. Shabloningizni `templates.json` ga qo'shing
4. Simulator screenshot oling
5. O'zgartiriklaringizni commit qiling (`git commit -m 'Add amazing template'`)
6. Branch ga push qiling (`git push origin feature/amazing-template`)
7. Pull Request oching

---

## Muallif

**Asadbek Abdulboqiyev**
- Telegram: [@tmeAsadbek](https://t.me/tmeAsadbek)
- GitHub: [@asadbekabdulboqiyev](https://github.com/asadbekabdulboqiyev)

---

## Litsenziya

Ushbu loyiha MIT litsenziyasi ostida — batafsil [LICENSE](LICENSE) faylida.

---

<p align="center">
  Flutter va Dart bilan ❤️ yaratilgan
</p>
