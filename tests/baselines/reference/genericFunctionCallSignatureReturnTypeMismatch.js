//// [tests/cases/compiler/genericFunctionCallSignatureReturnTypeMismatch.ts] ////

//// [genericFunctionCallSignatureReturnTypeMismatch.ts]
interface Array<T> {}

var f : { <T>(x:T): T; }

var g : { <S>() : S[]; };
f = g;

var s = f("str").toUpperCase();

console.log(s);


//// [genericFunctionCallSignatureReturnTypeMismatch.js]
var f;
var g;
f = g;
var s = f("str").toUpperCase();
console.log(s);
