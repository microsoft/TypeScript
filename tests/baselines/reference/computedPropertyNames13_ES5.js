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
    var C_prototype = C.prototype;
    C_prototype[s] = function () { };
    C_prototype[n] = function () { };
    C[s + s] = function () { };
    C_prototype[s + n] = function () { };
    C_prototype[+s] = function () { };
    C[""] = function () { };
    C_prototype[0] = function () { };
    C_prototype[a] = function () { };
    C[true] = function () { };
    C_prototype["hello bye"] = function () { };
    C["hello " + a + " bye"] = function () { };
    return C;
}());
