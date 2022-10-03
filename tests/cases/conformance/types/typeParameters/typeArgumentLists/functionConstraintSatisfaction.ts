// satisfaction of a constraint to Function, no errors expected

function foo<T extends Function>(x: T): T { return x; }

interface I {
    (): string;
}
var i: I;

class C {
    foo: string;
}

var a: { (): string };
var b: { new (): string };
var c: { (): string; (x): string };

var r = foo(new Function());
var r1 = foo((x) => x);
var r2 = foo((x: string[]) => x);
var r3 = foo(function (x) { return x });
var r4 = foo(function (x: string[]) { return x });
var r5 = foo(i);
var r6 = foo(C);
var r7 = foo(b);
var r8 = foo(c);

interface I2<T> {
    (x: T): T;
}
var i2: I2<string>;

class C2<T> {
    foo: T;
}

var a2: { <T>(x: T): T };
var b2: { new <T>(x: T): T };
var c2: { <T>(x: T): T; <T>(x: T, y: T): T };

var r9 = foo(<U>(x: U) => x);
var r10 = foo(function <U>(x: U) { return x; });
var r11 = foo(<U extends Date>(x: U) => x);
var r12 = foo(<U, V>(x: U, y: V) => x);
var r13 = foo(i2);
var r14 = foo(C2);
var r15 = foo(b2);
var r16 = foo(c2);

interface F2 extends Function { foo: string; }
var f2: F2;
var r17 = foo(f2);

function foo2<T extends { (): void }, U extends { (): void }>(x: T, y: U) {
    foo(x);
    foo(y);
}
//function foo2<T extends { (): void }, U extends T>(x: T, y: U) {
//    foo(x);
//    foo(y);
//}