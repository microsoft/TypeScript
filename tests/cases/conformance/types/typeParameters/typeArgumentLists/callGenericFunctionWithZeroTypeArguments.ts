// valid invocations of generic functions with no explicit type arguments provided 

function f<T>(x: T): T { return null; }
var r = f(1);

var f2 = <T>(x: T): T => { return null; }
var r2 = f2(1);

var f3: { <T>(x: T): T; }
var r3 = f3(1);

class C {
    f<T>(x: T): T {
        return null;
    }
}
var r4 = (new C()).f(1);

interface I {
    f<T>(x: T): T;
}
var i: I;
var r5 = i.f(1);

class C2<T> {
    f(x: T): T {
        return null;
    }
}
var r6 = (new C2()).f(1);

interface I2<T> {
    f(x: T): T;
}
var i2: I2<number>;
var r7 = i2.f(1);