---
description: "Use when creating, designing, editing, translating, exporting, or hosting the Srinidhi & Shilpa wedding invitation: the invitation website (index.html, assets/), the 9:16 card (card.html), PNG/PDF exports, calendar (.ics) files, music, or GitHub Pages. Holds the confirmed event facts, approved wording, the traditional South Indian / Kannada design system, website behaviour, output specs, and the quality checklist."
applyTo: ["index.html", "card.html", "assets/**", "calendar/**", "export.ps1", "audio/**", "exports/**"]
---
# Srinidhi & Shilpa: Traditional Wedding Invitation

The project is a small static website, ready for GitHub Pages. It has two pages:

- **`index.html`** is the invitation as a modern, app-like website. It opens with temple doors and then shows a live countdown, a ceremony timeline with add-to-calendar, the venue with a map, share actions, bottom dock navigation, and optional music.
- **`card.html`** is the classic 9:16 animated card. The PNG and PDF exports are made from it, and the website reuses its artwork.

## 1. Confirmed facts (single source of truth)

Copy these exactly. Never change, round, or "correct" them, and never add facts that are not listed here.

| Ceremony | Kannada | Day & date | Time | Machine time (IST) |
|---|---|---|---|---|
| Varapuje | ವರಪೂಜೆ | Sunday, 15th November 2026 | 10:30 AM | `2026-11-15T10:30:00+05:30` |
| Sangeet | ಸಂಗೀತ್ | Sunday, 15th November 2026 | 12:30 PM | `2026-11-15T12:30:00+05:30` |
| Reception | ಆರತಕ್ಷತೆ | Sunday, 15th November 2026 | 7:00 PM onwards | `2026-11-15T19:00:00+05:30` |
| Muhurtham (wedding) | ಶುಭ ಮುಹೂರ್ತ | Monday, 16th November 2026 | 9:00 AM – 10:00 AM | `2026-11-16T09:00:00+05:30` to `2026-11-16T10:00:00+05:30` |

- **Groom**: Chi. Srinidhi, son of Smt. Manjula S (mother) & Sri. Shamaprasad S (father)
- **Bride**: Chi. Sow. Shilpa, daughter of Smt. Rekha L (mother) & Sri. Lakshman Rao (father)
- **Couple**: Srinidhi & Shilpa, always in this order.
- **Venue (all ceremonies)**: Aarpee Ashraya Kalyana Mantapa, Magadi Main Road, Agrahara Dasarahalli, Rajajinagar, Bengaluru – 560079
- **Map link**: <https://www.google.com/maps/search/?api=1&query=Aarpee+Ashraya+Kalyana+Mantapa+Bengaluru>

**Not provided, so do not invent:**

- gotra
- grandparents' or other relatives' names
- panchanga details (samvatsara, masa, tithi, nakshatra, lagna)
- RSVP contacts
- dress codes
- meal timings
- end times for the 15 November ceremonies
- photos
- a wedding hashtag

Leave these out or ask the user. Once the user confirms a new fact, add it to this section. Never leave placeholder text such as "[Name]" on a finished page.

## 2. Wording

- English is the main language. Use Kannada for the invocation, shloka, title, ceremony names, and sign-off. Wrap Kannada in `lang="kn"`.
- Keep the tone formal, warm, and reverent. Don't use slang, emojis, or hashtags.
- Use these Kannada strings verbatim. Don't write new Kannada sentences unless the user has reviewed them:
  - `॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥`: Salutations to Lord Ganesha (invocation)
  - `ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ ।` / `ನಿರ್ವಿಘ್ನಂ ಕುರು ಮೇ ದೇವ ಸರ್ವಕಾರ್ಯೇಷು ಸರ್ವದಾ ॥`: Ganesha shloka
  - `ಶುಭ ವಿವಾಹ`: Auspicious wedding (title)
  - `ತಮ್ಮ ಆಗಮನಾಭಿಲಾಷಿಗಳು`: "Eagerly awaiting your arrival" (traditional sign-off)
- Approved English copy:
  - Lead: "With the blessings of the Almighty and our elders, we joyfully invite you and your family to the auspicious wedding of"
  - Couple block, one centred line each: "Chi. Srinidhi" / "son of Smt. Manjula S & Sri. Shamaprasad S" / "&" / "Chi. Sow. Shilpa" / "daughter of Smt. Rekha L & Sri. Lakshman Rao". Keep the mother-first order the family gave. Don't write the parents' names in Kannada unless the family has reviewed the spelling.
  - Closing: "Eagerly awaiting your gracious presence" followed by "With love & regards, the families of Srinidhi & Shilpa"
