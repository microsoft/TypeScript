//// [tests/cases/compiler/unusedTypeParameters5.ts] ////

//// [unusedTypeParameters5.ts]
class A<Dummy> {
    public x: Dummy;
}

var x: {
    new <T, U, K>(a: T): A<U>;
}

//// [unusedTypeParameters5.js]
"use strict";
class A {
    x;
}
var x;
