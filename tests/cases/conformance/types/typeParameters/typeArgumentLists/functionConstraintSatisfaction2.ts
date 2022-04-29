// satisfaction of a constraint to Function, all of these invocations are errors unless otherwise noted

function foo<T extends Function>(x: T): T { return x; }

foo(1);
foo(() => { }, 1);
foo(1, () => { });

function foo2<T extends (x: string) => string>(x: T): T { return x; }

class C {
    foo: string;
}

var b: { new (x: string): string };

class C2<T> {
    foo: T;
}

var b2: { new <T>(x: T): T };

var r = foo2(new Function());
var r2 = foo2((x: string[]) => x);
var r6 = foo2(C);
var r7 = foo2(b);
var r8 = foo2(<U>(x: U) => x); // no error expected
var r11 = foo2(<U, V>(x: U, y: V) => x);
var r13 = foo2(C2);
var r14 = foo2(b2);

interface F2 extends Function { foo: string; }
var f2: F2;
var r16 = foo2(f2);

function fff<T extends { (): void }, U extends T>(x: T, y: U) {
    foo2(x);
    foo2(y);
}
