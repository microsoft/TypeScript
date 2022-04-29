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