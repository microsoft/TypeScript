//// [elementAccessChain.2.ts]
declare const o1: undefined | { b: string };
o1?.["b"];

declare const o2: undefined | { b: { c: string } };
o2?.["b"].c;
o2?.b["c"];

declare const o3: { b: undefined | { c: string } };
o3["b"]?.c;
o3.b?.["c"];


//// [elementAccessChain.2.js]
var _a, _b;
o1 !== null && o1 !== void 0 ? o1["b"] : void 0;
o2 !== null && o2 !== void 0 ? o2["b"].c : void 0;
o2 !== null && o2 !== void 0 ? o2.b["c"] : void 0;
(_a = o3["b"]) !== null && _a !== void 0 ? _a.c : void 0;
(_b = o3.b) !== null && _b !== void 0 ? _b["c"] : void 0;
