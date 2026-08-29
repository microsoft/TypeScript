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
    Foo[Foo["A"] = Infinity] = "A";
    Foo[Foo["B"] = -Infinity] = "B";
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
    Bar[Bar["A"] = Infinity] = "A";
})(Bar || (Bar = {}));


//// [fakeInfinity2.d.ts]
export declare enum Foo {
    A = Infinity,
    B = -Infinity
}
export declare const m: Infinity;
export declare enum Bar {
    A = Infinity
}


//// [DtsFileErrors]


fakeInfinity2.d.ts(5,25): error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?


==== fakeInfinity2.d.ts (1 errors) ====
    export declare enum Foo {
        A = Infinity,
        B = -Infinity
    }
    export declare const m: Infinity;
                            ~~~~~~~~
!!! error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?
    export declare enum Bar {
        A = Infinity
    }
    