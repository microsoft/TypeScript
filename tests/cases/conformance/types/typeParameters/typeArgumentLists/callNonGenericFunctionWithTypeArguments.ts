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