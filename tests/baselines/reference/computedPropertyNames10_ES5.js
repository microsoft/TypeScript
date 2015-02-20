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
var s;
var n;
var a;
var v = function () { }function () { }function () { }function () { }function () { }function () { }function () { }function () { }function () { }function () { }function () { }(_a = {}, _a[s] = , _a[n] = , _a[s + s] = , _a[s + n] = , _a[+s] = , _a[""] = , _a[0] = , _a[a] = , _a[true] = , _a["hello bye"] = , _a["hello " + a + " bye"] = , _a);
var _a;
