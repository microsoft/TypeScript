//// [spreadOverwritesPropertyStrict.ts]
declare var ab: { a: number, b: number };
declare var abq: { a: number, b?: number };
var unused1 = { b: 1, ...ab } // error
var unused2 = { ...ab, ...ab } // ok, overwritten error doesn't apply to spreads
var unused3 = { b: 1, ...abq } // ok, abq might have b: undefined
var unused4 = { ...ab, b: 1 } // ok, we don't care that b in ab is overwritten
var unused5 = { ...abq, b: 1 } // ok
function g(obj: { x: number | undefined }) {
    return { x: 1, ...obj }; // ok, obj might have x: undefined
}
function f(obj: { x: number } | undefined) {
    return { x: 1, ...obj }; // ok, obj might be undefined
}
function h(obj: { x: number } | { x: string }) {
    return { x: 1, ...obj } // error
}


//// [spreadOverwritesPropertyStrict.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var unused1 = __assign({ b: 1 }, ab); // error
var unused2 = __assign(__assign({}, ab), ab); // ok, overwritten error doesn't apply to spreads
var unused3 = __assign({ b: 1 }, abq); // ok, abq might have b: undefined
var unused4 = __assign(__assign({}, ab), { b: 1 }); // ok, we don't care that b in ab is overwritten
var unused5 = __assign(__assign({}, abq), { b: 1 }); // ok
function g(obj) {
    return __assign({ x: 1 }, obj); // ok, obj might have x: undefined
}
function f(obj) {
    return __assign({ x: 1 }, obj); // ok, obj might be undefined
}
function h(obj) {
    return __assign({ x: 1 }, obj); // error
}
