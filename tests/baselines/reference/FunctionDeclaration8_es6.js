//// [tests/cases/conformance/es6/functionDeclarations/FunctionDeclaration8_es6.ts] ////

//// [FunctionDeclaration8_es6.ts]
var v = { [yield]: foo }

//// [FunctionDeclaration8_es6.js]
var _a;
var v = (_a = {}, _a[yield] = foo, _a);
