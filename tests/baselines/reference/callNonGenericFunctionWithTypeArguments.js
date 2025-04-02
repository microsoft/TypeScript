//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/callNonGenericFunctionWithTypeArguments.ts] ////

//// [callNonGenericFunctionWithTypeArguments.ts]
// it is always illegal to provide type arguments to a non-generic function
// all invocations here are illegal

function f(x: number) { return null; }
var r = f<string>(1);

var f2 = (x: number) => { return null; }
var r2 = f2<string>(1);

var f3: { (x: number): any; }
var r3 = f3<string>(1);

class C {
    f(x: number) {
        return null;
    }
}
var r4 = (new C()).f<string>(1);

interface I {
    f(x: number): any;
}
var i: I;
var r5 = i.f<string>(1);

class C2 {
    f(x: number) {
        return null;
    }
}
var r6 = (new C2()).f<string>(1);

interface I2 {
    f(x: number);
}
var i2: I2;
var r7 = i2.f<string>(1);

var a;
var r8 = a<number>();

var a2: any;
var r8 = a2<number>();

//// [callNonGenericFunctionWithTypeArguments.js]
// it is always illegal to provide type arguments to a non-generic function
// all invocations here are illegal
function f(x) { return null; }
var r = f(1);
var f2 = function (x) { return null; };
var r2 = f2(1);
var f3;
var r3 = f3(1);
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function (x) {
        return null;
    };
    return C;
}());
var r4 = (new C()).f(1);
var i;
var r5 = i.f(1);
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.f = function (x) {
        return null;
    };
    return C2;
}());
var r6 = (new C2()).f(1);
var i2;
var r7 = i2.f(1);
var a;
var r8 = a();
var a2;
var r8 = a2();
