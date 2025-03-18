//// [tests/cases/compiler/inferTupleFromBindingPattern.ts] ////

//// [inferTupleFromBindingPattern.ts]
declare function f<T>(cb: () => T): T;
const [e1, e2, e3] = f(() => [1, "hi", true]);


//// [inferTupleFromBindingPattern.js]
const [e1, e2, e3] = f(() => [1, "hi", true]);
