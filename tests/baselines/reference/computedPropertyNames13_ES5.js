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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[s] = function () { };
    proto_1[n] = function () { };
    C[s + s] = function () { };
    proto_1[s + n] = function () { };
    proto_1[+s] = function () { };
    C[""] = function () { };
    proto_1[0] = function () { };
    proto_1[a] = function () { };
    C[true] = function () { };
    proto_1["hello bye"] = function () { };
    C["hello " + a + " bye"] = function () { };
    return C;
}());
