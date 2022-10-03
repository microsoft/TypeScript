//// [simplifyingConditionalWithInteriorConditionalIsRelated.ts]
// from https://github.com/microsoft/TypeScript/issues/30706
type ConditionalType<T> = T extends string ? string : number;

function ConditionalOrUndefined<T>(): ConditionalType<T> | undefined {
    return 0 as any;
}

function JustConditional<T>(): ConditionalType<T> {
    return ConditionalOrUndefined<T>()!; // shouldn't error
}


// For comparison...
function genericOrUndefined<T>(): T | undefined {
    return 0 as any;
}

function JustGeneric<T>(): T {
    return genericOrUndefined<T>()!; // no error
}

// Simplified example:

function f<T>() {
    type One = T extends string ? string : string;
    type A = T extends number ? One : never;
    const x: One = null as any as A;
}


//// [simplifyingConditionalWithInteriorConditionalIsRelated.js]
"use strict";
function ConditionalOrUndefined() {
    return 0;
}
function JustConditional() {
    return ConditionalOrUndefined(); // shouldn't error
}
// For comparison...
function genericOrUndefined() {
    return 0;
}
function JustGeneric() {
    return genericOrUndefined(); // no error
}
// Simplified example:
function f() {
    var x = null;
}
