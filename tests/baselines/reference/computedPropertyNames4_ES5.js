//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames4_ES5.ts] ////

//// [computedPropertyNames4_ES5.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]: 0,
    [n]: n,
    [s + s]: 1,
    [s + n]: 2,
    [+s]: s,
    [""]: 0,
    [0]: 0,
    [a]: 1,
    [<any>true]: 0,
    [`hello bye`]: 0,
    [`hello ${a} bye`]: 0
}

//// [computedPropertyNames4_ES5.js]
var _a;
var s;
var n;
var a;
var v = (_a = {},
    _a[s] = 0,
    _a[n] = n,
    _a[s + s] = 1,
    _a[s + n] = 2,
    _a[+s] = s,
    _a[""] = 0,
    _a[0] = 0,
    _a[a] = 1,
    _a[true] = 0,
    _a["hello bye"] = 0,
    _a["hello ".concat(a, " bye")] = 0,
    _a);
