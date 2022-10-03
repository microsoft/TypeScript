//// [assignmentCompatWithGenericCallSignatures.ts]
// some complex cases of assignment compat of generic signatures that stress contextual signature instantiation

var f: <S extends { p: string }[]>(x: S) => void
var g: <T extends { p: string }>(x: T[]) => void

f = g; // ok
g = f; // ok

//// [assignmentCompatWithGenericCallSignatures.js]
// some complex cases of assignment compat of generic signatures that stress contextual signature instantiation
var f;
var g;
f = g; // ok
g = f; // ok
