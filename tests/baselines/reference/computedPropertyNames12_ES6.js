//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames12_ES6.ts] ////

//// [computedPropertyNames12_ES6.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]: number;
    [n] = n;
    static [s + s]: string;
    [s + n] = 2;
    [+s]: typeof s;
    static [""]: number;
    [0]: number;
    [a]: number;
    static [<any>true]: number;
    [`hello bye`] = 0;
    static [`hello ${a} bye`] = 0
}

//// [computedPropertyNames12_ES6.js]
var _a, _b, _c;
var s;
var n;
var a;
class C {
    constructor() {
        this[_a] = n;
        this[_b] = 2;
        this[`hello bye`] = 0;
    }
}
_a = n, s + s, _b = s + n, +s, _c = `hello ${a} bye`;
C[_c] = 0;
