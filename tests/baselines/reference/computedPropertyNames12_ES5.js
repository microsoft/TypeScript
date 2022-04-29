//// [computedPropertyNames12_ES5.ts]
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

//// [computedPropertyNames12_ES5.js]
var s;
var n;
var a;
var C = /** @class */ (function () {
    function C() {
        this[_a] = n;
        this[_b] = 2;
        this["hello bye"] = 0;
    }
    var _a, _b, _c;
    _a = n, s + s, _b = s + n, +s, _c = "hello ".concat(a, " bye");
    C[_c] = 0;
    return C;
}());
