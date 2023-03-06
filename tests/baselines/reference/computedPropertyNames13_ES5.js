//// [computedPropertyNames13_ES5.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]() {}
    [n]() { }
    static [s + s]() { }
    [s + n]() { }
    [+s]() { }
    static [""]() { }
    [0]() { }
    [a]() { }
    static [<any>true]() { }
    [`hello bye`]() { }
    static [`hello ${a} bye`]() { }
}

//// [computedPropertyNames13_ES5.js]
var s;
var n;
var a;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[s] = function () { };
    C.prototype[n] = function () { };
    C[s + s] = function () { };
    C.prototype[s + n] = function () { };
    C.prototype[+s] = function () { };
    C[""] = function () { };
    C.prototype[0] = function () { };
    C.prototype[a] = function () { };
    C[true] = function () { };
    C.prototype["hello bye"] = function () { };
    C["hello ".concat(a, " bye")] = function () { };
    return C;
}());
