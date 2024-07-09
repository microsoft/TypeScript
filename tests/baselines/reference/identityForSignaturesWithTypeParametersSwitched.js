//// [tests/cases/compiler/identityForSignaturesWithTypeParametersSwitched.ts] ////

//// [identityForSignaturesWithTypeParametersSwitched.ts]
var f: <T, U>(x: T, y: U) => T;
var f: <T, U>(x: U, y: T) => U;

//// [identityForSignaturesWithTypeParametersSwitched.js]
var f;
var f;
