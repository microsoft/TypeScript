//// [tests/cases/compiler/identityForSignaturesWithTypeParametersAndAny.ts] ////

//// [identityForSignaturesWithTypeParametersAndAny.ts]
var f: <T, U>(x: T, y: U) => T;
var f: <T, U>(x: any, y: any) => any;

var g: <T, U>(x: T, y: U) => T;
var g: <T>(x: any, y: any) => any;

var h: <T, U>(x: T, y: U) => T;
var h: (x: any, y: any) => any;

var i: <T, U>(x: T, y: U) => T;
var i: <T, U>(x: any, y: string) => any;

var j: <T, U>(x: T, y: U) => T;
var j: <T, U>(x: any, y: any) => string;

//// [identityForSignaturesWithTypeParametersAndAny.js]
var f;
var f;
var g;
var g;
var h;
var h;
var i;
var i;
var j;
var j;
