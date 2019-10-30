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
var _a, _b, _c, _d, _e;
(_a = o1) === null || _a === void 0 ? void 0 : _a["b"];
(_b = o2) === null || _b === void 0 ? void 0 : _b["b"].c;
(_c = o2) === null || _c === void 0 ? void 0 : _c.b["c"];
(_d = o3["b"]) === null || _d === void 0 ? void 0 : _d.c;
(_e = o3.b) === null || _e === void 0 ? void 0 : _e["c"];
