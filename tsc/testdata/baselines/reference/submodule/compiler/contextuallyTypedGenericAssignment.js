//// [tests/cases/compiler/contextuallyTypedGenericAssignment.ts] ////

//// [contextuallyTypedGenericAssignment.ts]
function foo<A extends any[]>(
    arg: <T extends { a: number }>(t: T, ...rest: A) => number
) { }

foo((t, u: number) => t.a)

//// [contextuallyTypedGenericAssignment.js]
function foo(arg) { }
foo((t, u) => t.a);
