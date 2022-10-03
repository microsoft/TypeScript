//// [elementAccessChain.ts]
declare const o1: undefined | { b: string };
o1?.["b"];

declare const o2: undefined | { b: { c: string } };
o2?.["b"].c;
o2?.b["c"];

declare const o3: { b: undefined | { c: string } };
o3["b"]?.c;
o3.b?.["c"];

declare const o4: { b?: { c: { d?: { e: string } } } };
o4.b?.["c"].d?.e;
o4.b?.["c"].d?.["e"];

declare const o5: { b?(): { c: { d?: { e: string } } } };
o5.b?.()["c"].d?.e;
o5.b?.()["c"].d?.["e"];
o5["b"]?.()["c"].d?.e;
o5["b"]?.()["c"].d?.["e"];

// GH#33744
declare const o6: <T>() => undefined | ({ x: number });
o6<number>()?.["x"];

// GH#36031
o2?.["b"]!.c;
o2?.["b"]!["c"];
o2?.["b"]!.c!;
o2?.["b"]!["c"]!;

//// [elementAccessChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
o1 === null || o1 === void 0 ? void 0 : o1["b"];
o2 === null || o2 === void 0 ? void 0 : o2["b"].c;
o2 === null || o2 === void 0 ? void 0 : o2.b["c"];
(_a = o3["b"]) === null || _a === void 0 ? void 0 : _a.c;
(_b = o3.b) === null || _b === void 0 ? void 0 : _b["c"];
(_d = (_c = o4.b) === null || _c === void 0 ? void 0 : _c["c"].d) === null || _d === void 0 ? void 0 : _d.e;
(_f = (_e = o4.b) === null || _e === void 0 ? void 0 : _e["c"].d) === null || _f === void 0 ? void 0 : _f["e"];
(_h = (_g = o5.b) === null || _g === void 0 ? void 0 : _g.call(o5)["c"].d) === null || _h === void 0 ? void 0 : _h.e;
(_k = (_j = o5.b) === null || _j === void 0 ? void 0 : _j.call(o5)["c"].d) === null || _k === void 0 ? void 0 : _k["e"];
(_m = (_l = o5["b"]) === null || _l === void 0 ? void 0 : _l.call(o5)["c"].d) === null || _m === void 0 ? void 0 : _m.e;
(_p = (_o = o5["b"]) === null || _o === void 0 ? void 0 : _o.call(o5)["c"].d) === null || _p === void 0 ? void 0 : _p["e"];
(_q = o6()) === null || _q === void 0 ? void 0 : _q["x"];
// GH#36031
o2 === null || o2 === void 0 ? void 0 : o2["b"].c;
o2 === null || o2 === void 0 ? void 0 : o2["b"]["c"];
o2 === null || o2 === void 0 ? void 0 : o2["b"].c;
o2 === null || o2 === void 0 ? void 0 : o2["b"]["c"];
