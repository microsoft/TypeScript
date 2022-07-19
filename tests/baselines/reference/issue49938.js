//// [issue49938.ts]
function equal<T>(a: T, b: T) { }

let v = null!;

// Object types with common base types

type B = { foo: string }
type D = { foo: string; bar: number }

// Error in 4.8 TS can't find common type ❌
// 4.7 T was undefined | B
equal(v as B, v as undefined | D)

// ok T is B ✅
equal(v as B, v as D)
// ok T is B | undefined ✅
equal(v as B, v as B | undefined)


//// [issue49938.js]
"use strict";
function equal(a, b) { }
var v = null;
// Error in 4.8 TS can't find common type ❌
// 4.7 T was undefined | B
equal(v, v);
// ok T is B ✅
equal(v, v);
// ok T is B | undefined ✅
equal(v, v);
