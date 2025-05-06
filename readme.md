
---

# vite-plugin-page-translate

🌍 **Vite plugin for immersive in-page translation** — seamlessly translate selected zones of your web app and optionally show original text.

![npm](https://img.shields.io/npm/v/vite-plugin-page-translate) ![license](https://img.shields.io/npm/l/vite-plugin-page-translate)

---

## ✨ Features

- Translate specific elements or components (using CSS selector)
- Cache original text and allow toggling back to original
- Automatic translation on page load (optional)
- MutationObserver support for dynamic content updates
- Works with Vue, React, and vanilla projects

---

## 📦 Installation

```bash
npm install vite-plugin-page-translate
# or
yarn add vite-plugin-page-translate
```

---

## 🚀 Usage

### 1. Add the plugin in `vite.config.ts`

```ts
import pageTranslate from 'vite-plugin-page-translate';

export default {
  plugins: [
    pageTranslate({
      selector: '.translate-zone',  // CSS selector to target
      lang: 'zh-CN',                // Target language (default: zh-CN)
      autoStart: true               // Automatically start translation on page load
    })
  ]
};
```

---

### 2. Mark the zones to translate

In your HTML or Vue templates:

```html
<div class="translate-zone">
  <p>Hello, this is a translatable section.</p>
</div>
```

---

### 3. Control translation from your app (optional)

The plugin exposes a global API:

```js
window.__pageTranslate.start();
window.__pageTranslate.reset();
window.__pageTranslate.showOriginal();
```

---

## 🔧 Options

| Option      | Type     | Default    | Description                              |
|-------------|----------|------------|----------------------------------------|
| selector   | string   | `.translate-zone` | CSS selector for translation target |
| lang       | string   | `zh-CN`    | Target language code                  |
| autoStart  | boolean  | `true`     | Automatically translate on page load  |

---

## 📜 Example

```ts
pageTranslate({
  selector: '.article-content',
  lang: 'fr',
  autoStart: false
});
```

---

## ⚙️ Build & Publish

1. Build the plugin

```bash
npm run build
```

2. Publish to npm

```bash
npm publish --access public
```

---

## 💬 License

MIT

---

## ✨ Credits

Inspired by the idea of immersive, user-controlled translation for modern web apps.

---
