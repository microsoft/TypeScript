//// [tests/cases/compiler/duplicateIdentifierEnum.ts] ////

//// [duplicateIdentifierEnum_A.ts]
// Test the error message when attempting to merge an enum with a class, an interface, or a function.
enum A {
    bar
}
class A {
    foo: number;
}

interface B {
    foo: number;
}
const enum B {
    bar
}

const enum C {

}
function C() {
    return 0;
}

enum D {
    bar
}
class E {
    foo: number;
}
// also make sure the error appears when trying to merge an enum in a separate file.
//// [duplicateIdentifierEnum_B.ts]
function D() {
    return 0;
}
enum E {
    bar
}

//// [duplicateIdentifierEnum_A.js]
// Test the error message when attempting to merge an enum with a class, an interface, or a function.
var A;
(function (A) {
    A[A["bar"] = 0] = "bar";
})(A || (A = {}));
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
function C() {
    return 0;
}
var D;
(function (D) {
    D[D["bar"] = 0] = "bar";
})(D || (D = {}));
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
// also make sure the error appears when trying to merge an enum in a separate file.
//// [duplicateIdentifierEnum_B.js]
function D() {
    return 0;
}
var E;
(function (E) {
    E[E["bar"] = 0] = "bar";
})(E || (E = {}));
