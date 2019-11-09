//// [callChain.3.ts]
declare function absorb<T>(): T;
declare const a: { m?<T>(obj: {x: T}): T } | undefined;
const n1: number = a?.m?.({x: 12 }); // should be an error (`undefined` is not assignable to `number`)
const n2: number = a?.m?.({x: absorb()}); // likewise
const n3: number | undefined = a?.m?.({x: 12}); // should be ok
const n4: number | undefined = a?.m?.({x: absorb()}); // likewise

// Also a test showing `!` vs `?` for good measure
let t1 = a?.m?.({x: 12});
t1 = a!.m!({x: 12});

//// [callChain.3.js]
"use strict";
var _a, _b, _c, _d, _e;
var n1 = (_a = a === null || a === void 0 ? void 0 : a.m) === null || _a === void 0 ? void 0 : _a.call(a, { x: 12 }); // should be an error (`undefined` is not assignable to `number`)
var n2 = (_b = a === null || a === void 0 ? void 0 : a.m) === null || _b === void 0 ? void 0 : _b.call(a, { x: absorb() }); // likewise
var n3 = (_c = a === null || a === void 0 ? void 0 : a.m) === null || _c === void 0 ? void 0 : _c.call(a, { x: 12 }); // should be ok
var n4 = (_d = a === null || a === void 0 ? void 0 : a.m) === null || _d === void 0 ? void 0 : _d.call(a, { x: absorb() }); // likewise
// Also a test showing `!` vs `?` for good measure
var t1 = (_e = a === null || a === void 0 ? void 0 : a.m) === null || _e === void 0 ? void 0 : _e.call(a, { x: 12 });
t1 = a.m({ x: 12 });
