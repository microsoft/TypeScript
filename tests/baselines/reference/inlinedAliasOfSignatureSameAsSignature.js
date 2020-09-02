//// [inlinedAliasOfSignatureSameAsSignature.ts]
export type Example<TData>
    = (data: TData | null | undefined) => string | null;

function foo<T>() {
    let x: Example<T> = undefined!;
    let y: Example<T | null | undefined> = undefined!;

    y = x;

    let x1: (data: T | null | undefined) => string | null = undefined!;
    let y1: (data: (T | null | undefined) | null | undefined) => string | null = undefined!;

    y1 = x1
}

export interface Example2<TData> {
    item: (data: TData | null | undefined) => string | null;
}

function bar<T>() {
    let x: Example2<T> = undefined!;
    let y: Example2<T | null | undefined> = undefined!;

    y = x;

    let x1: { item: (data: T | null | undefined) => string | null } = undefined!;
    let y1: { item: (data: (T | null | undefined) | null | undefined) => string | null } = undefined!;

    y1 = x1
}

//// [inlinedAliasOfSignatureSameAsSignature.js]
"use strict";
exports.__esModule = true;
function foo() {
    var x = undefined;
    var y = undefined;
    y = x;
    var x1 = undefined;
    var y1 = undefined;
    y1 = x1;
}
function bar() {
    var x = undefined;
    var y = undefined;
    y = x;
    var x1 = undefined;
    var y1 = undefined;
    y1 = x1;
}
