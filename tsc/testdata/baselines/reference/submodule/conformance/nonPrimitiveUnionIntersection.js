//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveUnionIntersection.ts] ////

//// [nonPrimitiveUnionIntersection.ts]
var a: object & string = ""; // error
var b: object | string = ""; // ok
var c: object & {} = 123; // error
a = b; // error
b = a; // ok

const foo: object & {} = {bar: 'bar'}; // ok
const bar: object & {err: string} = {bar: 'bar'}; // error


//// [nonPrimitiveUnionIntersection.js]
var a = ""; // error
var b = ""; // ok
var c = 123; // error
a = b; // error
b = a; // ok
const foo = { bar: 'bar' }; // ok
const bar = { bar: 'bar' }; // error
