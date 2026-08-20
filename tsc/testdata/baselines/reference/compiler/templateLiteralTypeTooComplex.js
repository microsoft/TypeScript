//// [tests/cases/compiler/templateLiteralTypeTooComplex.ts] ////

//// [templateLiteralTypeTooComplex.ts]
// Large template literal types with combinatorial explosion should produce an error, not hang.
type N = 0 | 1 | 2 | 3;
type T = `${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}`;


//// [templateLiteralTypeTooComplex.js]
"use strict";
