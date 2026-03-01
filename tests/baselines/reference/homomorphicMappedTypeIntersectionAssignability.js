//// [tests/cases/compiler/homomorphicMappedTypeIntersectionAssignability.ts] ////

//// [homomorphicMappedTypeIntersectionAssignability.ts]
function f<TType>(
    a: { weak?: string } & Readonly<TType> & { name: "ok" },
    b: Readonly<TType & { name: string }>,
    c: Readonly<TType> & { name: string }) {
    c = a; // Works
    b = a; // Should also work
}


//// [homomorphicMappedTypeIntersectionAssignability.js]
"use strict";
function f(a, b, c) {
    c = a; // Works
    b = a; // Should also work
}
