//// [tests/cases/conformance/types/tuple/tupleLengthCheck.ts] ////

//// [tupleLengthCheck.ts]
declare const a: [number, string]
declare const rest: [number, string, ...boolean[]]

const a1 = a[1]
const a2 = a[2]
const a3 = a[1000]

const a4 = rest[1]
const a5 = rest[2]
const a6 = rest[3]
const a7 = rest[1000]


//// [tupleLengthCheck.js]
var a1 = a[1];
var a2 = a[2];
var a3 = a[1000];
var a4 = rest[1];
var a5 = rest[2];
var a6 = rest[3];
var a7 = rest[1000];
