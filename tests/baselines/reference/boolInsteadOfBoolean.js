//// [tests/cases/conformance/types/primitives/boolean/boolInsteadOfBoolean.ts] ////

//// [boolInsteadOfBoolean.ts]
var x: bool;
var a: boolean = x;
x = a;

//// [boolInsteadOfBoolean.js]
var x;
var a = x;
x = a;
