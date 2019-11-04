//// [propertyAccessChain.2.ts]
declare const o1: undefined | { b: string };
o1?.b;

declare const o2: undefined | { b: { c: string } };
o2?.b.c;

declare const o3: { b: undefined | { c: string } };
o3.b?.c;


//// [propertyAccessChain.2.js]
var _a, _b, _c;
(_a = o1) === null || _a === void 0 ? void 0 : _a.b;
(_b = o2) === null || _b === void 0 ? void 0 : _b.b.c;
(_c = o3.b) === null || _c === void 0 ? void 0 : _c.c;
