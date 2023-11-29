//// [tests/cases/compiler/classImplementsPrimitive.ts] ////

//// [classImplementsPrimitive.ts]
// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }

//// [classImplementsPrimitive.js]
// classes cannot implement primitives
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