- Website strings set in `assets/app.js`:
  - Share message: "You're invited to the wedding of Srinidhi & Shilpa. Muhurtham: Monday, 16th November 2026, 9:00 AM – 10:00 AM at Aarpee Ashraya Kalyana Mantapa, Bengaluru." The site URL is added after it.
  - Countdown end states: "The Muhurtham is happening now" (16 Nov, 9:00–10:00 AM IST), then "Thank you for your blessings".
  - Status chips: "In N days", "Tomorrow", "Today · in Xh Ym", "Today", "Happening now", "Completed".
- Website interface copy (section titles, button labels, hints) may be reworded, but it must never add facts.
- Formats: write dates as "Monday, 16th November 2026" and times as "9:00 AM – 10:00 AM" (en dash, uppercase AM/PM). Spell the city "Bengaluru".

## 3. Design system: traditional South Indian (Kannada), shared by both pages

**Palette** (CSS custom properties)

| Token | Hex | Use |
|---|---|---|
| `--maroon` | `#6B0F1F` | silk frame, headings, Muhurtham plaque, dark sections |
| `--maroon-deep` | `#4A0A14` | strong text on ivory, QR code, `theme-color` |
| `--gold` | `#C9973A` | rules, line-art, borders |
| `--gold-light` | `#F0D58C` | text and ornaments on maroon |
| `--turmeric` | `#E8A317` | small accents, focus ring |
| `--marigold` | `#EE7F1A` | marigold flowers |
| `--leaf` | `#2F6B2F` | mango leaves |
| `--ivory` / `--sandal` | `#FFF8EA` / `#F3E2BF` | paper, light sections, and vignette |
| `--ink` | `#3B1F14` | body text |

**Typography** (Google Fonts, always with fallbacks)

| Role | Font |
|---|---|
| Couple's names (the largest text) | Great Vibes |
| Headings, labels, and the Chi. / Chi. Sow. honorifics (caps, letter-spaced) | Cinzel |
| Body, including the parents' lines (italic for the lead line and for "son of" / "daughter of") | Cormorant Garamond |
| Kannada | Tiro Kannada → Noto Serif Kannada → Nirmala UI |
| Website controls only (buttons, chips, dock, toast) | system UI font (`--f-ui`) |

**Motifs**: hand-built inline SVG in gold line-art with limited colour. Don't use photos, clip-art, or emojis.

- Mango-leaf **thorana** with marigolds across the top, plus hanging **temple bells**
- **Lord Ganesha** line-art with a dotted prabhavali (halo) above the invocation
- Maroon **silk** with a Kanjeevaram/Mysore-silk **zari temple border** (gold triangles). On the website the border is a strip between sections.
- **Kalasha** (pot, coconut, mango leaves) on both sides of the Muhurtham
- Ceremony icons: kalasha for Varapuje, dholak for Sangeet, diya for Reception
- **Rangoli/kolam** corner fans and a faint **mandala** watermark behind the names
- Carved **temple doors** for the website intro
- Western wedding motifs (rings, champagne, doves) don't fit this theme. Don't use them.

**Hierarchy**: names > Muhurtham > ceremonies > venue > ornament text.

- Every date, time, address, and parent's name must stay readable on a phone. On the card that means at least 2.6% of the card width; the decorative shloka can be smaller.
- Use `--gold` text only when it is large or sits on maroon. Small text on ivory uses `--ink`, `--maroon-deep`, or `--gold-deep`.

**Motion** (gentle and devotional, never flashy):

- Ambient loops on both pages:
  - mango leaves sway and temple bells swing
  - the Ganesha halo glows softly and the diya flame flickers
  - the mandala turns very slowly and sparkles twinkle beside the names
  - a sparse shower of marigold, rose, jasmine, and turmeric petals falls (pushpa vrishti). The petals stay behind the text and never block clicks.
- Animate only `transform` and `opacity`. Never move or fade text after its entrance.
- Declare full motion inside `@media (prefers-reduced-motion: no-preference)`. Reduced motion (which some Android battery savers also switch on) gets a calmer version, not none: the garland and bells sway twice and come to rest, the sparkles glint twice, and content fades in. There are no petals, no spinning or sliding, and nothing loops forever.

## 4. Website: `index.html`

**Files**:

- `index.html`: markup plus inline SVG art.
- `assets/app.css`
- `assets/app.js`: vanilla, no dependencies.
- `assets/favicon.svg`

There are no frameworks and no build step. The only external resources are Google Fonts and the Google Maps embed. All paths are relative, so the site works under any GitHub Pages repository name.

