//// [tests/cases/compiler/fakeInfinity3.ts] ////

//// [fakeInfinity3.ts]
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

export const Infinity = "oops";


//// [fakeInfinity3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infinity = exports.m = exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["A"] = Infinity] = "A";
    Foo[Foo["B"] = -Infinity] = "B";
})(Foo || (exports.Foo = Foo = {}));
var X;
(function (X) {
    function f() {
        throw new Error();
    }
    X.f = f;
})(X || (X = {}));
exports.m = X.f();
exports.Infinity = "oops";


//// [fakeInfinity3.d.ts]
export declare enum Foo {
    A = Infinity,
    B = -Infinity
}
export declare const m: Infinity;
export declare const Infinity = "oops";


//// [DtsFileErrors]


fakeInfinity3.d.ts(3,9): error TS1066: In ambient enum declarations member initializer must be constant expression.
fakeInfinity3.d.ts(5,25): error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?


==== fakeInfinity3.d.ts (2 errors) ====
    export declare enum Foo {
        A = Infinity,
        B = -Infinity
            ~~~~~~~~~
!!! error TS1066: In ambient enum declarations member initializer must be constant expression.
    }
    export declare const m: Infinity;
                            ~~~~~~~~
!!! error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?
    export declare const Infinity = "oops";
    