//// [callChain.2.ts]
declare const o1: undefined | (() => number);
o1?.();

declare const o2: undefined | { b: () => number };
o2?.b();

declare const o3: { b: (() => { c: string }) | undefined };
o3.b?.().c;


//// [callChain.2.js]
var _a, _b, _c, _d;
(_a = o1) === null || _a === void 0 ? void 0 : _a();
(_b = o2) === null || _b === void 0 ? void 0 : _b.b();
(_d = (_c = o3).b) === null || _d === void 0 ? void 0 : _d.call(_c).c;
