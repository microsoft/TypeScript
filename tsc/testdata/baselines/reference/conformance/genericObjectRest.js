//// [tests/cases/conformance/types/rest/genericObjectRest.ts] ////

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
    let _a = obj, _b = sa, a1 = _a[_b], _c = sb, b1 = _a[_c], r1 = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + ""]);
}
function f3(obj, k1, k2) {
    let _a = obj, _b = k1, a1 = _a[_b], _c = k2, a2 = _a[_c], r1 = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + ""]);
}
function f4(obj, k1, k2) {
    let _a = obj, _b = k1, a1 = _a[_b], _c = k2, a2 = _a[_c], r1 = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + ""]);
}
