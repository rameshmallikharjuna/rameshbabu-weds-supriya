/* Srinidhi & Shilpa: wedding invitation app behaviour. No dependencies. */
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

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var pageUrl = new URL('./', location.href).href;
  var shareText = "You're invited to the wedding of Srinidhi & Shilpa. Muhurtham: Monday, 16th November 2026, 9:00 AM \u2013 10:00 AM at Aarpee Ashraya Kalyana Mantapa, Bengaluru.";

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

  /* ---------- Music (only if audio/seetha-kalyana-vaibhogame.mp3 exists) ---------- */
  var audio = $('#bgm');
  var musicBtn = $('#music');
  var openMusicBtn = $('[data-open-music]');
  var audioReady = false;
  var fadeTimer = 0;

  function showMusic() {
    if (audioReady) return;
    audioReady = true;
    musicBtn.hidden = false;
    if (!html.classList.contains('opened')) openMusicBtn.hidden = false;
  }
  function hideMusic() {
    audioReady = false;
    musicBtn.hidden = true;
    openMusicBtn.hidden = true;
  }
  function setPlaying(on) {
    musicBtn.classList.toggle('is-playing', on);
    musicBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    musicBtn.title = (on ? 'Pause' : 'Play') + ' music: Seetha Kalyana Vaibhogame';
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
    setPlaying(true);
    var p = audio.play();
    fadeTo(0.8, 1500);
    if (p && p.catch) p.catch(function () { setPlaying(false); });
  }
  function pauseMusic() {
    setPlaying(false);
    fadeTo(0, 500, function () { audio.pause(); });
  }

  audio.addEventListener('loadedmetadata', showMusic);
  audio.addEventListener('error', hideMusic);
  audio.addEventListener('play', function () { setPlaying(true); });
  audio.addEventListener('pause', function () { setPlaying(false); });
  if (audio.readyState > 0) showMusic();
  // iOS never preloads media, so also ask the server whether the file exists.
  if (/^https?:$/.test(location.protocol) && window.fetch) {
    fetch(audio.currentSrc || audio.src, { method: 'HEAD', cache: 'no-store' })
      .then(function (r) { if (r.ok) showMusic(); else hideMusic(); })
      .catch(function () {});
  }
  musicBtn.addEventListener('click', function () {
    if (musicBtn.classList.contains('is-playing')) pauseMusic(); else playMusic();
  });

  /* ---------- Intro doors ---------- */
  var intro = $('#intro');
  var app = $('#app');
  var heroTitle = $('#hero-title');
  var opening = false;

  function openInvitation(withMusic) {
    if (opening) return;
    opening = true;
    if (withMusic) playMusic(); // must run inside the click for autoplay rules
    try { sessionStorage.setItem('sws-opened', '1'); } catch (e) {}
    intro.classList.add('is-opening');
    var t = reduceMotion ? [0, 0, 450] : [300, 1250, 1900];
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
  } else {
    app.inert = true;
    app.setAttribute('inert', '');
    $('[data-open]', intro).addEventListener('click', function () { openInvitation(false); });
    openMusicBtn.addEventListener('click', function () { openInvitation(true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openInvitation(false); });
  }

  /* ---------- Falling petals ---------- */
  if (!reduceMotion) {
    var petals = $('.petals');
    var frag = document.createDocumentFragment();
    for (var k = 0; k < 16; k++) {
      var p = document.createElement('i');
      var dur = 11 + Math.random() * 8;
      p.style.cssText =
        '--x:' + (2 + Math.random() * 94).toFixed(1) + '%;' +
        '--s:' + (8 + Math.random() * 7).toFixed(1) + ';' +
        '--t:' + dur.toFixed(1) + 's;' +
        '--d:' + (-Math.random() * dur).toFixed(1) + 's;' +
        '--dx:' + ((Math.random() * 2 - 1) * 7).toFixed(1) + 'vw';
      frag.appendChild(p);
    }
    petals.appendChild(frag);
  }

  /* ---------- Countdown to the Muhurtham (9:00 AM IST = 03:30 UTC) ---------- */
  var MUHURTHAM_START = Date.UTC(2026, 10, 16, 3, 30);
  var MUHURTHAM_END = Date.UTC(2026, 10, 16, 4, 30);
  var countdown = $('#countdown');
  var doneEl = $('.countdown-done', countdown);
  var unitEls = {};
  $$('[data-unit]', countdown).forEach(function (el) { unitEls[el.getAttribute('data-unit')] = el; });

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function setText(el, text) { if (el.textContent !== text) el.textContent = text; }
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
    setText(unitEls.d, String(Math.floor(s / 86400)));
    setText(unitEls.h, pad(Math.floor((s % 86400) / 3600)));
    setText(unitEls.m, pad(Math.floor((s % 3600) / 60)));
    setText(unitEls.s, pad(s % 60));
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Event status chips (calendar days counted in IST) ---------- */
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
      var text, cls = '';
      if (now < start) {
        var days = istDay(start) - istDay(now);
        if (days === 0) { text = 'Today \u00B7 in ' + untilText(start - now); cls = 'is-soon'; }
        else if (days === 1) { text = 'Tomorrow'; cls = 'is-soon'; }
        else text = 'In ' + days + ' days';
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
  if (!reduceMotion && 'IntersectionObserver' in window) {
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
