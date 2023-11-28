// @strict: true
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Semantically invalid. TSC does not emit .d.ts

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
