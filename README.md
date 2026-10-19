# Rameshbabu & Supriya · Wedding Invitation

An interactive, responsive digital wedding invitation web application and animated card for the wedding of **Rameshbabu & Supriya**.

- **Wedding Date (Muhurtham)**: Sunday, 01 November 2026 (8:00 AM – 9:00 AM IST)
- **Main Venue**: Shri Veerashaiva Kalyana Mantapa, Madakari Nagara, Challakere, Karnataka 577522
- **Day 1 Ceremonies (Saturday, 31st October 2026)**:
  - **Varapuje**: 10:30 AM (Morubagal, Andhra Pradesh)
  - **Sangeet**: 12:30 PM (Shri Veerashaiva Kalyana Mantapa, Challakere)
  - **Reception**: 6:30 PM onwards (Shri Veerashaiva Kalyana Mantapa, Challakere)

---

## ✨ Features

- **Royal Emerald & Champagne Gold Theme**: Rich visual aesthetic featuring traditional temple motifs, Zari borders, and flower garlands.
- **3D Doors Opening Ceremony**: Interactive door animation on first visit leading into the ceremony details.
- **Authentic Sanskrit Invocations**: Sacred Vedic shlokas rendered in classical Devanagari script (*Tiro Devanagari Sanskrit* / *Noto Serif Devanagari*).
- **Legible Script Typography**: Modern script typography (*Allura*) for couple names.
- **Live Countdown & Status Chips**: Real-time countdown clock and dynamic status indicators for each ceremony.
- **Add to Calendar**: Integrated Google Calendar one-click links and downloadable `.ics` calendar files for Apple Calendar, Outlook, and others.
- **Interactive Music Player**: Background music player with seamless looping and audio fade controls (*Vachindamma* instrumental flute).
- **Animated Card Page (`card.html`)**: Mobile-first digital invitation card with falling petals and interactive controls.
- **Print & Share Exports**: High-resolution print-ready PDFs and WhatsApp-ready PNGs in [`exports/`](exports/).

---

## 💻 Local Development & Preview

This project is 100% static (HTML, CSS, JavaScript) and requires no build tools or servers.

To run locally:

```bash
# Start a local static file server using Python
python -m http.server 8000
```

Then open your browser to:
- **Main Invitation**: [http://localhost:8000/](http://localhost:8000/)
- **Animated Card**: [http://localhost:8000/card.html](http://localhost:8000/card.html)

---

## 🚀 GitHub Pages Deployment

The repository is configured to be served directly by GitHub Pages from the repository root:

1. **Source**: Deploy from a branch
2. **Branch**: `main`
3. **Folder**: `/ (root)`

All assets, styles, scripts, audio files, and links use relative paths, ensuring full compatibility whether hosted on a custom domain or a GitHub Pages subpath (`https://<username>.github.io/<repo-name>/`).
