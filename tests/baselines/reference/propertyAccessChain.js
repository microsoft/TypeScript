//// [propertyAccessChain.ts]
declare const o1: undefined | { b: string };
o1?.b;

declare const o2: undefined | { b: { c: string } };
o2?.b.c;

declare const o3: { b: undefined | { c: string } };
o3.b?.c;

declare const o4: { b?: { c: { d?: { e: string } } } };
o4.b?.c.d?.e;

declare const o5: { b?(): { c: { d?: { e: string } } } };
o5.b?.().c.d?.e;


//// [propertyAccessChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
(_a = o1) === null || _a === void 0 ? void 0 : _a.b;
(_b = o2) === null || _b === void 0 ? void 0 : _b.b.c;
(_c = o3.b) === null || _c === void 0 ? void 0 : _c.c;
(_e = (_d = o4.b) === null || _d === void 0 ? void 0 : _d.c.d) === null || _e === void 0 ? void 0 : _e.e;
(_h = (_g = (_f = o5).b) === null || _g === void 0 ? void 0 : _g.call(_f).c.d) === null || _h === void 0 ? void 0 : _h.e;
