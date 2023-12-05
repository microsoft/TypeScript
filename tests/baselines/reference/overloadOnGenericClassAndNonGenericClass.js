//// [tests/cases/compiler/overloadOnGenericClassAndNonGenericClass.ts] ////

//// [overloadOnGenericClassAndNonGenericClass.ts]
class A { a; }
class B { b; }
class C { c; }
class X<T> { x: T; }
class X1 { x: string; }
class X2 { x: string; }
function f(a: X1): A;
function f<T>(a: X<T>): B;
function f(a): any {
}

var xs: X<string>;

var t3 = f(xs);
var t3: A; // should not error


//// [overloadOnGenericClassAndNonGenericClass.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
var X1 = /** @class */ (function () {
    function X1() {
    }
    return X1;
}());
var X2 = /** @class */ (function () {
    function X2() {
    }
    return X2;
}());
function f(a) {
}
var xs;
var t3 = f(xs);
var t3; // should not error
