//// [computedPropertyNames9_ES5.ts]
function f(s: string): string;
function f(n: number): number;
function f<T>(x: T): T;
function f(x): any { }

var v = {
    [f("")]: 0,
    [f(0)]: 0,
    [f(true)]: 0
}

//// [computedPropertyNames9_ES5.js]
var _a;
function f(x) { }
var v = (_a = {},
    _a[f("")] = 0,
    _a[f(0)] = 0,
    _a[f(true)] = 0,
    _a);
