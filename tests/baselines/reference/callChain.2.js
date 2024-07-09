//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChain.2.ts] ////

//// [callChain.2.ts]
declare const o1: undefined | (() => number);
o1?.();

declare const o2: undefined | { b: () => number };
o2?.b();

declare const o3: { b: (() => { c: string }) | undefined };
o3.b?.().c;


//// [callChain.2.js]
var _a;
o1 === null || o1 === void 0 ? void 0 : o1();
o2 === null || o2 === void 0 ? void 0 : o2.b();
(_a = o3.b) === null || _a === void 0 ? void 0 : _a.call(o3).c;
