//// [tests/cases/compiler/fakeInfinity2.ts] ////

//// [fakeInfinity2.ts]
export enum Foo {
    A = 1e999,
    B = -1e999,
}

namespace X {
    type A = 1e999;
    type B = 2e999;

    export function f(): A {
        throw new Error()
    }
}

export const m = X.f();

const Infinity = 0;
export enum Bar {
    A = 1e999,
}


//// [fakeInfinity2.js]
export var Foo;
(function (Foo) {
    Foo[Foo["A"] = 1e999] = "A";
    Foo[Foo["B"] = -1e999] = "B";
})(Foo || (Foo = {}));
var X;
(function (X) {
    function f() {
        throw new Error();
    }
    X.f = f;
})(X || (X = {}));
export const m = X.f();
const Infinity = 0;
export var Bar;
(function (Bar) {
    Bar[Bar["A"] = 1e999] = "A";
})(Bar || (Bar = {}));


//// [fakeInfinity2.d.ts]
export declare enum Foo {
    A = 1e999,
    B = -1e999
}
export declare const m: 1e999;
export declare enum Bar {
    A = 1e999
}
