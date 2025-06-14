# Webpage to SVG Exporter – Chrome Extension

This Chrome extension allows you to **export the full visible webpage** (including images and styles) into an **SVG** file. It names the output file based on the **website's title or domain name** automatically.

---

## 🚀 Features

- Export any webpage (including images and layout) to SVG
- PNG fallback if SVG fails
- Automatically names the download using the site’s title (e.g., `example-com.svg`)
- Lightweight and easy to use via a popup

---

## 🛠️ Installation (Developer Mode)

1. Clone or download this repository.
2. Go to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked**.
5. Select the extension directory.

---

## 🧩 How to Use

1. Navigate to any webpage you want to convert.
2. Click the extension icon in your Chrome toolbar.
3. A popup will appear with a **“Download SVG”** button.
4. Clicking it will:
   - Convert the full page to an SVG
   - Automatically download the file as `site-title.svg`

If SVG conversion fails, it will fall back to PNG.

---

## 📁 Project Structure

```
webpage-to-svg-extension/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
└── html-to-image.min.js
```

---

## 📦 Dependencies

- [html-to-image](https://github.com/bubkoo/html-to-image) – Client-side DOM to image/SVG rendering library

This dependency is loaded directly via CDN in the popup.

---

## 🔒 Permissions

The extension uses minimal permissions:
- `activeTab` – To access and convert the current page
- `scripting` – To inject content scripts
- `downloads` – To save the file automatically

---

## 📋 Known Limitations

- Some complex pages or cross-origin images may not render perfectly.
- Inline images are fetched and converted to base64 but may fail if CORS blocks access.

---

## 🧑‍💻 Author

Built by Gokul – feel free to fork and customize.

---

## 📃 License

MIT License – free to use, modify, and distribute.
