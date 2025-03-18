//// [tests/cases/conformance/types/spread/spreadUnion.ts] ////

//// [spreadUnion.ts]
var union: { a: number } | { b: string };

var o3: { a: number } | { b: string };
var o3 =  { ...union };

var o4: { a: boolean } | { b: string , a: boolean};
var o4 =  { ...union, a: false };

var o5: { a: number } | { b: string } | { a: number, b: string };
var o5 =  { ...union, ...union };

//// [spreadUnion.js]
var union;
var o3;
var o3 = { ...union };
var o4;
var o4 = { ...union, a: false };
var o5;
var o5 = { ...union, ...union };
