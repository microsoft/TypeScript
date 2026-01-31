//// [tests/cases/conformance/types/spread/spreadNonPrimitive.ts] ////

//// [spreadNonPrimitive.ts]
declare let o: object;
const x: { a: number, b: number } = { a: 1, ...o, b: 2 };


//// [spreadNonPrimitive.js]
const x = Object.assign(Object.assign({ a: 1 }, o), { b: 2 });
