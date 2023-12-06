//// [tests/cases/compiler/typeInferenceConflictingCandidates.ts] ////

//// [typeInferenceConflictingCandidates.ts]
declare function g<T>(a: T, b: T, c: (t: T) => T): T;

g("", 3, a => a);

//// [typeInferenceConflictingCandidates.js]
g("", 3, function (a) { return a; });
