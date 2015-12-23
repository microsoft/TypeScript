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
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
    function B() {
    }
    return B;
}());
var C = (function () {
    function C() {
    }
    return C;
}());
var X = (function () {
    function X() {
    }
    return X;
}());
var X1 = (function () {
    function X1() {
    }
    return X1;
}());
var X2 = (function () {
    function X2() {
    }
    return X2;
}());
function f(a) {
}
var xs;
var t3 = f(xs);
var t3; // should not error
