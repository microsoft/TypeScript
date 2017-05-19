//// [classImplementsClass1.ts]
class A { }
class C implements A { }

//// [classImplementsClass1.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var C = (function () {
    function C() {
    }
    return C;
}());
