# NestoCodebase

> 212+ multi-language code templates with live preview, copy-paste ready code, and step-by-step instructions.

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=flat-square&logo=flutter)](https://flutter.dev)
[![Arduino](https://img.shields.io/badge/Arduino-1.x-00979D?style=flat-square&logo=arduino)](https://www.arduino.cc)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python)](https://www.python.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat-square&logo=vuedotjs)](https://vuejs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Features

- **212+ Templates** — Flutter, Arduino, Python, JavaScript, React, Vue.js, Node.js, HTML/CSS
- **Multi-Language Support** — Code templates for 8 programming languages
- **Live Preview** — Run HTML/CSS/JS/React/Vue code directly in browser
- **User Authentication** — Save favorites and sync across devices
- **Copy-Paste Ready** — One click to copy any template code
- **Step-by-Step Instructions** — Beginner-friendly guides for every template
- **Dark/Light Mode** — Toggle between themes
- **Keyboard Shortcuts** — Navigate faster with `Ctrl+K`, `Ctrl+C`, `Ctrl+S`
- **Export All** — Download all templates as JSON
- **Code Highlighting** — Syntax highlighted code for all languages

---

## Live Demo

**[NestoCodebase](https://asadbekabdulboqiyev.github.io/nesto-codebase/)**

---

## Languages

| Language | Count | Description |
|----------|-------|-------------|
| Flutter | 180 | Mobile app development with Dart |
| Arduino | 16 | IoT and hardware programming |
| Python | 8 | Scripts, APIs, data science |
| JavaScript | 2 | Vanilla JS, DOM manipulation |
| React | 2 | Component-based UI |
| Vue.js | 2 | Progressive framework |
| Node.js | 1 | Backend development |
| HTML/CSS | 1 | Web templates |

---

## Popular App Clones

| App | Contents | Files |
|-----|----------|-------|
| Instagram Clone | Feed, Stories, Profile, Search, Reels | 5 files |
| WhatsApp Clone | Chats, Calls, Status | 4 files |
| Spotify Clone | Home, Search, Library, Player | 5 files |
| Telegram Clone | Chats, Messages | 2 files |
| Netflix Clone | Home, Search, Profile | 4 files |
| TikTok Clone | Feed, Discover, Profile | 4 files |
| Google-Style Login | Login, Register, Auth Service | 3 files |

---

## Quick Start

### Option 1: Use Online
Visit the [live demo](https://asadbekabdulboqiyev.github.io/nesto-codebase/) and copy any template.

### Option 2: Clone & Run
```bash
# Clone the repository
git clone https://github.com/asadbekabdulboqiyev/nesto-codebase.git
cd nesto-codebase

# Start local server (required for fetch() to work)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

### Option 3: Use a Template
```bash
# For Flutter:
flutter create my_app && cd my_app
# Copy template code to lib/

# For Arduino:
# Open Arduino IDE, create new sketch, paste code

# For Python:
python template.py

# For JavaScript/React/Vue:
# Open index.html in browser or use live preview
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Search templates |
| `Ctrl+C` | Copy code |
| `Ctrl+S` | Download file |
| `Ctrl+D` | Toggle theme |
| `Ctrl+E` | Export all templates |
| `→` / `←` | Navigate between files |
| `?` | Show shortcuts |
| `Esc` | Close modal |

---

## Project Structure

```
nesto-codebase/
├── index.html          # Main HTML (semantic, accessible)
├── styles.css          # All CSS styles
├── app.js              # All JavaScript logic
├── templates.json      # 212+ template data
├── code_info/          # Preview screenshots
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions
└── README.md
```

---

## How to Add Your Own Template

1. Add template data to `templates.json`:
```json
{
  "id": "my-template",
  "n": "My Template",
  "i": "🚀",
  "diff": "medium",
  "c": "flutter",
  "t": ["widget", "custom"],
  "d": "Description of the template",
  "icon": "palette",
  "instructions": "Step-by-step guide...",
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

2. Supported languages:
   - `flutter` — Dart files (.dart)
   - `arduino` — Arduino sketches (.ino)
   - `python` — Python scripts (.py)
   - `javascript` — JavaScript files (.js)
   - `react` — React components (.jsx)
   - `vue` — Vue components (.vue)
   - `nodejs` — Node.js files (.js)
   - `html-css` — HTML/CSS files (.html)

3. Push to GitHub — the site auto-deploys!

---

## TEP (Teno Event Protocol)

NestoCodebase ships with a **minimal TEP demo** that signs events entirely in the
browser — no backend required (WebCrypto HMAC-SHA256).

- **`tep-demo.js`** — self-contained TEP client: `TepDemo.emitTepEvent(type, payload)`
- **`tep-demo.test.js`** — Node verification test (`node tep-demo.test.js`)
- Switching the theme emits a signed `theme.published` event; the signature is
  printed to the console.
- Canonical signing material:
  `tep\n1.0\n<event_id>\n<timestamp>\n<source>\n<type>\n<payload>`
- Signature: HMAC-SHA256 `base64url` with a `v1.` prefix — spec: Teno Event
  Protocol (`spec/TEP.md`)

Sample event types: `theme.published`, `template.selected`.

### Live TEP Event Stream

A compact, signed activity feed that reflects every meaningful action on the
site in real time:

- **`tep-stream.js`** — `TepStream.track(type, payload)` emits the event, verifies
  its signature before showing it, and persists the last 50 events in
  `localStorage` (`tep_stream_v1`).
- Feed items are labeled **VERIFIED** when the local signature check passes.
- The first new event lands as soon as the page loads; old events survive a page
  refresh.
- Stream event types: `template.selected`, `template.copied`,
  `template.favorited`, `template.unfavorited`, `template.previewed`,
  `theme.toggled`.
- **`tep-stream.test.js`** — Node verification test
  (`node tep-stream.test.js`).

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-template`)
3. Add your template to `templates.json`
4. Commit your changes (`git commit -m 'Add amazing template'`)
5. Push to the branch (`git push origin feature/amazing-template`)
6. Open a Pull Request

---

## Author

**Asadbek Abdulboqiyev**
- Telegram: [@tmeAsadbek](https://t.me/tmeAsadbek)
- GitHub: [@asadbekabdulboqiyev](https://github.com/asadbekabdulboqiyev)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ using Flutter, Arduino, Python, JavaScript & more
</p>
