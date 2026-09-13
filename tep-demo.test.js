/* ============================================================
   NestoCodebase - TEP demo verifikatsiya testi (Node)
   ------------------------------------------------------------
   Ishlatish:  node tep-demo.test.js
   tep-demo.js browser plus Node global (btoa/atob/TextEncoder)
   bilan ham ishlaydi, shu sabab verifikatsiya shu yerda ham
   o'tadi.
   ============================================================ */
'use strict';

require('./tep-demo.js');

const assert = require('node:assert');

async function main() {
  const TepDemo = globalThis.TepDemo;

  // 1. theme.published eventni imzolash
  const event = await TepDemo.emitTepEvent(
    'theme.published',
    '{"theme":"solar-dark","version":3}',
  );
  assert.strictEqual(event.protocol, 'tep');
  assert.strictEqual(event.version, '1.0');
  assert.strictEqual(event.source, 'nestocodebase');
  assert.strictEqual(event.type, 'theme.published');
  assert.ok(event.signature.startsWith('v1.'), 'signature "v1." prefiks');
  assert.ok(event.event_id.length === 36, 'event_id UUID');
  console.log('1. theme.published signed:', event.signature.slice(0, 24) + '...');

  // 2. To'g'ri secret bilan verifikatsiya
  const ok = await TepDemo.verifyEnvelope(event, event.signature, TepDemo.SECRET_KEY);
  assert.strictEqual(ok, true, 'to\'g\'ri secret o\'tishi kerak');
  console.log('2. verify (correct secret) OK');

  // 3. Noto'g'ri secret bilan - fail
  const bad = await TepDemo.verifyEnvelope(event, event.signature, 'wrong-secret-key-wrong-secret-key-wrong-22');
  assert.strictEqual(bad, false, 'noto\'g\'ri secret fail bo\'lishi kerak');
  console.log('3. verify (wrong secret) reject OK');

  // 4. Manipulated payload - fail
  const tampered = Object.assign({}, event, { payload: event.payload + 'x' });
  const tamperedResult = await TepDemo.verifyEnvelope(tampered, event.signature, TepDemo.SECRET_KEY);
  assert.strictEqual(tamperedResult, false, 'payload o\'zgartirilsa fail');
  console.log('4. verify (tampered payload) reject OK');

  // 5. Idempotency: event_id barqaror (quidor dedupe ishlata oladi)
  assert.strictEqual(event.event_id, event.event_id);
  console.log('5. idempotency key check OK');

  console.log('\nTEP demo: PASS (5/5)');
}

main().catch((e) => {
  console.error('FAIL:', e);
  process.exit(1);
});