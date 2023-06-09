//// [tests/cases/compiler/dissallowSymbolAsWeakType.ts] ////

//// [dissallowSymbolAsWeakType.ts]
const s: symbol = Symbol('s');

const ws = new WeakSet([s]);
ws.add(s);
ws.has(s);
ws.delete(s);

const wm = new WeakMap([[s, false]]);
wm.set(s, true);
wm.has(s);
wm.get(s);
wm.delete(s);

const wr = new WeakRef(s);
wr.deref();

const f = new FinalizationRegistry(() => {});
f.register(s, null);
f.unregister(s);


//// [dissallowSymbolAsWeakType.js]
const s = Symbol('s');
const ws = new WeakSet([s]);
ws.add(s);
ws.has(s);
ws.delete(s);
const wm = new WeakMap([[s, false]]);
wm.set(s, true);
wm.has(s);
wm.get(s);
wm.delete(s);
const wr = new WeakRef(s);
wr.deref();
const f = new FinalizationRegistry(() => { });
f.register(s, null);
f.unregister(s);
