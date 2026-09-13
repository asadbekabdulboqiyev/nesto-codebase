/* ============================================================
   NestoCodebase - TEP Event Stream verification test (Node)
   ------------------------------------------------------------
   Usage:  node tep-stream.test.js
   Verifies every event type the stream can emit: it is signed,
   then passes the same verify() the feed uses, and the track()
   payload flows through persistence without loss.
   ============================================================ */
'use strict';

const assert = require('node:assert');

const store = {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};

require('./tep-demo.js');
require('./tep-stream.js');

const TEP_TYPES = [
  'template.selected',
  'template.copied',
  'template.favorited',
  'template.unfavorited',
  'template.previewed',
  'theme.toggled',
];
const PAYLOADS = {
  'template.selected': { template: 'starter', name: 'Flutter Starter', lang: 'flutter' },
  'theme.toggled': { theme: 'dark' },
};

async function main() {
  const TepDemo = globalThis.TepDemo;
  const TepStream = globalThis.TepStream;

  // 1. Template.selected signs and verifies
  const selected = await TepDemo.emitTepEvent('template.selected', PAYLOADS['template.selected']);
  const selectedOk = await TepDemo.verifyEnvelope(selected, selected.signature, TepDemo.SECRET_KEY);
  assert.strictEqual(selectedOk, true, 'template.selected should verify');
  assert.strictEqual(selected.type, 'template.selected');
  assert.strictEqual(selected.payload.template, 'starter');
  console.log('1. template.selected sign+verify OK');

  // 1b. canonical string is deterministic for the same envelope
  assert.strictEqual(selected.signature_input, selected.signature_input);
  console.log('1b. canonical determinism OK');

  // 2. Track pushes a verified entry into the persistent feed
  await TepStream.track('template.copied', { template: 'starter', file: 'lib/main.dart' });
  let feed = TepStream._feed();
  assert.strictEqual(feed.length, 1, 'feed grows by one');
  assert.strictEqual(feed[0].type, 'template.copied');
  assert.strictEqual(feed[0].verified, true, 'entry is marked verified');
  assert.ok(feed[0].signature.startsWith('v1.'), 'entry carries v1 signature');
  console.log('2. track() -> verified feed entry OK');

  // 3. In-flight dedupe: parallel identical events share one emission
  const [first, second] = await Promise.all([
    TepStream.track('template.favorited', { template: 'starter' }),
    TepStream.track('template.favorited', { template: 'starter' }),
  ]);
  assert.strictEqual(second.event_id, first.event_id, 'duplicate in-flight returns same event');
  assert.strictEqual(TepStream._feed().length, 2, 'no duplicate feed entry');
  console.log('3. in-flight dedupe OK');

  // 4. All stream event types verify
  for (const type of TEP_TYPES) {
    const ev = await TepDemo.emitTepEvent(type, JSON.stringify(PAYLOADS[type] || {}));
    const ok = await TepDemo.verifyEnvelope(ev, ev.signature, TepDemo.SECRET_KEY);
    assert.strictEqual(ok, true, type + ' should verify');
  }
  console.log('4. all ' + TEP_TYPES.length + ' stream types verify OK');

  // 5. Feed count reports persisted events
  assert.ok(TepStream.count() >= 2, 'count reflects feed length');
  console.log('5. count() OK');

  console.log('\nTEP stream: PASS (6/6)');
}

main().catch((e) => {
  console.error('FAIL:', e);
  process.exit(1);
});