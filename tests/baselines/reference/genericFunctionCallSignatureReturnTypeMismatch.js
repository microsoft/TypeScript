//// [genericFunctionCallSignatureReturnTypeMismatch.js]
var f;

var g;
f = g;

var s = f("str").toUpperCase();

console.log(s);
