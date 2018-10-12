//// [spreadOverwritesPropertyStrict.ts]
declare var ab: { a: number, b: number };
declare var abq: { a: number, b?: number };
var unused1 = { b: 1, ...ab }
var unused2 = { ...ab, ...ab }
var unused3 = { b: 1, ...abq }
function g(obj: { x: number | undefined }) {
    return { x: 1, ...obj }; // should be allowed because of undefined
}
function f(obj: { x: number } | undefined) {
    return { x: 1, ...obj };
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
var unused1 = __assign({ b: 1 }, ab);
var unused2 = __assign({}, ab, ab);
var unused3 = __assign({ b: 1 }, abq);
function g(obj) {
    return __assign({ x: 1 }, obj); // should be allowed because of undefined
}
function f(obj) {
    return __assign({ x: 1 }, obj);
}
