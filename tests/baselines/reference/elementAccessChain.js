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


//// [elementAccessChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
(_a = o1) === null || _a === void 0 ? void 0 : _a["b"];
(_b = o2) === null || _b === void 0 ? void 0 : _b["b"].c;
(_c = o2) === null || _c === void 0 ? void 0 : _c.b["c"];
(_d = o3["b"]) === null || _d === void 0 ? void 0 : _d.c;
(_e = o3.b) === null || _e === void 0 ? void 0 : _e["c"];
(_g = (_f = o4.b) === null || _f === void 0 ? void 0 : _f["c"].d) === null || _g === void 0 ? void 0 : _g.e;
(_j = (_h = o4.b) === null || _h === void 0 ? void 0 : _h["c"].d) === null || _j === void 0 ? void 0 : _j["e"];
(_m = (_l = (_k = o5).b) === null || _l === void 0 ? void 0 : _l.call(_k)["c"].d) === null || _m === void 0 ? void 0 : _m.e;
(_q = (_p = (_o = o5).b) === null || _p === void 0 ? void 0 : _p.call(_o)["c"].d) === null || _q === void 0 ? void 0 : _q["e"];
(_t = (_s = (_r = o5)["b"]) === null || _s === void 0 ? void 0 : _s.call(_r)["c"].d) === null || _t === void 0 ? void 0 : _t.e;
(_w = (_v = (_u = o5)["b"]) === null || _v === void 0 ? void 0 : _v.call(_u)["c"].d) === null || _w === void 0 ? void 0 : _w["e"];
