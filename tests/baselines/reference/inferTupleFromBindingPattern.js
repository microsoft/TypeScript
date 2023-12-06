//// [tests/cases/compiler/inferTupleFromBindingPattern.ts] ////

//// [inferTupleFromBindingPattern.ts]
declare function f<T>(cb: () => T): T;
const [e1, e2, e3] = f(() => [1, "hi", true]);


//// [inferTupleFromBindingPattern.js]
var _a = f(function () { return [1, "hi", true]; }), e1 = _a[0], e2 = _a[1], e3 = _a[2];