**Sections, top to bottom**:

1. **Intro** (`#intro`, a modal dialog):
   - Two carved maroon temple doors under a thorana, with an arched plaque: Ganesha, invocation, ಶುಭ ವಿವಾಹ, names, and the date.
   - The plaque has an **Open invitation** button, plus **Open with music** when the audio file exists. The doors swing open and the site rises in.
   - The doors play on every fresh visit and again on a reload. They are skipped when the guest comes back within the same tab (the back button, or returning from the card; `sessionStorage['sws-opened']`), for links with a `#section` hash, and when JavaScript is off.
2. **Home** (`#home`):
   - Thorana and bells, a slowly turning mandala, Ganesha, the invocation, ಶುಭ ವಿವಾಹ, and the names (`h1#hero-title`).
   - The date and venue, then a live **countdown** to the Muhurtham.
   - **View events** and **Directions** buttons, with petals falling behind.
3. **Couple** (`#couple`): the shloka and lead line, then arch cards for the groom and bride (honorific, name, and parents) joined by an "&" medallion.
4. **Celebrations** (`#events`):
   - A Day 1 timeline (Varapuje, Sangeet, Reception) and the Day 2 Muhurtham plaque with kalashas.
   - Every ceremony has a live status chip and an **Add to calendar** menu (Google Calendar or `.ics`).
   - An "Add all four ceremonies" link downloads the combined `.ics`.
5. **Venue** (`#venue`): the address, **Get directions**, **Copy address**, the map QR code, and an embedded Google Map.
6. **Share** (`#share`):
   - A tilted preview of the card that opens `card.html`.
   - **Share** (Web Share API, shown only where the browser supports it), **WhatsApp**, and **Copy link**.
   - Downloads: card PNG, printable PDF, and the animated card.
7. **Footer**: the Kannada sign-off and the English closing.
8. **Dock**: fixed bottom navigation (Home, Couple, Events, Venue, Share) with a scrollspy, plus the music toggle when the audio file exists. The hero and footer reserve `--dock-space` so the dock never covers content.

**Behaviour** (`assets/app.js`):

- **Countdown**: counts down to 16 Nov 2026, 9:00 AM IST (`Date.UTC(2026, 10, 16, 3, 30)`) and ticks every second. When it reaches zero it shows the end states from section 2.
- **Status chips**: read each card's `data-start` and optional `data-end` (ISO times from section 1). Calendar days are counted in IST, so "Today" and "Tomorrow" stay right for guests abroad. Chips refresh every 30 s.
- **Calendar menus**: `<details class="cal">`, one open at a time. A menu closes on an outside click, on Escape (focus returns to its button), or after a choice.
- **Copy**: uses the Clipboard API with a fallback, then shows a toast (`role="status"`).
- **Share URL**: Share, WhatsApp, and Copy link all use the site root (`new URL('./', location.href)`).
- **Progressive enhancement**:
  - A head script adds `html.js`, and also `opened` when the doors should be skipped.
  - `app.js` sets `window.SWS_READY` and adds `revealed` when the site is shown.
  - If `app.js` hasn't started after 6 s, `js` is removed and the plain page shows.
  - Controls that need JavaScript carry `.js-only`.

**Accessibility**:

- **While the intro is up**: `#app` is `inert`. Tab reaches **Open invitation** first, and Escape also opens the invitation. After opening, focus moves to the names heading (`tabindex="-1"`).
- **Structure**: sections are labelled landmarks, dock links use `aria-current`, and decorative SVGs are `aria-hidden`. The countdown digits are hidden from screen readers, which hear one static sentence instead.
- **Targets and focus**: tap targets are at least 44 px, and the focus ring is a 3 px turmeric outline.

**Motion (website)**:

- **Doors**: open in about 2.1 s.
  - Each door has its own `perspective()` inside its transform. WebKit (Safari and every iPhone browser) ignores a parent's perspective here and would squash the doors flat.
  - The depth is `--door-depth: clamp(480px, 125vw, 1800px)`, so the swing looks equally deep on phones and desktops.
- **Hero**: items rise in sequence (`html.revealed` with `[data-rise]` and `--i`).
- **Sections**: reveal on scroll (`[data-reveal]` with an optional `--delay`).
- **Scrolling**: dock and button links scroll smoothly (`html.smooth-scroll`, added on `load`). Deep links such as `…/#venue` jump straight to the section, so they don't animate past the hero or stop short when web fonts load.
- **Ambient loops**: as listed in section 3.
- **Reduced motion**: the doors turn slightly as they fade (about 1.25 s), the calm versions from section 3 play once the site is revealed, and all content is visible at once.

