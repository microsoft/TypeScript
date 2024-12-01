//// [tests/cases/compiler/classImplementsPrimitive.ts] ////

//// [classImplementsPrimitive.ts]
// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }

const C4 = class implements number {}
const C5 = class implements string {}
const C6 = class implements boolean {}

const C7 = class A implements number { }
const C8 = class B implements string { }
const C9 = class C implements boolean { }


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
var C4 = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var C5 = /** @class */ (function () {
    function class_2() {
    }
    return class_2;
}());
var C6 = /** @class */ (function () {
    function class_3() {
    }
    return class_3;
}());
var C7 = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var C8 = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C9 = /** @class */ (function () {
    function C() {
    }
    return C;
}());
