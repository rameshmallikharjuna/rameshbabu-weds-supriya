/* Rameshbabu & Supriya: wedding invitation app behaviour. No dependencies. */
(function () {
  'use strict';

  window.SWS_READY = true;
  var html = document.documentElement;

  // The head script drops .js if this file was slow to arrive. Restore it without replaying the doors.
  if (!html.classList.contains('js')) html.classList.add('js', 'opened', 'revealed');

  // Smooth scrolling is for in-page navigation only. Turned on before load, it would also animate a
  // #venue deep link past the hero and could stop short when web fonts shift the layout mid-scroll.
  function enableSmoothScroll() { html.classList.add('smooth-scroll'); }
  if (document.readyState === 'complete') enableSmoothScroll();
  else window.addEventListener('load', enableSmoothScroll);

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var pageUrl = new URL('./', location.href).href;
  var shareText = "You're invited to the wedding of Rameshbabu & Supriya. Muhurtham: Sunday, 01 November 2026, 8:00 AM \u2013 9:00 AM at Shri Veerashaiva Kalyana Mantapa, Challakere.";

  /* ---------- Toast ---------- */
  var toastEl = $('#toast');
  var toastTimer = 0;
  function toast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('is-shown');
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-shown');
      toastTimer = setTimeout(function () { toastEl.textContent = ''; }, 300);
    }, 2400);
  }

  /* ---------- Music: audio/vachindamma.mp3 in the background (the button hides if it is missing) ---------- */
  // The music is on by default. Browsers only allow sound after a tap or key press, so it starts with
  // Open invitation, or with the guest's first tap when the doors are skipped. Turning it off with the
  // dock button lasts for the visit (sessionStorage['sws-music-off'], shared with the card page).
  var audio = $('#bgm');
  var musicBtn = $('#music');
  var audioReady = false;
  var fadeTimer = 0;
  // The song starts at data-play-from seconds, skipping the recording's opening. On reaching
  // data-play-to seconds (once the last note has rung out) or the end of the file, it goes back there.
  var startAt = parseFloat(audio.getAttribute('data-play-from')) || 0;
  var endAt = parseFloat(audio.getAttribute('data-play-to')) || 0;
  var loopByHand = startAt > 0 || endAt > 0;
  function readMusicOff() {
    try { return sessionStorage.getItem('sws-music-off') === '1'; } catch (e) { return false; }
  }
  var musicOff = readMusicOff();
  function setMusicOff(off) {
    musicOff = off;
    try {
      if (off) sessionStorage.setItem('sws-music-off', '1');
      else sessionStorage.removeItem('sws-music-off');
    } catch (e) {}
  }

  function showMusic() {
    if (audioReady) return;
    audioReady = true;
    musicBtn.hidden = false;
  }
  function hideMusic() {
    audioReady = false;
    musicBtn.hidden = true;
    stopWaitingForTap();
  }
  function setPlaying(on) {
    musicBtn.classList.toggle('is-playing', on);
    musicBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    musicBtn.title = (on ? 'Pause' : 'Play') + ' music: Vachindamma (Flute)';
  }
  function isPlaying() { return musicBtn.classList.contains('is-playing'); }
  // data-play-from is ignored if the file is too short for it, and data-play-to if the file ends before it.
  // Before the metadata loads (iOS), setting currentTime sets the position the browser starts from once it does.
  function startPos() { return startAt > 0 && !(audio.duration <= startAt + 1) ? startAt : 0; }
  function endPos() { return endAt > startPos() + 1 && !(audio.duration < endAt) ? endAt : 0; }
  function toStart() {
    if (audio.currentTime < startPos()) {
      try { audio.currentTime = startPos(); } catch (e) {}
    }
  }
  // A timer, not requestAnimationFrame: rAF stops in background tabs and would leave a pause fade
  // unfinished. Volume must stay within [0, 1] or the browser throws. It is read-only on iOS, so the
  // fade does nothing there and playback still works.
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    var from = audio.volume;
    var t0 = Date.now();
    fadeTimer = setInterval(function () {
      var k = Math.max(0, Math.min(1, (Date.now() - t0) / ms));
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k === 1) {
        clearInterval(fadeTimer);
        if (done) done();
      }
    }, 40);
  }
  function playMusic() {
    if (audio.paused) audio.volume = 0;
    toStart();
    setPlaying(true);
    var p = audio.play();
    fadeTo(0.8, 1500);
    if (p && p.catch) {
      p.catch(function () {
        if (!audio.paused) return; // a later attempt is already playing
        setPlaying(false);
        waitForTap();
      });
    }
  }
  function pauseMusic() {
    setPlaying(false);
    fadeTo(0, 500, function () { audio.pause(); });
  }

  // Until the browser allows sound, the guest's first tap or key press anywhere starts the music. A blocked
  // attempt leaves the audio paused, so it keeps trying until one of the events counts as a tap.
  var TAP_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'];
  var waitingForTap = false;
  function onFirstTap(e) {
    if (musicBtn.contains(e.target)) return; // the button's own click handles it
    if (musicOff || audio.error || !audio.paused) { stopWaitingForTap(); return; }
    playMusic();
    if (!audio.paused) stopWaitingForTap();
  }
  function waitForTap() {
    if (waitingForTap || musicOff || audio.error) return;
    waitingForTap = true;
    TAP_EVENTS.forEach(function (type) { document.addEventListener(type, onFirstTap, true); });
  }
  function stopWaitingForTap() {
    if (!waitingForTap) return;
    waitingForTap = false;
    TAP_EVENTS.forEach(function (type) { document.removeEventListener(type, onFirstTap, true); });
  }

  audio.addEventListener('loadedmetadata', function () {
    showMusic();
    if (isPlaying()) toStart();
  });
  audio.addEventListener('error', hideMusic);
  // These events can arrive late (a page frozen by Back and then restored delivers them afterwards), so they
  // only update the button when the audio is still in that state.
  audio.addEventListener('play', function () { if (!audio.paused) setPlaying(true); });
  // The end of the file also fires 'pause'; the button stays on because 'ended' starts the next pass.
  audio.addEventListener('pause', function () { if (audio.paused && !(audio.ended && loopByHand)) setPlaying(false); });
  if (loopByHand) {
    audio.loop = false; // the native loop would restart at 0:00, after the silent ending
    audio.addEventListener('ended', function () {
      if (!isPlaying()) return;
      audio.currentTime = startPos();
      var p = audio.play();
      if (p && p.catch) p.catch(function () { setPlaying(false); });
    });
    // timeupdate fires about every 250 ms, so the jump lands within a quarter second of data-play-to.
    audio.addEventListener('timeupdate', function () {
      if (isPlaying() && endPos() && audio.currentTime >= endPos()) audio.currentTime = startPos();
    });
  }
  if (audio.readyState > 0) showMusic();
  // iOS never preloads media, so also ask the server whether the file exists.
  if (/^https?:$/.test(location.protocol) && window.fetch) {
    fetch(audio.currentSrc || audio.src, { method: 'HEAD', cache: 'no-store' })
      .then(function (r) { if (r.ok) showMusic(); else hideMusic(); })
      .catch(function () {});
  }
  musicBtn.addEventListener('click', function () {
    stopWaitingForTap();
    var on = !musicBtn.classList.contains('is-playing');
    setMusicOff(!on);
    if (on) playMusic(); else pauseMusic();
  });
  // The music rests while the guest is in another app or tab, or on the card page, and carries on when
  // they come back. Back restores this page as it was, so the on/off choice is read again: the guest may
  // have changed it on the card page.
  var pausedByHide = false;
  function onPageHide() {
    if (isPlaying() && !audio.paused) {
      pausedByHide = true;
      clearInterval(fadeTimer);
      audio.pause();
    }
  }
  function onPageShow() {
    var resume = pausedByHide;
    var wasOff = musicOff;
    pausedByHide = false;
    musicOff = readMusicOff();
    if (musicOff) stopWaitingForTap();
    else if (resume || (wasOff && (opening || html.classList.contains('opened')))) playMusic();
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) onPageHide(); else onPageShow();
  });
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', function (e) { if (e.persisted) onPageShow(); });

  /* ---------- Intro doors ---------- */
  var intro = $('#intro');
  var app = $('#app');
  var heroTitle = $('#hero-title');
  var opening = false;

  function openInvitation() {
    if (opening) return;
    opening = true;
    if (!musicOff) playMusic(); // inside the tap, so the browser allows the sound
    try { sessionStorage.setItem('sws-opened', '1'); } catch (e) {}
    intro.classList.add('is-opening');
    // The doors take about 4 s to swing open (assets/app.css); the site rises in behind them.
    var t = [900, 3600, 4300];
    setTimeout(function () { html.classList.add('revealed'); }, t[0]);
    setTimeout(function () { intro.classList.add('is-closing'); }, t[1]);
    setTimeout(function () {
      intro.hidden = true;
      html.classList.add('opened');
      app.inert = false;
      app.removeAttribute('inert');
      heroTitle.focus({ preventScroll: true });
    }, t[2]);
  }

  if (html.classList.contains('opened')) {
    intro.hidden = true;
    html.classList.add('revealed');
    // Coming back without the doors: some browsers allow the sound after a tap on the previous page;
    // otherwise it starts with the guest's first tap.
    if (!musicOff) playMusic();
  } else {
    app.inert = true;
    app.setAttribute('inert', '');
    $('[data-open]', intro).addEventListener('click', openInvitation);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openInvitation(); });
  }

  /* ---------- Falling petals (hero) and the drifts in the sections below ---------- */
  // Negative delays start each one partway through its fall, so the motion is already under way.
  function rand(min, max) { return min + Math.random() * (max - min); }
  function scatter(box, count, style) {
    var frag = document.createDocumentFragment();
    for (var k = 0; k < count; k++) {
      var el = document.createElement('i');
      el.style.cssText = style();
      frag.appendChild(el);
    }
    box.appendChild(frag);
  }
  scatter($('.petals'), 16, function () {
    var dur = rand(11, 19);
    return '--x:' + rand(2, 96).toFixed(1) + '%;--s:' + rand(8, 15).toFixed(1) + ';' +
      '--t:' + dur.toFixed(1) + 's;--d:' + (-rand(0, dur)).toFixed(1) + 's;--dx:' + rand(-7, 7).toFixed(1) + 'vw';
  });
  // Petals drift down the ivory sections; diya sparks rise through the maroon ones.
  $$('.drift').forEach(function (box) {
    var sparks = box.classList.contains('drift-sparks');
    scatter(box, parseInt(box.getAttribute('data-count'), 10) || 8, function () {
      var dur = sparks ? rand(5, 9) : rand(9, 15);
      return '--x:' + rand(2, 96).toFixed(1) + '%;' +
        '--y:' + (sparks ? rand(25, 100) : rand(-6, 80)).toFixed(1) + '%;' +
        '--s:' + (sparks ? rand(7, 13) : rand(8, 13)).toFixed(1) + ';' +
        '--t:' + dur.toFixed(1) + 's;--d:' + (-rand(0, dur)).toFixed(1) + 's;--dx:' + rand(-6, 6).toFixed(1) + 'vw';
    });
  });

  /* ---------- Countdown to the Muhurtham (8:00 AM IST = 02:30 UTC, 1 Nov 2026) ---------- */
  var MUHURTHAM_START = Date.UTC(2026, 10, 1, 2, 30);
  var MUHURTHAM_END = Date.UTC(2026, 10, 1, 3, 30);
  var countdown = $('#countdown');
  var doneEl = $('.countdown-done', countdown);
  var unitEls = {};
  $$('[data-unit]', countdown).forEach(function (el) { unitEls[el.getAttribute('data-unit')] = el; });

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function setText(el, text) { if (el.textContent !== text) el.textContent = text; }
  // Each new number drops into its tile (not on the first fill).
  var ticked = false;
  function setUnit(el, text) {
    if (el.textContent === text) return;
    el.textContent = text;
    if (ticked && el.animate) {
      el.animate(
        [{ transform: 'translateY(-35%)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 420, easing: 'cubic-bezier(.2, .7, .2, 1)' }
      );
    }
  }
  function tick() {
    var now = Date.now();
    var diff = MUHURTHAM_START - now;
    if (diff <= 0) {
      countdown.classList.add('is-over');
      doneEl.hidden = false;
      setText(doneEl, now < MUHURTHAM_END ? 'The Muhurtham is happening now' : 'Thank you for your blessings');
      return;
    }
    var s = Math.floor(diff / 1000);
    setUnit(unitEls.d, String(Math.floor(s / 86400)));
    setUnit(unitEls.h, pad(Math.floor((s % 86400) / 3600)));
    setUnit(unitEls.m, pad(Math.floor((s % 3600) / 60)));
    setUnit(unitEls.s, pad(s % 60));
    ticked = true;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Event status chips (calendar days counted in IST) ---------- */
  // A chip appears from the day before its ceremony; until then it stays empty (.chip:empty hides it).
  var IST_OFFSET = 330 * 60000;
  var DAY = 86400000;
  function istDay(ms) { return Math.floor((ms + IST_OFFSET) / DAY); }
  function untilText(ms) {
    var mins = Math.max(1, Math.round(ms / 60000));
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h ? h + 'h ' + m + 'm' : m + 'm';
  }
  var statusCards = $$('[data-start]');
  function updateStatus() {
    var now = Date.now();
    statusCards.forEach(function (card) {
      var chip = $('[data-status]', card);
      var start = Date.parse(card.getAttribute('data-start'));
      var endAttr = card.getAttribute('data-end');
      var end = endAttr ? Date.parse(endAttr) : 0;
      var text = '', cls = '';
      if (now < start) {
        var days = istDay(start) - istDay(now);
        if (days === 0) { text = 'Today \u00B7 in ' + untilText(start - now); cls = 'is-soon'; }
        else if (days === 1) { text = 'Tomorrow'; cls = 'is-soon'; }
      } else if (end && now < end) {
        text = 'Happening now'; cls = 'is-live';
      } else if (!end && istDay(now) === istDay(start)) {
        text = 'Today'; cls = 'is-soon';
      } else {
        text = 'Completed'; cls = 'is-done';
      }
      setText(chip, text);
      chip.className = 'chip' + (cls ? ' ' + cls : '');
    });
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ---------- Add-to-calendar menus ---------- */
  var menus = $$('details.cal');
  menus.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) menus.forEach(function (o) { if (o !== d) o.open = false; });
      var card = d.closest('.event, .muhurtham');
      if (card) card.classList.toggle('has-menu', d.open);
    });
    $$('.cal-menu a', d).forEach(function (a) {
      a.addEventListener('click', function () { setTimeout(function () { d.open = false; }, 0); });
    });
  });
  document.addEventListener('click', function (e) {
    menus.forEach(function (d) { if (d.open && !d.contains(e.target)) d.open = false; });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    menus.forEach(function (d) {
      if (!d.open) return;
      d.open = false;
      $('summary', d).focus();
    });
  });

  /* ---------- Copy, share and WhatsApp ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) {}
      ta.remove();
      if (ok) resolve(); else reject(new Error('copy failed'));
    });
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy') || pageUrl;
      copyText(text).then(
        function () { toast(btn.getAttribute('data-toast') || 'Copied'); },
        function () { toast('Could not copy. Please copy it manually.'); }
      );
    });
  });

  var shareBtn = $('[data-share]');
  if (navigator.share) {
    shareBtn.hidden = false;
    shareBtn.addEventListener('click', function () {
      navigator.share({ title: document.title, text: shareText, url: pageUrl }).catch(function () {});
    });
  }
  var whatsapp = $('[data-whatsapp]');
  whatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(shareText + '\n' + pageUrl);

  /* ---------- Card language ---------- */
  // The card comes in Kannada + English (the links in the markup) and in English (each link or image's
  // data-href-en / data-src-en / data-alt-en). The picker in Share swaps them.
  var langSwaps = $$('[data-href-en], [data-src-en], [data-alt-en]').map(function (el) {
    var attrs = ['href', 'src', 'alt'].filter(function (a) { return el.hasAttribute('data-' + a + '-en'); });
    return { el: el, attrs: attrs, kn: attrs.map(function (a) { return el.getAttribute(a); }) };
  });
  var langInputs = $$('input[name="card-lang"]');
  function syncCardLang() {
    var picked = langInputs.filter(function (input) { return input.checked; })[0];
    var en = !!picked && picked.value === 'en';
    langSwaps.forEach(function (s) {
      s.attrs.forEach(function (a, i) {
        var value = en ? s.el.getAttribute('data-' + a + '-en') : s.kn[i];
        if (s.el.getAttribute(a) !== value) s.el.setAttribute(a, value);
      });
    });
  }
  langInputs.forEach(function (input) { input.addEventListener('change', syncCardLang); });
  syncCardLang();
  // The browser may bring back the guest's choice on Back or a reload.
  window.addEventListener('pageshow', syncCardLang);

  /* ---------- Dock scrollspy ---------- */
  var navLinks = $$('.dock-nav a');
  function setActive(id) {
    navLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  navLinks.forEach(function (a) {
    a.addEventListener('click', function () { setActive(a.getAttribute('href').slice(1)); });
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) spy.observe(section);
    });
  }

  /* ---------- Scroll reveals ---------- */
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { revealer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