**Shared artwork**:

- The blocks between `<!--@NAME-->` and `<!--/@NAME-->` markers (`MANDALA`, `INTRO-THORANA`, `HERO-THORANA`, `QR`) are copies of art from `card.html`.
- The Ganesha, kalasha, and icon symbols live in the sprite at the top of `index.html`.
- When artwork changes, update both pages.

## 5. Card: `card.html`

- **Self-contained**: one page with inline CSS, inline SVG, and a small inline script for the music button. A fixed "Invitation" link returns to `index.html`.
- **Artboard**: 9:16, designed at 540 × 960 CSS px. It scales with container query units (`cqw`), so the card looks the same on every screen.
- **Layout**: a single portrait card on one centred axis, from top to bottom:
  1. Thorana and bells
  2. Ganesha, invocation, and shloka
  3. ಶುಭ ವಿವಾಹ and the lead line
  4. Names (hero): a small "Chi." / "Chi. Sow." beside each name (the name itself stays on the centre axis), with that person's parents on the line below
  5. Muhurtham plaque (second hero): maroon with gold text, a kalasha on each side
  6. "Sunday, 15th November 2026", then three ceremony columns in time order: icon, English name, Kannada name, time
  7. Venue with the map QR code and link
  8. Kannada sign-off and English closing
- **Entrance**: the card fades and settles in, the thorana drops in, and the sections rise in one after another from top to bottom.
- **Export and print**:
  - Adding `?export` to the URL renders the bare, motionless card at exactly 540 × 960. It also hides the petals, the music button, and the back link.
  - Print uses `@page { size: 5.625in 10in; margin: 0 }` with `print-color-adjust: exact`. Print also drops the simulated paper grain to keep the PDF small.

## 6. Music (both pages)

