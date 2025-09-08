//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature6.ts] ////

//// [staticIndexSignature6.ts]
function foo () {
    return class<T> {
        static [s: string]: number
        static [s: number]: 42

        foo(v: T) { return v }
    }
}

const C = foo()
C.a;
C.a = 1;
C[2];
C[2] = 42;

const c = new C<number>();
c.foo(1);

//// [staticIndexSignature6.js]
"use strict";
function foo() {
    return class {
        foo(v) { return v; }
    };
}
const C = foo();
C.a;
C.a = 1;
C[2];
C[2] = 42;
const c = new C();
c.foo(1);
