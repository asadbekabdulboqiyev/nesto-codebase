/* ============================================================
   NestoCodebase - TEP (Teno Event Protocol) minimal demo
   ------------------------------------------------------------
   Self-contained signing client. No dependencies required:
   works with WebCrypto (browser) or Node crypto.

   Signature: HMAC-SHA256 -> base64url, with a "v1." prefix (spec/TEP.md).
   Canonical:  tep\n1.0\n<event_id>\n<timestamp>\n<source>\n<type>\n<payload>
   ============================================================ */
(function (global) {
  'use strict';

  var VERSION = '1.0';
  var SIG_PREFIX = 'v1.';
  var SOURCE = 'nestocodebase';
  var SECRET_KEY = 'nesto-tep-demo-key-...-32+bytes';

  /* ---------------- base64url ---------------- */
  function toBase64Url(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function b64UrlToBytes(b64) {
    var clean = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (clean.length % 4) clean += '=';
    var bin = atob(clean);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function utf8Bytes(str) {
    return new TextEncoder().encode(str);
  }

  /* ---------------- HMAC-SHA256 ---------------- */
  function hmacRaw(keyBytes, dataBytes) {
    return crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
      .then(function (key) {
        return crypto.subtle.sign('HMAC', key, dataBytes);
      })
      .then(function (sig) { return new Uint8Array(sig); });
  }

  /* ---------------- canonical form ---------------- */
  function canonicalBytes(envelope) {
    var parts = [
      'tep',
      VERSION,
      envelope.event_id,
      envelope.timestamp,
      envelope.source,
      envelope.type,
      envelope.payload,
    ];
    return utf8Bytes(parts.join('\n'));
  }

  /* ---------------- envelope ---------------- */
  function buildEnvelope(type, payload) {
    return {
      event_id: uuid(),
      timestamp: new Date().toISOString(),
      source: SOURCE,
      type: type,
      payload: payload,
    };
  }

  /* ---------------- TEP demo API ---------------- */
  function emitTepEvent(type, payload, secret) {
    var env = buildEnvelope(type, payload);
    var keyBytes = utf8Bytes(secret || SECRET_KEY);
    var canonical = canonicalBytes(env);

    return hmacRaw(keyBytes, canonical).then(function (digest) {
      return {
        protocol: 'tep',
        version: VERSION,
        event_id: env.event_id,
        timestamp: env.timestamp,
        source: env.source,
        type: env.type,
        payload: env.payload,
        signature: SIG_PREFIX + toBase64Url(digest),
        signature_input: new TextDecoder().decode(canonical),
      };
    });
  }

  /* ---------------- verify (Node o'qiydi) ---------------- */
  function verifyEnvelope(env, signature, secret) {
    return hmacRaw(utf8Bytes(secret || SECRET_KEY), canonicalBytes(env)).then(function (digest) {
      if (signature.slice(0, SIG_PREFIX.length) !== SIG_PREFIX) return false;
      var provided = b64UrlToBytes(signature.slice(SIG_PREFIX.length));
      if (digest.length !== provided.length) return false;
      for (var i = 0; i < digest.length; i++) {
        if (digest[i] !== provided[i]) return false;
      }
      return true;
    });
  }

  /* ---------------- UUID v4 ---------------- */
  function uuid() {
    if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    var bytes = new Uint8Array(16);
    global.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var hex = toHex(bytes);
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
  }

  function toHex(bytes) {
    var out = '';
    for (var i = 0; i < bytes.length; i++) out += ('0' + bytes[i].toString(16)).slice(-2);
    return out;
  }

  /* ---------------- exports ---------------- */
  global.TepDemo = {
    SOURCE: SOURCE,
    SECRET_KEY: SECRET_KEY,
    emitTepEvent: emitTepEvent,
    verifyEnvelope: verifyEnvelope,
    buildEnvelope: buildEnvelope,
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));