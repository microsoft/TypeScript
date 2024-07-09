//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/callGenericFunctionWithIncorrectNumberOfTypeArguments.ts] ////

//// [callGenericFunctionWithIncorrectNumberOfTypeArguments.ts]
// type parameter lists must exactly match type argument lists
// all of these invocations are errors

function f<T, U>(x: T, y: U): T { return null; }
var r1 = f<number>(1, '');
var r1b = f<number, string, number>(1, '');

var f2 = <T, U>(x: T, y: U): T => { return null; }
var r2 = f2<number>(1, '');
var r2b = f2<number, string, number>(1, '');

var f3: { <T, U>(x: T, y: U): T; }
var r3 = f3<number>(1, '');
var r3b = f3<number, string, number>(1, '');

class C {
    f<T, U>(x: T, y: U): T {
        return null;
    }
}
var r4 = (new C()).f<number>(1, '');
var r4b = (new C()).f<number, string, number>(1, '');

interface I {
    f<T, U>(x: T, y: U): T;
}
var i: I;
var r5 = i.f<number>(1, '');
var r5b = i.f<number, string, number>(1, '');

class C2<T, U> {
    f(x: T, y: U): T {
        return null;
    }
}
var r6 = (new C2()).f<number>(1, '');
var r6b = (new C2()).f<number, string, number>(1, '');

interface I2<T, U> {
    f(x: T, y: U): T;
}
var i2: I2<number, string>;
var r7 = i2.f<number>(1, '');
var r7b = i2.f<number, string, number>(1, '');

//// [callGenericFunctionWithIncorrectNumberOfTypeArguments.js]
// type parameter lists must exactly match type argument lists
// all of these invocations are errors
function f(x, y) { return null; }
var r1 = f(1, '');
var r1b = f(1, '');
var f2 = function (x, y) { return null; };
var r2 = f2(1, '');
var r2b = f2(1, '');
var f3;
var r3 = f3(1, '');
var r3b = f3(1, '');
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function (x, y) {
        return null;
    };
    return C;
}());
var r4 = (new C()).f(1, '');
var r4b = (new C()).f(1, '');
var i;
var r5 = i.f(1, '');
var r5b = i.f(1, '');
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.f = function (x, y) {
        return null;
    };
    return C2;
}());
var r6 = (new C2()).f(1, '');
var r6b = (new C2()).f(1, '');
var i2;
var r7 = i2.f(1, '');
var r7b = i2.f(1, '');
