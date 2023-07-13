//// [tests/cases/compiler/freshLiteralTypesInIntersections.ts] ////

//// [freshLiteralTypesInIntersections.ts]
// Repro from #19657

declare function func<A extends string, B extends A>(a: A, b: B[]): (ab: A & B) => void;
const q = func("x" as "x" | "y", ["x"]);
q("x");


//// [freshLiteralTypesInIntersections.js]
"use strict";
// Repro from #19657
var q = func("x", ["x"]);
q("x");
