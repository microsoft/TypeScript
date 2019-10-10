//// [elementAccessChain.3.ts]
declare const obj: any;

obj?.["a"]++;
obj?.a["b"]++;
obj?.["a"]--;
obj?.a["b"]--;

++obj?.["a"];
++obj?.a["b"];
--obj?.["a"];
--obj?.a["b"];

obj?.["a"] = 1;
obj?.a["b"] = 1;
obj?.["a"] += 1;
obj?.a["b"] += 1;

for (obj?.["a"] in {});
for (obj?.a["b"] in {});
for (obj?.["a"] of []);
for (obj?.a["b"] of []);

({ a: obj?.["a"] } = { a: 1 });
({ a: obj?.a["b"] } = { a: 1 });
({ ...obj?.["a"] } = { a: 1 });
({ ...obj?.a["b"] } = { a: 1 });
[...obj?.["a"]] = [];
[...obj?.a["b"]] = [];


//// [elementAccessChain.3.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
((_a = obj) === null || _a === void 0 ? void 0 : _a["a"])++;
((_b = obj) === null || _b === void 0 ? void 0 : _b.a["b"])++;
((_c = obj) === null || _c === void 0 ? void 0 : _c["a"])--;
((_d = obj) === null || _d === void 0 ? void 0 : _d.a["b"])--;
++((_e = obj) === null || _e === void 0 ? void 0 : _e["a"]);
++((_f = obj) === null || _f === void 0 ? void 0 : _f.a["b"]);
--((_g = obj) === null || _g === void 0 ? void 0 : _g["a"]);
--((_h = obj) === null || _h === void 0 ? void 0 : _h.a["b"]);
(_j = obj) === null || _j === void 0 ? void 0 : _j["a"] = 1;
(_k = obj) === null || _k === void 0 ? void 0 : _k.a["b"] = 1;
(_l = obj) === null || _l === void 0 ? void 0 : _l["a"] += 1;
(_m = obj) === null || _m === void 0 ? void 0 : _m.a["b"] += 1;
for ((_o = obj) === null || _o === void 0 ? void 0 : _o["a"] in {})
    ;
for ((_p = obj) === null || _p === void 0 ? void 0 : _p.a["b"] in {})
    ;
for (var _i = 0, _y = []; _i < _y.length; _i++) {
    (_q = obj) === null || _q === void 0 ? void 0 : _q["a"] = _y[_i];
    ;
}
for (var _z = 0, _0 = []; _z < _0.length; _z++) {
    (_r = obj) === null || _r === void 0 ? void 0 : _r.a["b"] = _0[_z];
    ;
}
((_s = obj) === null || _s === void 0 ? void 0 : _s["a"] = { a: 1 }.a);
((_t = obj) === null || _t === void 0 ? void 0 : _t.a["b"] = { a: 1 }.a);
((_u = obj) === null || _u === void 0 ? void 0 : _u["a"] = __rest({ a: 1 }, []));
((_v = obj) === null || _v === void 0 ? void 0 : _v.a["b"] = __rest({ a: 1 }, []));
(_w = obj) === null || _w === void 0 ? void 0 : _w["a"] = [].slice(0);
(_x = obj) === null || _x === void 0 ? void 0 : _x.a["b"] = [].slice(0);
