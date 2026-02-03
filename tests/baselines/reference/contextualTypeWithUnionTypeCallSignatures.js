//// [tests/cases/conformance/types/union/contextualTypeWithUnionTypeCallSignatures.ts] ////

//// [contextualTypeWithUnionTypeCallSignatures.ts]
//When used as a contextual type, a union type U has those members that are present in any of 
// its constituent types, with types that are unions of the respective members in the constituent types. 

// Let S be the set of types in U that have call signatures.
// If S is not empty and the sets of call signatures of the types in S are identical ignoring return types,
// U has the same set of call signatures, but with return types that are unions of the return types of the respective call signatures from each type in S.

interface IWithNoCallSignatures {
    foo: string;
}
interface IWithCallSignatures {
    (a: number): string;
}
interface IWithCallSignatures2 {
    (a: number): number;
}
interface IWithCallSignatures3 {
    (b: string): number;
}
interface IWithCallSignatures4 {
    (a: number): string;
    (a: string, b: number): number;
}

// With no call signature | callSignatures
var x: IWithNoCallSignatures | IWithCallSignatures = a => a.toString();

// With call signatures with different return type
var x2: IWithCallSignatures | IWithCallSignatures2 = a => a.toString(); // Like iWithCallSignatures
var x2: IWithCallSignatures | IWithCallSignatures2 = a => a; // Like iWithCallSignatures2

// With call signatures of mismatching parameter type
var x3: IWithCallSignatures | IWithCallSignatures3 = a => /*here a should be any*/ a.toString();

// With call signature count mismatch
var x4: IWithCallSignatures | IWithCallSignatures4 = a => /*here a should be any*/ a.toString();

//// [contextualTypeWithUnionTypeCallSignatures.js]
//When used as a contextual type, a union type U has those members that are present in any of 
// its constituent types, with types that are unions of the respective members in the constituent types. 
// With no call signature | callSignatures
var x = function (a) { return a.toString(); };
// With call signatures with different return type
var x2 = function (a) { return a.toString(); }; // Like iWithCallSignatures
var x2 = function (a) { return a; }; // Like iWithCallSignatures2
// With call signatures of mismatching parameter type
var x3 = function (a) { /*here a should be any*/ return a.toString(); };
// With call signature count mismatch
var x4 = function (a) { /*here a should be any*/ return a.toString(); };
