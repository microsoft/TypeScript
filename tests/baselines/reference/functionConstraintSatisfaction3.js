//// [functionConstraintSatisfaction3.ts]
// satisfaction of a constraint to Function, no errors expected

function foo<T extends (x: string) => string>(x: T): T { return x; }

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

var r1 = foo((x) => x);
var r2 = foo((x: string) => x);
var r3 = foo(function (x) { return x });
var r4 = foo(function (x: string) { return x });
var r5 = foo(i);
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

var r9 = foo(function <U>(x: U) { return x; });
var r10 = foo(<U extends string>(x: U) => x);
var r12 = foo(i2);
var r15 = foo(c2);

declare function id2<T>(x: T, y: T): T;

declare function boom<R>(f: (x: string, y: number) => R): R;
declare function boom2(f: (x: string, y: number) => string): void;

boom(id2);  // Should be an error T = [string, number]
boom2(id2); // Should be an error T = [string, number]

declare function withNum<N extends number>(x: N): N;
declare function withString<S extends string>(f: (x: S) => S): void;
declare function useString(f: (x: string) => string): void;

withString(withNum);  // Error
useString(withNum);   // Error

declare function okay<R>(f: (x: 1, y: number) => R): R;
declare function transitive<T>(x: T, f: (x: T) => T): void;

okay(id2);

transitive(1, withNum);
transitive('1', withNum);


//// [functionConstraintSatisfaction3.js]
// satisfaction of a constraint to Function, no errors expected
function foo(x) { return x; }
var i;
var C = (function () {
    function C() {
    }
    return C;
}());
var a;
var b;
var c;
var r1 = foo(function (x) { return x; });
var r2 = foo(function (x) { return x; });
var r3 = foo(function (x) { return x; });
var r4 = foo(function (x) { return x; });
var r5 = foo(i);
var r8 = foo(c);
var i2;
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
var a2;
var b2;
var c2;
var r9 = foo(function (x) { return x; });
var r10 = foo(function (x) { return x; });
var r12 = foo(i2);
var r15 = foo(c2);
boom(id2); // Should be an error T = [string, number]
boom2(id2); // Should be an error T = [string, number]
withString(withNum); // Error
useString(withNum); // Error
okay(id2);
transitive(1, withNum);
transitive('1', withNum);
