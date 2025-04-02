//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithGenericCallSignatures2.ts] ////

//// [assignmentCompatWithGenericCallSignatures2.ts]
// some complex cases of assignment compat of generic signatures. No contextual signature instantiation

interface A {
    <T>(x: T, ...y: T[][]): void
}

interface B {
    <S>(x: S, ...y: S[]): void
}

var a: A;
var b: B;

// Both errors
a = b;
b = a;


//// [assignmentCompatWithGenericCallSignatures2.js]
// some complex cases of assignment compat of generic signatures. No contextual signature instantiation
var a;
var b;
// Both errors
a = b;
b = a;
