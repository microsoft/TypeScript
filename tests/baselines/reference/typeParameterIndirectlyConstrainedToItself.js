//// [typeParameterIndirectlyConstrainedToItself.ts]
class C<U extends T, T extends U> { }
class C2<T extends U, U extends V, V extends T> { }

interface I<U extends T, T extends U> { }
interface I2<T extends U, U extends V, V extends T> { }

function f<U extends T, T extends U>() { }
function f2<T extends U, U extends V, V extends T>() { }

var a: {
    <U extends T, T extends U>(): void;
    <T extends U, U extends V, V extends T>(): void;
}

var b = <U extends T, T extends U>() => { }
var b2 = <T extends U, U extends V, V extends T>() => { }

class D<U extends T, T extends V, V extends T> { }

//// [typeParameterIndirectlyConstrainedToItself.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
function f() { }
function f2() { }
var a;
var b = function () { };
var b2 = function () { };
var D = (function () {
    function D() {
    }
    return D;
}());
