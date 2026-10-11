---
description: "Create or update the traditional Srinidhi & Shilpa wedding invitation (app-style website index.html, 9:16 card.html, PNG/PDF exports, calendar files) following the wedding-invitation instructions."
argument-hint: "Optional changes, e.g. 'add RSVP: ...', 'green & gold palette', 'more Kannada'"
agent: "agent"
---
Create or update the traditional wedding invitation for Srinidhi & Shilpa.

Follow [wedding-invitation.instructions.md](../instructions/wedding-invitation.instructions.md) exactly. It is the single source of truth for facts, wording, design, behaviour, and output.

1. Apply any changes the user requested in chat. If a change needs a fact that isn't in the instructions (e.g., gotra or RSVP numbers), ask the user for it first and never invent it. Then record the confirmed fact in the instructions file.
2. Make the change everywhere the fact or design appears:
   - The website: `index.html`, `assets/app.css`, and `assets/app.js`. This includes the countdown, the status-chip `data-start`/`data-end` times, the share text, and the Google Calendar links.
   - The card: `card.html`.
   - The calendar files in `calendar/`, if a time, title, or the venue changes.
3. If `card.html` changed, run `powershell -ExecutionPolicy Bypass -File .\export.ps1` to regenerate the PNG, PDF, and preview JPG in `exports/`. Open the PNG and check it against the quality checklist.
4. Check the website over HTTP (`python -m http.server 8000 --bind 127.0.0.1`) at phone width (360–390 px) and on desktop. Work through the website items in the quality checklist, and fix and re-check until every item passes.
5. Reply with a short summary of what changed, the files touched, and the local URL to preview.
