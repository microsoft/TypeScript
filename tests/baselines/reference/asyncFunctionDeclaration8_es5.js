//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration8_es5.ts] ////

//// [asyncFunctionDeclaration8_es5.ts]
var v = { [await]: foo }

//// [asyncFunctionDeclaration8_es5.js]
var _a;
var v = (_a = {}, _a[await] = foo, _a);
