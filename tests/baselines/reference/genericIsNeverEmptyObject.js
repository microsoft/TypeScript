//// [genericIsNeverEmptyObject.ts]
// Repro from #29067

function test<T extends { a: string }>(obj: T) {
    let { a, ...rest } = obj;
    return { ...rest, b: a };
}

let o1 = { a: 'hello', x: 42 };
let o2: { b: string, x: number } = test(o1);


//// [genericIsNeverEmptyObject.js]
"use strict";
// Repro from #29067
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
function test(obj) {
    var a = obj.a, rest = __rest(obj, ["a"]);
    return __assign(__assign({}, rest), { b: a });
}
var o1 = { a: 'hello', x: 42 };
var o2 = test(o1);
