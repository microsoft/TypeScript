//// [tests/cases/compiler/noDoubleErrorForLiteralUnionFromAmbient.ts] ////

//// [noDoubleErrorForLiteralUnionFromAmbient.ts]
// Repro from #63050
// When assigning a union of string literals from an ambient declaration to
// an incompatible type, the error should not show the same message twice.

declare const x: "a" | "b"

const y: number = x

declare const single: "hello"

const z: number = single


//// [noDoubleErrorForLiteralUnionFromAmbient.js]
"use strict";
// Repro from #63050
// When assigning a union of string literals from an ambient declaration to
// an incompatible type, the error should not show the same message twice.
const y = x;
const z = single;
