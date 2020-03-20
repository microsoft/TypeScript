//// [genericObjectRest.ts]
const a = 'a';

function f1<T extends { a: string, b: number }>(obj: T) {
    let { ...r0 } = obj;
    let { a: a1, ...r1 } = obj;
    let { a: a2, b: b2, ...r2 } = obj;
    let { 'a': a3, ...r3 } = obj;
    let { ['a']: a4, ...r4 } = obj;
    let { [a]: a5, ...r5 } = obj;
}

const sa = Symbol();
const sb = Symbol();

function f2<T extends { [sa]: string, [sb]: number }>(obj: T) {
    let { [sa]: a1, [sb]: b1, ...r1 } = obj;
}

function f3<T, K1 extends keyof T, K2 extends keyof T>(obj: T, k1: K1, k2: K2) {
    let { [k1]: a1, [k2]: a2, ...r1 } = obj;
}

type Item = { a: string, b: number, c: boolean };

function f4<K1 extends keyof Item, K2 extends keyof Item>(obj: Item, k1: K1, k2: K2) {
    let { [k1]: a1, [k2]: a2, ...r1 } = obj;
}


//// [genericObjectRest.js]
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
const a = 'a';
function f1(obj) {
    let r0 = __rest(obj, []);
    let { a: a1 } = obj, r1 = __rest(obj, ["a"]);
    let { a: a2, b: b2 } = obj, r2 = __rest(obj, ["a", "b"]);
    let { 'a': a3 } = obj, r3 = __rest(obj, ['a']);
    let { ['a']: a4 } = obj, r4 = __rest(obj, ['a']);
    let _a = obj, _b = a, a5 = _a[_b], r5 = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
}
const sa = Symbol();
const sb = Symbol();
function f2(obj) {
    let _c = obj, _d = sa, a1 = _c[_d], _e = sb, b1 = _c[_e], r1 = __rest(_c, [typeof _d === "symbol" ? _d : _d + "", typeof _e === "symbol" ? _e : _e + ""]);
}
function f3(obj, k1, k2) {
    let _f = obj, _g = k1, a1 = _f[_g], _h = k2, a2 = _f[_h], r1 = __rest(_f, [typeof _g === "symbol" ? _g : _g + "", typeof _h === "symbol" ? _h : _h + ""]);
}
function f4(obj, k1, k2) {
    let _j = obj, _k = k1, a1 = _j[_k], _l = k2, a2 = _j[_l], r1 = __rest(_j, [typeof _k === "symbol" ? _k : _k + "", typeof _l === "symbol" ? _l : _l + ""]);
}
