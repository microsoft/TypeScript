//// [computedPropertyNames10_ES5.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]() { },
    [n]() { },
    [s + s]() { },
    [s + n]() { },
    [+s]() { },
    [""]() { },
    [0]() { },
    [a]() { },
    [<any>true]() { },
    [`hello bye`]() { },
    [`hello ${a} bye`]() { }
}

//// [computedPropertyNames10_ES5.js]
var _a;
var s;
var n;
var a;
var v = (_a = {},
    _a[s] = function () { },
    _a[n] = function () { },
    _a[s + s] = function () { },
    _a[s + n] = function () { },
    _a[+s] = function () { },
    _a[""] = function () { },
    _a[0] = function () { },
    _a[a] = function () { },
    _a[true] = function () { },
    _a["hello bye"] = function () { },
    _a["hello " + a + " bye"] = function () { },
    _a);
