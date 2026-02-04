//// [tests/cases/compiler/typeInferenceConflictingCandidates.ts] ////

//// [typeInferenceConflictingCandidates.ts]
declare function g<T>(a: T, b: T, c: (t: T) => T): T;

g("", 3, a => a);

//// [typeInferenceConflictingCandidates.js]
"use strict";
g("", 3, a => a);
