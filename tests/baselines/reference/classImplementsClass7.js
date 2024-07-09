//// [tests/cases/compiler/classImplementsClass7.ts] ////

//// [classImplementsClass7.ts]
class A {
    private x: number;
}

class B implements A {}


//// [classImplementsClass7.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
