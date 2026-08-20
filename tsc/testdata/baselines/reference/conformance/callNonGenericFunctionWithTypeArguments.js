//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/callNonGenericFunctionWithTypeArguments.ts] ////

//// [callNonGenericFunctionWithTypeArguments.ts]
// it is always illegal to provide type arguments to a non-generic function
// all invocations here are illegal

function f(x: number) { return null; }
var r = f<string>(1);

var f2 = (x: number) => { return null; }
var r2 = f2<string>(1);

declare var f3: { (x: number): any; }
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
declare var i: I;
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
declare var i2: I2;
var r7 = i2.f<string>(1);

declare var a;
var r8 = a<number>();

declare var a2: any;
var r8 = a2<number>();

//// [callNonGenericFunctionWithTypeArguments.js]
"use strict";
// it is always illegal to provide type arguments to a non-generic function
// all invocations here are illegal
function f(x) { return null; }
var r = f(1);
var f2 = (x) => { return null; };
var r2 = f2(1);
var r3 = f3(1);
class C {
    f(x) {
        return null;
    }
}
var r4 = (new C()).f(1);
var r5 = i.f(1);
class C2 {
    f(x) {
        return null;
    }
}
var r6 = (new C2()).f(1);
var r7 = i2.f(1);
var r8 = a();
var r8 = a2();
