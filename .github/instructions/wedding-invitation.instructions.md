---
description: "Use when creating, designing, editing, translating, exporting, or hosting the Srinidhi & Shilpa wedding invitation: the invitation website (index.html, assets/), the 9:16 card (card.html), PNG/PDF exports, calendar (.ics) files, music, or GitHub Pages. Holds the confirmed event facts, approved wording, the traditional South Indian / Kannada design system, website behaviour, output specs, and the quality checklist."
applyTo: ["index.html", "card.html", "assets/**", "calendar/**", "export.ps1", "audio/**", "exports/**"]
---
# Srinidhi & Shilpa: Traditional Wedding Invitation

The project is a small static website, ready for GitHub Pages. It has two pages:

- **`index.html`** is the invitation as a modern, app-like website. It opens with temple doors and then shows a live countdown, a ceremony timeline with add-to-calendar, the venue with a map, share actions, bottom dock navigation, and background music (on by default).
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
- The card also comes in an **English** version (`card.html?lang=en`, section 5) for guests who don't read Kannada. It writes the invocation, shloka, and title in English letters and leaves out the other Kannada lines:
  - `॥ Sri Ganeshaya Namah ॥` (the ॥ marks use the Kannada font)
  - `Vakratunda Mahakaya Suryakoti Samaprabha ।` / `Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ॥`
  - `Shubha Vivaha` (title)
  - The ceremony names appear in English only, and the closing line "Eagerly awaiting your gracious presence" takes the Kannada sign-off's place.
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

**Motion** (gentle and devotional, never flashy, and alive on every screen):

- Ambient loops on both pages:
  - mango leaves sway and temple bells swing
  - the Ganesha halo glows softly and the diya flame flickers
  - the mandala turns slowly and sparkles twinkle beside the names
  - a sparse shower of marigold, rose, jasmine, and turmeric petals falls (pushpa vrishti). The petals stay behind the text and never block clicks.
- On the website, every section keeps something moving (see section 4), so no screen looks static on a phone.
- Animate only `transform` and `opacity`. Never move or fade text after its entrance; the one exception is each new countdown number dropping into its tile.
- Every guest gets the full motion, including phones that ask for reduced motion. Many Android battery savers and "Remove animations" switches ask for it without the guest choosing, and the invitation then looked frozen. Don't add a pause-animations button; the family doesn't want one.

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
   - The plaque has a single **Open invitation** button. That tap swings the doors open, starts the music (it is on by default), and the site rises in.
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
   - A **Card language** picker (`fieldset.card-lang`, JavaScript only): **Kannada + English** (the default) or **English**. It swaps the preview image, the downloads, and the animated card link to that version. Each swapped link or image keeps its English address in `data-href-en`, `data-src-en`, or `data-alt-en`; without JavaScript the picker hides and the links stay on Kannada + English.
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

- **Doors**: swing open slowly, over about 4 s, and the site is ready after 4.3 s (`app.js` timers 900, 3600 and 4300 ms). The family asked for an unhurried opening; a much longer one would keep guests waiting.
  - Each door has its own `perspective()` inside its transform. WebKit (Safari and every iPhone browser) ignores a parent's perspective here and would squash the doors flat.
  - The depth is `--door-depth: clamp(480px, 125vw, 1800px)`, so the swing looks equally deep on phones and desktops.
- **Hero**: items rise in sequence (`html.revealed` with `[data-rise]` and `--i`).
- **Sections**: reveal on scroll (`[data-reveal]` with an optional `--delay`). In Celebrations, each day title, ceremony card, the Muhurtham plaque, and the "Add all" link reveal one by one.
- **Scrolling**: dock and button links scroll smoothly (`html.smooth-scroll`, added on `load`). Deep links such as `…/#venue` jump straight to the section, so they don't animate past the hero or stop short when web fonts load.
- **Ambient loops**: as listed in section 3, plus one or more in every section:
  - **Intro**: a soft ring pulses around **Open invitation**.
  - **Home**: each new countdown number drops into its tile.
  - **Section ornaments**: they breathe gently.
  - **Couple**: the medallions turn, and a ring ripples out from the "&".
  - **Celebrations**: a light travels down the timeline, and the timeline dots ripple. The Varapuje icon floats, the Sangeet drum beats, and the Reception diya flickers. The kalashas float and the Muhurtham plaque glows.
  - **Venue**: the pin bounces.
  - **Share**: the card preview floats.
  - **Drifts**: `.drift` layers (filled by `app.js` from `data-count`) send petals down the ivory sections and diya sparks up the maroon ones and the footer, behind the content (`.section > .container` sits above them).

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
- **English version**: adding `?lang=en` to the URL (the head script adds `html.lang-en`) shows the English card from section 2.
  - Elements with class `kn` are hidden, and `.en-only` elements appear: the English invocation, shloka, and title, plus a second diamond so the plaque reads "◆ Muhurtham ◆". Everything else is shared, so a change to the card changes both versions.
  - Without `?lang=en` the card is exactly the Kannada + English card.
- **Export and print**:
  - Adding `?export` to the URL renders the bare, motionless card at exactly 540 × 960. It also hides the petals, the music button, and the back link. It combines with `lang=en` (`card.html?export&lang=en`).
  - Print uses `@page { size: 5.625in 10in; margin: 0 }` with `print-color-adjust: exact`. Print also drops the simulated paper grain to keep the PDF small.

## 6. Music (both pages)

