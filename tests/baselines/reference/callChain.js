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

// GH#33744
declare const o5: <T>() => undefined | (() => void);
o5<number>()?.();

// GH#36031
o2?.b()!.toString;
o2?.b()!.toString!;

//// [callChain.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
o1 === null || o1 === void 0 ? void 0 : o1();
o1 === null || o1 === void 0 ? void 0 : o1(1);
o1 === null || o1 === void 0 ? void 0 : o1.apply(void 0, [1, 2]);
o1 === null || o1 === void 0 ? void 0 : o1.apply(void 0, __spreadArray(__spreadArray([1], [2, 3], false), [4], false));
o2 === null || o2 === void 0 ? void 0 : o2.b();
o2 === null || o2 === void 0 ? void 0 : o2.b(1);
o2 === null || o2 === void 0 ? void 0 : o2.b.apply(o2, [1, 2]);
o2 === null || o2 === void 0 ? void 0 : o2.b.apply(o2, __spreadArray(__spreadArray([1], [2, 3], false), [4], false));
o2 === null || o2 === void 0 ? void 0 : o2["b"]();
o2 === null || o2 === void 0 ? void 0 : o2["b"](1);
o2 === null || o2 === void 0 ? void 0 : o2["b"].apply(o2, [1, 2]);
o2 === null || o2 === void 0 ? void 0 : o2["b"].apply(o2, __spreadArray(__spreadArray([1], [2, 3], false), [4], false));
(_a = o3.b) === null || _a === void 0 ? void 0 : _a.call(o3).c;
(_b = o3.b) === null || _b === void 0 ? void 0 : _b.call(o3, 1).c;
(_c = o3.b) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([o3], [1, 2], false)).c;
(_d = o3.b) === null || _d === void 0 ? void 0 : _d.call.apply(_d, __spreadArray(__spreadArray([o3, 1], [2, 3], false), [4], false)).c;
(_e = o3.b) === null || _e === void 0 ? void 0 : _e.call(o3)["c"];
(_f = o3.b) === null || _f === void 0 ? void 0 : _f.call(o3, 1)["c"];
(_g = o3.b) === null || _g === void 0 ? void 0 : _g.call.apply(_g, __spreadArray([o3], [1, 2], false))["c"];
(_h = o3.b) === null || _h === void 0 ? void 0 : _h.call.apply(_h, __spreadArray(__spreadArray([o3, 1], [2, 3], false), [4], false))["c"];
(_j = o3["b"]) === null || _j === void 0 ? void 0 : _j.call(o3).c;
(_k = o3["b"]) === null || _k === void 0 ? void 0 : _k.call(o3, 1).c;
(_l = o3["b"]) === null || _l === void 0 ? void 0 : _l.call.apply(_l, __spreadArray([o3], [1, 2], false)).c;
(_m = o3["b"]) === null || _m === void 0 ? void 0 : _m.call.apply(_m, __spreadArray(__spreadArray([o3, 1], [2, 3], false), [4], false)).c;
var v = o4 === null || o4 === void 0 ? void 0 : o4(incr);
(_o = o5()) === null || _o === void 0 ? void 0 : _o();
// GH#36031
o2 === null || o2 === void 0 ? void 0 : o2.b().toString;
o2 === null || o2 === void 0 ? void 0 : o2.b().toString;
