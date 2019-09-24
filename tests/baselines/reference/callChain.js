//// [callChain.ts]
declare const o1: undefined | ((...args: any[]) => number);
o1?.();
o1?.(1);
o1?.(...[1, 2]);
o1?.(1, ...[2, 3], 4);

declare const o2: undefined | { b: (...args: any[]) => number };
o2?.b();
o2?.b(1);
o2?.b(...[1, 2]);
o2?.b(1, ...[2, 3], 4);
o2?.["b"]();
o2?.["b"](1);
o2?.["b"](...[1, 2]);
o2?.["b"](1, ...[2, 3], 4);

declare const o3: { b: ((...args: any[]) => { c: string }) | undefined };
o3.b?.().c;
o3.b?.(1).c;
o3.b?.(...[1, 2]).c;
o3.b?.(1, ...[2, 3], 4).c;
o3.b?.()["c"];
o3.b?.(1)["c"];
o3.b?.(...[1, 2])["c"];
o3.b?.(1, ...[2, 3], 4)["c"];
o3["b"]?.().c;
o3["b"]?.(1).c;
o3["b"]?.(...[1, 2]).c;
o3["b"]?.(1, ...[2, 3], 4).c;

declare const o4: undefined | (<T>(f: (a: T) => T) => T);
declare function incr(x: number): number;
const v: number | undefined = o4?.(incr);

//// [callChain.js]
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
(_a = o1) === null || _a === void 0 ? void 0 : _a();
(_b = o1) === null || _b === void 0 ? void 0 : _b(1);
(_c = o1) === null || _c === void 0 ? void 0 : _c.apply(void 0, [1, 2]);
(_d = o1) === null || _d === void 0 ? void 0 : _d.apply(void 0, __spreadArrays([1], [2, 3], [4]));
(_e = o2) === null || _e === void 0 ? void 0 : _e.b();
(_f = o2) === null || _f === void 0 ? void 0 : _f.b(1);
(_g = o2) === null || _g === void 0 ? void 0 : _g.b.apply(_g, [1, 2]);
(_h = o2) === null || _h === void 0 ? void 0 : _h.b.apply(_h, __spreadArrays([1], [2, 3], [4]));
(_j = o2) === null || _j === void 0 ? void 0 : _j["b"]();
(_k = o2) === null || _k === void 0 ? void 0 : _k["b"](1);
(_l = o2) === null || _l === void 0 ? void 0 : _l["b"].apply(_l, [1, 2]);
(_m = o2) === null || _m === void 0 ? void 0 : _m["b"].apply(_m, __spreadArrays([1], [2, 3], [4]));
(_p = (_o = o3).b) === null || _p === void 0 ? void 0 : _p.call(_o).c;
(_r = (_q = o3).b) === null || _r === void 0 ? void 0 : _r.call(_q, 1).c;
(_t = (_s = o3).b) === null || _t === void 0 ? void 0 : _t.call.apply(_t, __spreadArrays([_s], [1, 2])).c;
(_v = (_u = o3).b) === null || _v === void 0 ? void 0 : _v.call.apply(_v, __spreadArrays([_u, 1], [2, 3], [4])).c;
(_x = (_w = o3).b) === null || _x === void 0 ? void 0 : _x.call(_w)["c"];
(_z = (_y = o3).b) === null || _z === void 0 ? void 0 : _z.call(_y, 1)["c"];
(_1 = (_0 = o3).b) === null || _1 === void 0 ? void 0 : _1.call.apply(_1, __spreadArrays([_0], [1, 2]))["c"];
(_3 = (_2 = o3).b) === null || _3 === void 0 ? void 0 : _3.call.apply(_3, __spreadArrays([_2, 1], [2, 3], [4]))["c"];
(_5 = (_4 = o3)["b"]) === null || _5 === void 0 ? void 0 : _5.call(_4).c;
(_7 = (_6 = o3)["b"]) === null || _7 === void 0 ? void 0 : _7.call(_6, 1).c;
(_9 = (_8 = o3)["b"]) === null || _9 === void 0 ? void 0 : _9.call.apply(_9, __spreadArrays([_8], [1, 2])).c;
(_11 = (_10 = o3)["b"]) === null || _11 === void 0 ? void 0 : _11.call.apply(_11, __spreadArrays([_10, 1], [2, 3], [4])).c;
var v = (_12 = o4) === null || _12 === void 0 ? void 0 : _12(incr);
