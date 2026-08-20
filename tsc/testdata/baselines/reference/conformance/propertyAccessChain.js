//// [tests/cases/conformance/expressions/optionalChaining/propertyAccessChain/propertyAccessChain.ts] ////

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

// GH#33744
declare const o6: <T>() => undefined | ({ x: number });
o6<number>()?.x;

// GH#34109
o1?.b ? 1 : 0;

// GH#36031
o2?.b!.c;
o2?.b!.c!;

//// [propertyAccessChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f;
o1 === null || o1 === void 0 ? void 0 : o1.b;
o2 === null || o2 === void 0 ? void 0 : o2.b.c;
(_a = o3.b) === null || _a === void 0 ? void 0 : _a.c;
(_c = (_b = o4.b) === null || _b === void 0 ? void 0 : _b.c.d) === null || _c === void 0 ? void 0 : _c.e;
(_e = (_d = o5.b) === null || _d === void 0 ? void 0 : _d.call(o5).c.d) === null || _e === void 0 ? void 0 : _e.e;
(_f = o6()) === null || _f === void 0 ? void 0 : _f.x;
// GH#34109
(o1 === null || o1 === void 0 ? void 0 : o1.b) ? 1 : 0;
// GH#36031
o2 === null || o2 === void 0 ? void 0 : o2.b.c;
o2 === null || o2 === void 0 ? void 0 : o2.b.c;
