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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
var n1 = (_c = (_a = a) === null || _a === void 0 ? void 0 : (_b = _a).m) === null || _c === void 0 ? void 0 : _c.call(_b, { x: 12 }); // should be an error (`undefined` is not assignable to `number`)
var n2 = (_f = (_d = a) === null || _d === void 0 ? void 0 : (_e = _d).m) === null || _f === void 0 ? void 0 : _f.call(_e, { x: absorb() }); // likewise
var n3 = (_j = (_g = a) === null || _g === void 0 ? void 0 : (_h = _g).m) === null || _j === void 0 ? void 0 : _j.call(_h, { x: 12 }); // should be ok
var n4 = (_m = (_k = a) === null || _k === void 0 ? void 0 : (_l = _k).m) === null || _m === void 0 ? void 0 : _m.call(_l, { x: absorb() }); // likewise
// Also a test showing `!` vs `?` for good measure
var t1 = (_q = (_o = a) === null || _o === void 0 ? void 0 : (_p = _o).m) === null || _q === void 0 ? void 0 : _q.call(_p, { x: 12 });
t1 = a.m({ x: 12 });
