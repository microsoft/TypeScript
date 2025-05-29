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


//// [nonPrimitiveUnionIntersection.d.ts]
declare var a: object & string; // error
declare var b: object | string; // ok
declare var c: object & {}; // error
declare const foo: object & {}; // ok
declare const bar: object & {
    err: string;
}; // error