- **When it plays**:
  - Never autoplay.
  - On the website, playback starts only from **Open with music** or the dock's music button. On the card, it starts from its round button.
  - It fades in, starts at the `data-play-from` second set on the `<audio>` element (32, so 0:32, which skips the track's intro), loops back to that same point, and fades out on pause. (It is not `data-start`: the status chips select every `[data-start]` element.)
- **The recording**: the family chose the instrumental *Seetha Kalyana Vaibhogame* by Phani Narayana, from the album *Mood Music – Devotional Instrumentals of South India* (℗ 2020 Strumm Entertainment Pvt. Ltd., distributed by The Orchard; on YouTube as video `OhDBfhbX5L4`, 6 min 51 s). It plays as background audio only; no video player is ever shown.
  - It is a commercial recording. Add it as `audio/seetha-kalyana-vaibhogame.mp3` only once the family has the file with permission from Strumm Entertainment (or the artist) to use it on the site. Until then the site ships without music.
  - Never download, rip, bundle, or hide-play audio from YouTube, streaming services, or film soundtracks. YouTube allows playback only in a visible player, which the family does not want.
  - The credit for the track sits in the website footer, and on the card it shows above the button for 6 s when the song starts.
  - To use a different recording (the family's own, or one that is licensed or under Creative Commons), replace the file, set `data-play-from` on both pages (0 plays from the beginning), and update both credits.
- **If the file is missing**: every music control and the footer credit hide themselves, so no page ever shows a broken control.
  - Both pages detect the file with `loadedmetadata`/`error` events plus an HTTP `HEAD` check, because iOS doesn't preload audio.
- **Controls**: they use `aria-pressed` and a "Play/Pause music: Seetha Kalyana Vaibhogame" label or title, and an equalizer animation runs while the song plays.

## 7. Calendar files (`calendar/`)

- **Files**: `varapuje.ics`, `sangeet.ics`, `reception.ics`, `muhurtham.ics`, and `srinidhi-shilpa-wedding.ics` (all four ceremonies).
- **Times**: in UTC (IST − 5:30). For example, 10:30 AM IST is `20261115T050000Z`.
  - Only the Muhurtham has a `DTEND` (`20261116T043000Z`).
  - The 15 November ceremonies have no `DTEND`, because no end times were given.
- **Event fields**:
  - SUMMARY: "<Ceremony> - Srinidhi & Shilpa's wedding"
  - LOCATION: the full venue
  - DESCRIPTION: the IST date and time, the venue, and the map link
  - UID: a stable `<ceremony>-<yyyymmdd>@srinidhi-weds-shilpa`
- **Format**: CRLF line endings, lines folded at 75 octets, and `,` and `;` escaped.
- **Google Calendar links**: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=…&dates=<start>/<end>&ctz=Asia/Kolkata&location=…&details=…`. Times are local IST; start-only ceremonies use the start time for both values.

## 8. Output, local preview, and hosting

```text
index.html  card.html  .nojekyll  .gitattributes
assets/     app.css, app.js, favicon.svg
calendar/   five .ics files
exports/    srinidhi-weds-shilpa-invitation.png / .pdf / -preview.jpg
audio/      seetha-kalyana-vaibhogame.mp3 (add it only once licensed; see section 6)
export.ps1, .github/   tooling (harmless if published)
```

- **Exports**: run `powershell -ExecutionPolicy Bypass -File .\export.ps1` after every change to `card.html`. It renders `card.html?export` with headless Microsoft Edge and writes three files to `exports/`:
  - PNG: 1080 × 1920, for WhatsApp
  - PDF: 5.625 × 10 in, for print
  - Preview JPG: 540 × 960, used by the website's Share section
- **QR code**: an inline SVG that encodes the map link. If the link changes, regenerate it with Python `segno` using `segno.make(url, error="m").svg_inline(dark="#4A0A14", border=0, omitsize=True)`, then update both pages.
- **Local preview**: run `python -m http.server 8000 --bind 127.0.0.1` in the project folder, then open <http://127.0.0.1:8000/> (website) or <http://127.0.0.1:8000/card.html> (card). Opening the files directly also works, but the music check and the share URL behave best over HTTP.
  - Python's server ignores byte-range requests, so Chrome and Edge can't skip to 0:32 there and play the song from 0:00. GitHub Pages supports ranges, so the live site starts at 0:32 in every browser.
- **GitHub Pages**:
  - Live site: <https://sriiiii007.github.io/srinidhi-weds-shilpa/>. Repository: <https://github.com/sriiiii007/srinidhi-weds-shilpa> (public).
  - Pages deploys the `main` branch from `/ (root)`, so a push to `main` goes live within a minute or two.
  - `.nojekyll` makes Pages serve the files as they are.
  - `.gitattributes` keeps the CRLF line endings that `.ics` files need, and marks the images, PDF, and audio as binary.
  - Publish only audio the family has the rights to share (see section 6).
  - `index.html` has `og:url` and an absolute `og:image` (the preview JPG) for rich link previews, and its no-JavaScript WhatsApp link includes the site URL. If the site moves, update all three.

## 9. Quality checklist (verify before finishing)

- [ ] All four ceremonies show the exact day, date, and time on both pages. 15 Nov 2026 is a Sunday and 16 Nov 2026 is a Monday.
- [ ] The names are spelled "Srinidhi" and "Shilpa". The venue and "Bengaluru – 560079" are spelled exactly as in section 1.
- [ ] Each set of parents appears under the right child, spelled exactly as in section 1 with "Smt." and "Sri.", and "Chi." / "Chi. Sow." sit beside the groom's and bride's names.
- [ ] Kannada renders in a Kannada font, with no tofu boxes and no broken conjuncts.
- [ ] Text contrast follows the rules in the Hierarchy paragraph of section 3.
- [ ] Website:
  - [ ] No horizontal scrolling at 360 px or 390 px wide or on desktop, and the dock never covers content.
  - [ ] No awkward one-word line endings.
  - [ ] The countdown and chips are correct. Check them with a shifted clock on 15 Nov in the morning and afternoon, during the Muhurtham, and after it.
  - [ ] The calendar menus, the `.ics` downloads, Copy address, Copy link, Share, and WhatsApp all work.
  - [ ] Keyboard: Tab reaches **Open invitation**, Escape opens the invitation, and focus lands on the names.
  - [ ] Reduced motion leaves no endless animation: only the calm, short versions from section 3 run.
  - [ ] Phones (360–412 px wide, plus landscape) show the doors turning in 3D, the garland and bells swaying, and no horizontal scrolling. Check with a WebKit (iPhone) and a Chromium (Android) engine.
  - [ ] Without the MP3, the only console errors are the expected 404s for it.
- [ ] Card: nothing overflows or touches the frame, the thorana, or the bells. Animations stop with reduced motion and never appear in the PNG or PDF.
- [ ] Music never autoplays, plays as background audio with no visible player, starts and loops back at `data-play-from` (0:32), and toggles play/pause with a fade. Its controls and credits are hidden when `audio/seetha-kalyana-vaibhogame.mp3` is missing. The recording is properly licensed and credited, and nothing is taken from YouTube or streaming services.
- [ ] After every change to `card.html`, re-export and visually check the PNG, PDF, and preview JPG.
- [ ] No invented facts and no visible placeholders.
