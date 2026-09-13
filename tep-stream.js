/* ============================================================
   NestoCodebase - Live TEP Event Stream
   ------------------------------------------------------------
   A signed, idempotent activity feed. Every meaningful user
   action emits a TEP event (see tep-demo.js), which is verified
   locally before it lands in the feed. The feed persists the
   last EVENT_LIMIT events in localStorage.

   Events flow: user action -> TepDemo.emitTepEvent -> verify ->
   prepend to feed -> persist -> render.
   ============================================================ */
(function (global) {
  'use strict';

  var KEY = 'tep_stream_v1';
  var EVENT_LIMIT = 50;

  /* ---------------- storage ---------------- */
  function loadFeed() {
    try { return JSON.parse(global.localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function saveFeed(feed) {
    try { global.localStorage.setItem(KEY, JSON.stringify(feed)); }
    catch (e) { /* storage full or blocked: keep session memory only */ }
  }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  function render() {
    var body = global.document && global.document.getElementById('tepStreamBody');
    if (!body) return;
    body.innerHTML = feed.map(function (ev) {
      var time = new Date(ev.timestamp);
      var stamp = pad2(time.getHours()) + ':' + pad2(time.getMinutes());
      var badge = ev.verified
        ? '<span class="tep-badge ok" title="' + escapeAttr(ev.signature) + '">VERIFIED</span>'
        : '<span class="tep-badge bad">SIG ERROR</span>';
      return '<div class="tep-item">' +
        '<span class="tep-ico">' + iconFor(ev.type) + '</span>' +
        '<div class="tep-meta"><div class="tep-type">' + escapeAttr(ev.type) + badge + '</div>' +
        '<div class="tep-detail">' + escapeAttr(detailFor(ev.payload)) + '</div></div>' +
        '<span class="tep-time">' + stamp + '</span></div>';
    }).join('');
    var count = global.document.getElementById('tepCount');
    if (count) count.textContent = feed.length;
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function iconFor(type) {
    var map = {
      'template.selected': '▤',
      'template.copied': '❏',
      'template.favorited': '♥',
      'template.previewed': '▶',
      'template.unfavorited': '♡',
      'theme.toggled': '◐',
    };
    return map[type] || '⚡';
  }

  function detailFor(payload) {
    if (!payload) return '';
    return (payload.template || payload.actor || payload.theme || JSON.stringify(payload)).toString();
  }

  /* ---------------- core ---------------- */
  var feed = loadFeed();
  var inFlight = {};

  function track(type, payload) {
    var demo = global.TepDemo;
    if (!demo) return Promise.resolve(null);
    var key = type + ':' + (payload && payload.template ? payload.template : '');
    if (inFlight[key]) return inFlight[key];
    inFlight[key] = demo.emitTepEvent(type, payload || {}).then(function (ev) {
      return demo.verifyEnvelope(ev, ev.signature, demo.SECRET_KEY).then(function (ok) {
        var entry = {
          protocol: ev.protocol,
          version: ev.version,
          event_id: ev.event_id,
          timestamp: ev.timestamp,
          source: ev.source,
          type: ev.type,
          payload: ev.payload,
          signature: ev.signature,
          verified: ok,
        };
        feed.unshift(entry);
        if (feed.length > EVENT_LIMIT) feed = feed.slice(0, EVENT_LIMIT);
        saveFeed(feed);
        render();
        return entry;
      });
    }).finally(function () { delete inFlight[key]; });
    return inFlight[key];
  }

  function toggleVisibility() {
    var panel = global.document.getElementById('tepStream');
    var open = panel.classList.toggle('open');
    try { global.localStorage.setItem('tep_stream_open', open ? '1' : '0'); } catch (e) {}
  }

  function count() { return feed.length; }

  /* ---------------- boot ---------------- */
  function init() {
    render();
    var head = global.document && global.document.getElementById('tepStreamHead');
    if (head) head.addEventListener('click', toggleVisibility);
    try {
      if (global.localStorage.getItem('tep_stream_open') === '1') {
        var panel = global.document.getElementById('tepStream');
        if (panel) panel.classList.add('open');
      }
    } catch (e) {}
    if (global.document) {
      global.document.addEventListener('tepThemeToggle', function (e) {
        track('theme.toggled', { theme: e.detail && e.detail.theme });
      });
    }
  }

  if (typeof document === 'undefined') {
    init = function () {};
  }

  /* ---------------- exports ---------------- */
  global.TepStream = {
    track: track,
    render: render,
    count: count,
    _feed: function () { return feed.slice(); },
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));