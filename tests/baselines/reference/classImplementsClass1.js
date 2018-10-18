//// [classImplementsClass1.ts]
class A { }
class C implements A { }

//// [classImplementsClass1.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
