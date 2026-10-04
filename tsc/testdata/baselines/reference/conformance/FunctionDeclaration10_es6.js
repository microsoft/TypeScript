//// [tests/cases/conformance/es6/functionDeclarations/FunctionDeclaration10_es6.ts] ////

//// [FunctionDeclaration10_es6.ts]
function * foo(a = yield => yield) {
}

//// [FunctionDeclaration10_es6.js]
"use strict";
function* foo(a = yield, yield) {
}