- **When it plays**:
  - It is on by default; the family asked for this. The guest turns it off with the dock's music button or the card's round button, and that choice lasts for the visit (`sessionStorage['sws-music-off']`, shared by both pages).
  - Browsers allow sound only after a tap or key press, so on the website it starts with the **Open invitation** tap. When the doors are skipped, and on the card, it starts at once where the browser allows it (Chrome does after a tap on the previous page). Otherwise it starts with the guest's first tap or key press anywhere; a tap on the music button itself is left to the button.
  - It rests while the page is hidden (another app or tab) and carries on when the guest comes back.
  - It fades in, starts at the `data-play-from` second set on the `<audio>` element (35, because the family asked to skip the recording's slow opening; a new phrase begins there), goes back there on reaching `data-play-to` (266.5, once the last note has rung out, which skips the silent ending) or the end of the file, and fades out on pause. (It is not `data-start`: the status chips select every `[data-start]` element.)
- **The recording**: *Haratanaya Sree*, a composition of Veena Raja Rao in raga Nata, played on the veena by his daughter and disciple Veena Kinhal, from *Tribute to Veena Raja Rao* (2009, 4 min 33 s). She released it into the public domain on the [Internet Archive](https://archive.org/details/VeenaKinhalTributeToVeenaRajaRao) (it is also on Free Music Archive), so it is free to publish. `audio/haratanaya-sree.mp3` is the archive's original MP3 (MD5 `17d2ae3db528ee5489be5e212f7726f6`). It plays as background audio only; no video player is ever shown.
  - The family first wanted *Seetha Kalyana Vaibhogame*, but every recording they found is copyrighted: Phani Narayana's instrumental (Strumm Entertainment; YouTube `OhDBfhbX5L4`, `D-4bPaUMaB4`, `z6-zn6WX2DY`), Karthick Iyer's violin (`bSv6F6a_214`), Veena Srivani (`48Wpqaqtch4`), Shreya Ramaswamy's veena (`XYPFVoIrecU`), and the *Nadamohanam* nadaswaram by Blue Planet Cinema (`I1mLL6AlQXA`). Wikimedia Commons, Free Music Archive and the Internet Archive have no free recording of it except a 1975 vocal concert, which sounded too old (checked October 2026).
  - To switch to one of those, the family needs the audio file and permission from whoever owns the recording (the label, producer or artist). Then replace the file, set `src` and both `data-play-*` values on both pages (`data-play-from="0"` plays from the beginning; without `data-play-to` it plays to the end), and update the comments beside both `<audio>` elements.
  - Never download, rip, bundle, or hide-play audio from YouTube, streaming services, or film soundtracks. YouTube allows playback only in a visible player, which the family does not want.
  - No credit is shown on either page; the family asked for it to be removed, and public-domain music needs none. The source is recorded here and in the comment beside each `<audio>` element.
- **If the file is missing**: every music control hides itself, so no page ever shows a broken control.
  - Both pages detect the file with `loadedmetadata`/`error` events plus an HTTP `HEAD` check, because iOS doesn't preload audio.
- **Controls**: they use `aria-pressed` and a "Play/Pause music: Haratanaya Sree" label or title, and an equalizer animation runs while the song plays.

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
exports/    srinidhi-weds-shilpa-invitation.png / .pdf / -preview.jpg (Kannada + English)
            srinidhi-weds-shilpa-invitation-english.png / .pdf / -preview.jpg (English)
audio/      haratanaya-sree.mp3 (public domain; see section 6)
export.ps1, .github/   tooling (harmless if published)
```

- **Exports**: run `powershell -ExecutionPolicy Bypass -File .\export.ps1` after every change to `card.html`. It renders `card.html?export` (Kannada + English) and `card.html?export&lang=en` (English, files ending `-english`) with headless Microsoft Edge, and writes three files of each to `exports/`:
  - PNG: 1080 × 1920, for WhatsApp
  - PDF: 5.625 × 10 in, for print
  - Preview JPG: 540 × 960, used by the website's Share section
- **QR code**: an inline SVG that encodes the map link. If the link changes, regenerate it with Python `segno` using `segno.make(url, error="m").svg_inline(dark="#4A0A14", border=0, omitsize=True)`, then update both pages.
- **Local preview**: run `python -m http.server 8000 --bind 127.0.0.1` in the project folder, then open <http://127.0.0.1:8000/> (website) or <http://127.0.0.1:8000/card.html> (card). Opening the files directly also works, but the music check and the share URL behave best over HTTP.
  - Python's server ignores byte-range requests, so Chrome and Edge can't seek there: they play the song from 0:00 instead of 0:35 and don't skip the silent ending. GitHub Pages supports ranges, so the live site does both in every browser.
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
  - [ ] Every animation that runs on desktop also runs on phones, including phones set to reduce motion, and every section has visible motion.
  - [ ] Phones (360–412 px wide, plus landscape) show the doors turning in 3D, the garland and bells swaying, and no horizontal scrolling. Check with a WebKit (iPhone) and a Chromium (Android) engine.
  - [ ] Without the MP3, the only console errors are the expected 404s for it.
- [ ] Card: nothing overflows or touches the frame, the thorana, or the bells. The animations never appear in the PNG or PDF.
- [ ] Both card versions: the English card (`card.html?lang=en`, the `-english` files) shows no Kannada letters, and the Kannada + English card shows no English-only lines. The Share section's **Card language** picker switches the preview, the PNG, the PDF, and the animated card link.
- [ ] Music is on by default: it starts with **Open invitation** (or the first tap when the doors are skipped, and on the card), plays as background audio with no visible player, starts at `data-play-from` (35 s), goes back there from `data-play-to` (266.5 s), toggles play/pause with a fade, and stays off for the visit once the guest turns it off. Its controls are hidden when `audio/haratanaya-sree.mp3` is missing. The recording is public domain or properly licensed, no credit text is shown, and nothing is taken from YouTube or streaming services.
- [ ] After every change to `card.html`, re-export and visually check the PNG, PDF, and preview JPG of both versions.
- [ ] No invented facts and no visible placeholders.
