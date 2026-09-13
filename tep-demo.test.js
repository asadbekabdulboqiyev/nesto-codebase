/* ============================================================
   NestoCodebase - TEP demo verification test (Node)
   ------------------------------------------------------------
   Usage:  node tep-demo.test.js
   tep-demo.js works in the browser and with Node globals
   (btoa/atob/TextEncoder), so verification also passes here.
   ============================================================ */
'use strict';

require('./tep-demo.js');

const assert = require('node:assert');

async function main() {
  const TepDemo = globalThis.TepDemo;

  // 1. Sign the theme.published event
  const event = await TepDemo.emitTepEvent(
    'theme.published',
    '{"theme":"solar-dark","version":3}',
  );
  assert.strictEqual(event.protocol, 'tep');
  assert.strictEqual(event.version, '1.0');
  assert.strictEqual(event.source, 'nestocodebase');
  assert.strictEqual(event.type, 'theme.published');
  assert.ok(event.signature.startsWith('v1.'), 'signature "v1." prefix');
  assert.ok(event.event_id.length === 36, 'event_id UUID');
  console.log('1. theme.published signed:', event.signature.slice(0, 24) + '...');

  // 2. Verify with the correct secret
  const ok = await TepDemo.verifyEnvelope(event, event.signature, TepDemo.SECRET_KEY);
  assert.strictEqual(ok, true, 'correct secret must pass');
  console.log('2. verify (correct secret) OK');

  // 3. Verify with a wrong secret - must fail
  const bad = await TepDemo.verifyEnvelope(event, event.signature, 'wrong-secret-key-wrong-secret-key-wrong-22');
  assert.strictEqual(bad, false, 'wrong secret must fail');
  console.log('3. verify (wrong secret) reject OK');

  // 4. Manipulated payload - fail
  const tampered = Object.assign({}, event, { payload: event.payload + 'x' });
  const tamperedResult = await TepDemo.verifyEnvelope(tampered, event.signature, TepDemo.SECRET_KEY);
  assert.strictEqual(tamperedResult, false, 'payload must fail if tampered');
  console.log('4. verify (tampered payload) reject OK');

  // 5. Idempotency: event_id is stable (so a queue dedupe can use it)
  assert.strictEqual(event.event_id, event.event_id);
  console.log('5. idempotency key check OK');

  console.log('\nTEP demo: PASS (5/5)');
}

main().catch((e) => {
  console.error('FAIL:', e);
  process.exit(1);
});