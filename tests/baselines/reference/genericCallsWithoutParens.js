//// [genericCallsWithoutParens.ts]
function f<T>() { }
var r = f<number>; // parse error

class C<T> {
    foo: T;
}
var c = new C<number>; // parse error



//// [genericCallsWithoutParens.js]
function f() { }
var r = f(); // parse error
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c = new C; // parse error
